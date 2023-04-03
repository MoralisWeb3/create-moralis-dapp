import path from 'path';
import { argv } from 'yargs';
import { InquiryHandler } from './InquiryHandler';
import { templateConfigs } from './utils/templateConfigs';
import { TemplateProcessor } from '@create-moralis-dapp/toolkit';

export class MoralisDappGenerator {
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

    await templateProcessor.setupFiles();
    await templateProcessor.createEnvFile({ moralisApiKey });
    await templateProcessor.updateNameInPackageJson(name);

    const packageManager = (argv as any)?.packageManager || 'npm';
    await templateProcessor.installDependencies(packageManager);
  }

  private getDestinationPath(name: string) {
    return path.join(process.cwd(), (argv as any).dev ? 'demos' : '', name);
  }
}
