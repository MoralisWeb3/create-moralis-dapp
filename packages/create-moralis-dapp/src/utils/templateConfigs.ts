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
        },
      },
    },
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
        },
        secret: {
          name: 'NEXTAUTH_SECRET',
          value: crypto.randomBytes(16).toString('hex'),
        },
        url: {
          name: 'NEXTAUTH_URL',
          value: 'http://localhost:3000',
        },
      },
    },
  },
  'react-vite': {
    description: 'React project using Vite (recommended for rapid prototyping)',
    folderPath: 'demos/react-vite',
    name: 'react-vite',
    repoUrl: 'https://github.com/MoralisWeb3/create-moralis-dapp.git',
    title: 'React + Vite',
    env: {
      fileName: '.env',
      variables: { api: { name: 'VITE_APP_MORALIS_API_KEY' } },
    },
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
      variables: { api: { name: 'PUBLIC_MORALIS_API_KEY' } },
    },
  },
  'ethereum-boilerplate': {
    name: 'ethereum-boilerplate',
    description: 'Next.js next-auth chakra-ui web3uikit wagmi ethers',
    folderPath: '',
    repoUrl: 'https://github.com/ethereum-boilerplate/ethereum-boilerplate.git',
    title: 'Ethereum Boilerplate',
    env: {
      fileName: '.env.local',
      variables: {
        api: {
          name: 'MORALIS_API_KEY',
        },
        secret: {
          name: 'NEXTAUTH_SECRET',
          value: crypto.randomBytes(16).toString('hex'),
        },
        url: {
          name: 'NEXTAUTH_URL',
          value: 'http://localhost:3000',
        },
      },
    },
  },
};

export function generateTemplateChoices() {
  return Object.keys(templateConfigs).map((key) => ({
    title: templateConfigs[key].title,
    description: templateConfigs[key].description,
    value: templateConfigs[key],
  }));
}
