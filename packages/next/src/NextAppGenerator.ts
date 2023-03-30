import { AppGenerator, TemplateProcessor } from '@create-moralis-dapp/toolkit';
import crypto from 'crypto';
import path from 'path';
import yargs from 'yargs';
import { NextAppInquirer } from './NextAppInquirer';
import { baseAppConfig } from './generators/base-app';

// enum Network {
//   Solana,
//   Evm,
// }

// enum EvmWeb3Lib {
//   Wagmi,
//   Web3React,
// }

// enum EvmWalletConnector {
//   WalletConnect,
//   Raimbowit,
//   Web3Auth,
// }

export class NextAppGenerator implements AppGenerator {
  public readonly name = 'NextJS            [only frontend]';

  public async generate() {
    const answers = await NextAppInquirer.inquire();

    const { isDevMode } = yargs.argv;
    console.log('isDevMode: ', isDevMode);

    const destination = this.getDestination(answers.name, isDevMode as boolean);

    // clonning base App
    await new TemplateProcessor(
      baseAppConfig.template,
      destination
    ).copyTemplate();

    // clonning styled App
    await new TemplateProcessor(
      answers.styling.template,
      destination
    ).copyTemplate();

    // clonning web3Stack
    await new TemplateProcessor(
      answers.web3Stack.template,
      destination
    ).copyTemplate();

    // web3Stack
    // styling

    // answers.plugins.forEach((AppPlugin) => {
    //   // console.log('AppPlugin: ', AppPlugin);
    //   const modifications = AppPlugin.getModifications(answers);
    //   //@ts-ignore
    //   files._app.imports.push(modifications._app.imports);
    //   //@ts-ignore
    //   files._app.config.push(modifications._app.config);
    //   //@ts-ignore
    //   files._app.wrappers.push(...modifications._app.wrappers);
    //   //@ts-ignore
    //   files.example = modifications.example;
    // });

    // const data = {
    //   ...answers,
    //   files: {
    //     _app: {
    //       imports: files._app.imports.join('\n'),
    //       configs: files._app.config.join('\n'),
    //       wrappers: files._app.wrappers,
    //     },
    //     example: files.example,
    //   },
    //   nextAuthSecret: this.generateSecret(),
    // };
    // const destination = this.getDestination(answers.name);

    // const fileGenerator = new NextAppFilesGenerator(
    //   this.templatePath,
    //   destination
    // );
    // await fileGenerator.generate(data);

    // const depManager = new DependenciesManager(destination);
    // await depManager.addToPackageJson([{ name: 'wagmi', version: '0.6.7' }]);
    // await depManager.install(answers.packageManager);
  }

  // private cloneBaseApp(answers: any) {
  //   // const destination = this.getDestination(answers.name);
  //   // new TemplateProcessor(templatePath, destination)
  //   // const fileGenerator = new NextAppFilesGenerator(
  //   //   this.templatePath,
  //   //   destination
  //   // );
  //   // await fileGenerator.generate(data);
  // }

  private getDestination(name: string, isDevMode?: boolean) {
    return path.join(process.cwd(), isDevMode ? 'demos' : '', name);
  }

  private generateSecret() {
    return crypto.randomBytes(16).toString('hex');
  }
}
