import fs from 'fs-extra';
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
    this.tempRepoPath = path.join(destinationPath, '.tmp_repo');
  }

  async clone() {
    try {
      await this.cloneRepository();
      await this.changeWorkingDirectory();
      await this.checkoutFolder();
      await this.moveFolder();
      await this.cleanup();
      console.log('Folder cloned successfully!');
    } catch (error) {
      console.error(`Error cloning folder: ${error.message}`);
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
    return fs.move(
      path.join(this.tempRepoPath, this.folderPath),
      path.join(this.destinationPath, path.basename(this.folderPath)),
      { overwrite: true }
    );
  }

  async cleanup() {
    return fs.remove(this.tempRepoPath);
  }
}
