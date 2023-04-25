import { TemplateConfig } from '@create-moralis-dapp/toolkit';
import chalk from 'chalk';
import crypto from 'crypto';

export const templateConfigs: Record<string, TemplateConfig> = {
  next: {
    description: 'Full Stack Starter Template using Next.js and Typescript.',
    folderPath: 'templates/next',
    name: 'next',
    repoUrl: 'https://github.com/MoralisWeb3/create-moralis-dapp.git',
    title: 'Next.js',
    env: {
      fileName: '.env.local',
      variables: {
        api: {
          name: 'MORALIS_API_KEY',
          desciption:
            'Your Moralis Api key, that can be found in https://admin.moralis.io/web3apis. Keep this secret!',
        },
        secret: {
          name: 'NEXTAUTH_SECRET',
          value: crypto.randomBytes(16).toString('hex'),
          desciption:
            'This secret is used to encrypt your session cookies, make sure to set it to a secure value. Replace before deploying to production.',
        },
        url: {
          name: 'NEXTAUTH_URL',
          value: 'http://localhost:3000',
          desciption:
            'The URL of your app, used to generate absolute URLs. Replace before deploying to production.',
        },
      },
    },
    commands: [
      { command: 'npm run dev', description: 'Starts the development server' },
      {
        command: 'npm run build',
        description: 'Bundles the app for production',
      },
      { command: 'npm run start', description: 'Starts the production server' },
    ],
    quikStart: ['npm run dev'],
  },
  'react-vite': {
    description: 'Single Page App Starter Template using React (Vite) and Typescript.',
    folderPath: 'templates/react-vite',
    name: 'react-vite',
    repoUrl: 'https://github.com/MoralisWeb3/create-moralis-dapp.git',
    title: 'React',
    env: {
      fileName: '.env',
      variables: {
        api: {
          name: 'VITE_APP_MORALIS_API_KEY',
          desciption:
            'This API key is publicly visible in your app, make sure to set correct access rights in the admin panel',
        },
      },
    },
    commands: [
      { command: 'npm run dev', description: 'Starts the development server' },
      {
        command: 'npm run build',
        description: 'Bundles the app for production',
      },
      {
        command: 'npm run preview',
        description: 'Starts the production server',
      },
    ],
    quikStart: ['npm run dev'],
  },
  vanilla: {
    description: 'Static Starter Template using Vanilla JS.',
    folderPath: 'templates/vanilla',
    name: 'vanilla',
    repoUrl: 'https://github.com/MoralisWeb3/create-moralis-dapp.git',
    title: 'Vanilla JS',
    env: {
      fileName: '.env',
      variables: {
        api: {
          name: 'VITE_MORALIS_API_KEY',
          desciption:
            'This API key is publicly visible in your app, make sure to set correct access rights in the admin panel',
        },
      },
    },
    commands: [
      {
        command: 'npm run dev',
        description: 'Starts the development server',
      },
      {
        command: 'npm run build',
        description: 'Bundles the app for production',
      },
      {
        command: 'npm run preview',
        description: 'Starts the production server',
      },
    ],
    quikStart: ['npm run dev'],
  },
  'ethereum-boilerplate': {
    name: 'ethereum-boilerplate',
    description:
      'Full Stack Template using Next.js next-auth chakra-ui web3uikit wagmi ethers and Typescript.',
    folderPath: '.',
    repoUrl: 'https://github.com/ethereum-boilerplate/ethereum-boilerplate.git',
    title: 'Ethereum Boilerplate',
    env: {
      fileName: '.env.local',
      variables: {
        api: {
          name: 'MORALIS_API_KEY',
          desciption: 'Moralis API Key',
        },
        secret: {
          name: 'NEXTAUTH_SECRET',
          value: crypto.randomBytes(16).toString('hex'),
          desciption:
            'This secret is used to encrypt your session cookies, make sure to set it to a secure value. Replace before deploying to production.',
        },
        url: {
          name: 'NEXTAUTH_URL',
          value: 'http://localhost:3000',
          desciption:
            'The URL of your app, used to generate absolute URLs. Replace before deploying to production.',
        },
      },
    },
    commands: [
      { command: 'npm run dev', description: 'Starts the development server' },
      {
        command: 'npm run build',
        description: 'Bundles the app for production',
      },
      { command: 'npm run start', description: 'Starts the production server' },
    ],
    quikStart: ['npm run dev'],
  },
};

export function generateTemplateChoices() {
  return Object.keys(templateConfigs).map((key) => ({
    title: `${templateConfigs[key].title} ${chalk.gray
      .dim`- ${templateConfigs[key].description}`}`,
    value: templateConfigs[key],
  }));
}
