import { TemplateConfig } from '@create-moralis-dapp/toolkit';
import crypto from 'crypto';

export const templateConfigs: Record<string, TemplateConfig> = {
  next: {
    description:
      'Next.js project using create-next-app (recommended for rapid prototyping).',
    folderPath: 'demos/next',
    name: 'next',
    repoUrl: 'https://github.com/MoralisWeb3/create-moralis-dapp.git',
    title: 'Next.js',
    env: {
      fileName: '.env.local',
      variables: {
        api: {
          name: 'NEXT_PUBLIC_MORALIS_API_KEY',
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
      { command: 'npm run start', description: 'Starts the production server' },
    ],
    quikStart: ['npm run dev'],
  },
  'next-auth': {
    description: 'Next.js project with authentication using Moralis',
    folderPath: 'demos/next-auth',
    name: 'next-auth',
    repoUrl: 'https://github.com/MoralisWeb3/create-moralis-dapp.git',
    title: 'Next.js + Auth',
    env: {
      fileName: '.env.local',
      variables: {
        api: {
          name: 'NEXT_PUBLIC_MORALIS_API_KEY',
          desciption:
            'This API key is publicly visible in your app, make sure to set correct access rights in the admin panel',
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
    description: 'React project using Vite (recommended for rapid prototyping)',
    folderPath: 'demos/react-vite',
    name: 'react-vite',
    repoUrl: 'https://github.com/MoralisWeb3/create-moralis-dapp.git',
    title: 'React + Vite',
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
  'vanilla-webpack': {
    description:
      'Javascript + HTML project using Webpack (recommended for rapid prototyping)',
    folderPath: 'demos/vanilla-webpack',
    name: 'vanilla-webpack',
    repoUrl: 'https://github.com/MoralisWeb3/create-moralis-dapp.git',
    title: 'Vanilla + Webpack',
    env: {
      fileName: '.env',
      variables: {
        api: {
          name: 'PUBLIC_MORALIS_API_KEY',
          desciption:
            'This API key is publicly visible in your app, make sure to set correct access rights in the admin panel',
        },
      },
    },
    commands: [
      {
        command: 'npm run serve',
        description: 'Starts the development server',
      },
      {
        command: 'npm run build',
        description: 'Bundles the app for production',
      },
    ],
    quikStart: ['npm run build', 'npm run serve'],
  },
  'ethereum-boilerplate': {
    name: 'ethereum-boilerplate',
    description: 'Next.js next-auth chakra-ui web3uikit wagmi ethers',
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
    quikStart: ['npm run build'],
  },
};

export function generateTemplateChoices() {
  return Object.keys(templateConfigs).map((key) => ({
    title: templateConfigs[key].title,
    description: templateConfigs[key].description,
    value: templateConfigs[key],
  }));
}
