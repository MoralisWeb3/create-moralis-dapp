import { TemplateProcessor } from '@create-moralis-dapp/toolkit';
import ora from 'ora';
import path from 'path';
import { argv } from 'yargs';
import { InquiryHandler } from './InquiryHandler';
import { templateConfigs } from './utils/templateConfigs';
import chalk from 'chalk';

export class MoralisDappGenerator {
  private spinner = ora();

  public async generate() {
    const inquiryHandler = new InquiryHandler();
    const template = await inquiryHandler.askTemplate();
    const name = await inquiryHandler.askProjectName(template.name);

    await inquiryHandler.openMoralisAdminInBrowser();

    const moralisApiKey = await inquiryHandler.askMoralisApiKey();

    const destinationPath = this.getDestinationPath(name);

    const templateProcessor = new TemplateProcessor(
      destinationPath,
      templateConfigs[template.name]
    );

    await this.setupFiles(templateProcessor);
    await this.createEnvFile(
      templateProcessor,
      templateConfigs[template.name].env.fileName,
      moralisApiKey
    );
    await this.updateNameInPackageJson(templateProcessor, name);
    await this.installDependencies(templateProcessor);
    console.log(
      `\n${chalk.green('Success!')} Created ${chalk.green(
        name
      )} at ${chalk.whiteBright(destinationPath)}`
    );

    console.log('You can run several commands:\n');

    templateConfigs[template.name].commands.forEach(
      ({ command, description }) => {
        console.log(chalk.blue(command));
        console.log(`  ${description}\n`);
      }
    );

    console.log('Start developing by typing:\n');

    console.log(
      `${chalk.blue('cd')} ${(argv as any).dev ? `dev-dapps/${name}` : name}`
    );
    templateConfigs[template.name].quikStart.forEach((command) => {
      console.log(chalk.blue(command));
    });
  }

  private getDestinationPath(name: string) {
    return path.join(process.cwd(), (argv as any).dev ? 'dev-dapps' : '', name);
  }

  private async setupFiles(templateProcessor: TemplateProcessor) {
    this.spinner.start(chalk.bold.whiteBright('📁 Setting up files...'));
    await templateProcessor.setupFiles();
    this.spinner.succeed(chalk.bold.whiteBright('Files set up successfully'));
  }

  private async createEnvFile(
    templateProcessor: TemplateProcessor,
    envFileName: string,
    moralisApiKey: string
  ) {
    this.spinner.start(chalk.bold.whiteBright('🔧 Creating .env file...'));
    await templateProcessor.createEnvFile({ api: moralisApiKey });
    this.spinner.succeed(chalk.bold.whiteBright(`${envFileName} file created`));
  }

  private async updateNameInPackageJson(
    templateProcessor: TemplateProcessor,
    name: string
  ) {
    this.spinner.start(chalk.bold.whiteBright('📝 Updating package.json...'));
    await templateProcessor.updateNameInPackageJson(name);
    this.spinner.succeed(chalk.bold.whiteBright('package.json updated'));
  }

  private async installDependencies(templateProcessor: TemplateProcessor) {
    const packageManager = (argv as any)?.packageManager || 'npm';
    this.spinner.start(
      chalk.bold.whiteBright(
        `📦 Installing dependencies using ${packageManager}...`
      )
    );
    await templateProcessor.installDependencies(packageManager);
    this.spinner.succeed(
      chalk.bold.whiteBright('Dependencies installed successfully')
    );
  }
}
