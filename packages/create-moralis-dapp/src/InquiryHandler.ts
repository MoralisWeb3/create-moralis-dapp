import { Inquirer, TemplateConfig } from '@create-moralis-dapp/toolkit';
import { exec } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { argv } from 'yargs';
import { generateTemplateChoices } from './utils/templateConfigs';

const { commonQuestions } = Inquirer;

export class InquiryHandler {
  async askTemplate(): Promise<TemplateConfig> {
    const { template } = await Inquirer.inquire({
      type: 'select',
      name: 'template',
      message: 'Which template would you like to use?',
      choices: generateTemplateChoices(),
    });
    return template;
  }

  async askProjectName(
    initialName: string
  ): Promise<{ name: string; destinationPath: string }> {
    const { name } = await Inquirer.inquire({
      ...commonQuestions.name,
      initial: initialName,
      validate: (dappName) => {
        return this.validateProjectName(dappName);
      },
    });

    const destinationPath = this.getDestinationPath(name);
    return { name, destinationPath };
  }

  private async validateProjectName(name: string): Promise<boolean | string> {
    const destinationPath = this.getDestinationPath(name);
    const destinationExists = await fs.pathExists(destinationPath);
    if (destinationExists) {
      return 'A folder with this name already exists';
    }
    return true;
  }

  private getDestinationPath(name: string) {
    return path.join(process.cwd(), (argv as any).dev ? 'dev-dapps' : '', name);
  }

  async openMoralisAdminInBrowser(): Promise<void> {
    await Inquirer.inquire(commonQuestions.moralisAdmin, (_prompt, answer) =>
      exec(answer)
    );
  }

  async askMoralisApiKey(): Promise<string> {
    const { moralisApiKey } = await Inquirer.inquire(
      commonQuestions.moralisApiKey
    );
    return moralisApiKey;
  }
}
