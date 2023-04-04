import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import simpleGit from 'simple-git';

export class GitFolderCloner {
  private tempRepoPath: string;
  private git = simpleGit();

  constructor(
    private repoUrl: string,
    private folderPath: string,
    private destinationPath: string
  ) {
    this.tempRepoPath = path.join(os.tmpdir(), 'tmp_create-moralis-dapp');
  }

  async clone() {
    try {
      await this.checkDestinationExists();
      await this.cloneRepository();
      await this.changeWorkingDirectory();
      await this.checkoutFolder();
      await this.moveFolder();
      console.log('Folder cloned successfully!');
    } catch (error) {
      await fs.remove(this.destinationPath);
      throw new Error(`Error cloning folder: ${error.message}`);
    } finally {
      await this.cleanup();
    }
  }

  async checkDestinationExists() {
    const destinationExists = await fs.pathExists(this.destinationPath);
    if (destinationExists) {
      throw new Error(
        `Error cloning folder: A folder with the same name already exists in the destination path: ${this.destinationPath}`
      );
    }
  }

  async cloneRepository() {
    return this.git.clone(this.repoUrl, this.tempRepoPath, [
      '--depth',
      '1',
      '--no-checkout',
    ]);
  }

  async changeWorkingDirectory() {
    return this.git.cwd(this.tempRepoPath);
  }

  async checkoutFolder() {
    return this.git.checkout('HEAD', ['--', this.folderPath]);
  }

  async moveFolder() {
    const src = path.join(this.tempRepoPath, this.folderPath);
    return fs.move(src, this.destinationPath);
  }

  async cleanup() {
    await fs.remove(this.tempRepoPath);
  }
}
