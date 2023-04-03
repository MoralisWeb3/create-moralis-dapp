import { Inquirer, TemplateConfig } from '@create-moralis-dapp/toolkit';
import { exec } from 'child_process';
import {
  generateTemplateChoices,
} from './utils/templateConfigs';

const { commonQuestions } = Inquirer;

export class InquiryHandler {
  async askTemplate(): Promise<TemplateConfig> {
    const { template } = await Inquirer.inquire({
      type: 'select',
      name: 'template',
      message: 'Choose a project template:',
      choices: generateTemplateChoices(),
    });
    return template;
  }

  async askProjectName(initialName: string): Promise<string> {
    const { name } = await Inquirer.inquire({
      ...commonQuestions.name,
      initial: initialName,
    });
    return name;
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
