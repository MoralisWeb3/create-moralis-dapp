import { Inquirer } from '@create-moralis-dapp/toolkit';
import { exec } from 'child_process';
import path from 'path';
import { GitFolderCloner } from './GitFolderCloner';

type TemplateConfig = {
  title: string;
  description: string;
  folderPath: string;
};

const templatesConfig: Record<string, TemplateConfig> = {
  next: {
    title: 'Next.js',
    description:
      'Next.js project using create-next-app (recommended for rapid prototyping).',
    folderPath: 'demos/next',
  },
  'next-auth': {
    title: 'Next.js + Auth',
    description: 'Next.js project with authentication using Moralis.',
    folderPath: 'demos/next-auth',
  },
  'react-vite': {
    title: 'React + Vite',
    description: 'React project using Vite (recommended for rapid prototyping)',
    folderPath: 'demos/react-vite',
  },
  'vanilla-webpack': {
    title: 'Vanilla + Webpack',
    description:
      'Javascript + HTML project using Webpack (recommended for rapid prototyping)',
    folderPath: 'demos/vanilla-webpack',
  },
};
export class CMDGenerator {
  // constructor() {}

  public async run() {
    const { template }: { template: { name: string; folderPath: string } } =
      await Inquirer.inquire({
        type: 'select',
        name: 'template',
        message: 'Choose a project template:',
        choices: Object.keys(templatesConfig).map((key) => ({
          title: templatesConfig[key].title,
          description: templatesConfig[key].description,
          value: { name: key, folderPath: templatesConfig[key].folderPath },
        })),
      });

    const repoUrl = 'https://github.com/MoralisWeb3/create-moralis-dapp.git';
    // const folderPath = 'demos/react-vite';
    const destinationPath = path.join(process.cwd(), template.name);

    const cloner = new GitFolderCloner(
      repoUrl,
      template.folderPath,
      destinationPath
    );

    cloner.clone();

    const { moralisAdmin } = await Inquirer.inquire(
      Inquirer.commonQuestions.moralisAdmin
    );
    exec(moralisAdmin);

    const { moralisApiKey } = await Inquirer.inquire(
      Inquirer.commonQuestions.moralisApiKey
    );
  }
}
