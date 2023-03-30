import { Inquirer } from '@create-moralis-dapp/toolkit';
import { solanaWalletAdapter } from './generators/solana';
import { chakraStylingConfig } from './generators/styled-app-chakra';
import { headlessStylingConfig } from './generators/styled-app-headless';
import { wagmiConfig } from './generators/wagmi';
import { wagmiWithRainbowKitConfig } from './generators/wagmi-rainbowkit';
import { web3ReactConfig } from './generators/web3-react';
import { StylingSystemConfig } from './types';

enum Network {
  EVM = 'evm',
  Solana = 'solana',
}

export class NextAppInquirer {
  private static commonQuestions = Inquirer.commonQuestions;

  public static async inquire() {
    const { confirmBeta, name } = await Inquirer.inquire([
      this.commonQuestions.confirmBeta,
      this.commonQuestions.name,
    ]);

    const { network }: { network: Network } = await Inquirer.inquire({
      name: 'network',
      type: 'select',
      choices: [
        {
          title:
            'Evm (Ethereum/BNB/Polygon/Avalanche/Fantom/Cronos/Arbitrum/Optimism)',
          value: Network.EVM,
        },
        { title: 'Solana', value: Network.Solana },
      ],
      message: 'Select a network:',
    });

    const { styling }: { styling: StylingSystemConfig } =
      await Inquirer.inquire({
        name: 'styling',
        type: 'select',
        choices: [
          { title: 'Headless', value: headlessStylingConfig },
          { title: 'Chakra', value: chakraStylingConfig },
        ],
        message: 'Select a style:',
      });

    const web3Stacks = {
      evm: [
        { title: 'wagmi', value: wagmiConfig },
        { title: 'wagmi + rainbowkit', value: wagmiWithRainbowKitConfig },
        { title: 'web3-react', value: web3ReactConfig },
      ],
      solana: [{ title: 'Solana wallet adapter', value: solanaWalletAdapter }],
    };

    const { web3Stack } = await Inquirer.inquire({
      type: 'select',
      name: 'web3Stack',
      choices: web3Stacks[network],
      message: 'Select a Web3 stack:',
    });

    const { moralisApiKey, packageManager } = await Inquirer.inquire([
      this.commonQuestions.moralisApiKey,
      this.commonQuestions.packageManager,
    ]);

    return {
      confirmBeta,
      name,
      moralisApiKey,
      packageManager,
      web3Stack,
      styling,
    };
  }
}
