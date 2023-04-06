import prompts, { Choice, PromptObject } from 'prompts';
import { argv } from 'yargs';
import processExit from './utils/processExit';
prompts.override(argv);
export class Inquirer {
  public static inquire<Question extends string = string>(
    questions:
      | prompts.PromptObject<Question>[]
      | prompts.PromptObject<Question>,
    onSubmit?:
      | ((prompt: PromptObject, answer: any, answers: any[]) => void)
      | undefined
  ) {
    return prompts(questions, {
      onCancel: () => {
        processExit();
      },
      onSubmit(prompt, answer, answers) {
        if (onSubmit) {
          onSubmit(prompt, answer, answers);
        }
      },
    });
  }

  public static get commonQuestions(): Record<string, PromptObject<string>> {
    return {
      name: {
        name: 'name',
        initial: 'moralis-dapp',
        message: 'What would you like to name your project?',
        type: 'text',
      },
      moralisApiKey: {
        name: 'moralisApiKey',
        message:
          'Insert your Moralis API Key (Copy from https://admin.moralis.io/web3apis):',
        type: 'text',
        validate: (value) => {
          if (value.length !== 64) {
            return 'Please insert valid Moralis API Key';
          }
          return true;
        },
      },
      packageManager: {
        name: 'packageManager',
        choices: [
          { title: 'yarn', value: 'yarn' },
          { title: 'npm', value: 'npm' },
          { title: 'pnpm', value: 'pnpm' },
        ] as Choice[],
        initial: 0,
        message: 'Select a package manager for installing dependencies ...',
        type: 'select',
      },
      moralisAdmin: {
        type: 'select',
        name: 'moralisAdmin',
        message: 'Do you have a Moralis account?',
        choices: [
          {
            title: 'Yes',
            description: 'Will open a webpage where you can copy your API key',
            value: 'start https://admin.moralis.io/web3apis',
          },
          {
            title: 'No',
            description: 'Will open a webpage where you can register for free',
            value: 'start https://admin.moralis.io/register',
          },
        ],
        initial: 0,
      },
      confirmBeta: {
        name: 'confirmBeta',
        type: 'confirm',
        initial: true,
        message:
          'Note: This tool is still in beta, and in active development.\n Many changes and updates are coming, which may impact your experience.\n Reach out to us in forum.moralis.io or in our discord for any feedback.',
      },
    };
  }
}
