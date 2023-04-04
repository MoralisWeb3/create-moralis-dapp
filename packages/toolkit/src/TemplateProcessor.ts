import fs from 'fs-extra';
import path from 'path';
import { GitFolderCloner } from './GitFolderCloner';
import { EnvVariable, TemplateConfig } from './types';
import { FileSystemProcessor } from './FileSystemProcessor';
import { DependenciesManager, PackageManager } from './DependenciesManager';

export class TemplateProcessor {
  constructor(
    private destinationPath: string,
    private templateConfig: TemplateConfig
  ) {}

  async setupFiles() {
    const cloner = new GitFolderCloner(
      this.templateConfig.repoUrl,
      this.templateConfig.folderPath,
      this.destinationPath
    );
    await cloner.clone();
  }

  async createEnvFile(
    keyValuePairs: Record<'api', EnvVariable['value']> &
      Record<string, EnvVariable['value']>
  ) {
    const envContent = Object.entries(this.templateConfig.env.variables)
      .map(([key, envVar]) => {
        const description = envVar?.desciption
          ? `# ${envVar.desciption}\n`
          : '';
        const envVarValue = keyValuePairs[key] || envVar.value;
        return `${description}${envVar.name}=${envVarValue}`;
      })
      .join('\n');

    const envFilePath = path.join(
      this.destinationPath,
      this.templateConfig.env.fileName
    );
    await fs.writeFile(envFilePath, envContent, { encoding: 'utf-8' });
  }

  async updateNameInPackageJson(name: string) {
    const packageJsonPath = path.join(this.destinationPath, 'package.json');
    const packageJson = await FileSystemProcessor.readJSON(packageJsonPath);
    packageJson.name = name;
    await FileSystemProcessor.writeJSON(packageJsonPath, packageJson, {
      spaces: 2,
    });
  }

  async installDependencies(packageManager: PackageManager) {
    const depManager = new DependenciesManager(this.destinationPath);
    await depManager.install(packageManager);
  }
}
