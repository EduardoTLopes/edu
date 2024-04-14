// import { Ollama } from "@langchain/community/llms/ollama";
import { OpenAI } from "@langchain/openai";
import {Command} from '@oclif/core'
import {execSync, spawn} from 'node:child_process';

const ollama = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default class Commit extends Command {
  static override description = 'Command to generate commits based on the changes in the git repository.'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    this.log('Diffs for tracked files:');
    const trackedDiffs = await this.runGitDiff();

    this.log('\nSimulated diffs for untracked files:');
    const untrackedDiffs = await this.showUntrackedFiles();

    const diffs = trackedDiffs + untrackedDiffs;

    console.log(`\n\n ### diffs: ${diffs} ### \n\n`)

    const stream = await ollama.invoke(
      `
      Given a list of changes, generate a commit message that summarizes the changes and also a body to the commit message so it can explain further what was done. 
      It should follow the format:
      feat|fix|docs|test(<featureName>): description of what changed

      Please find below the list of changes:

      ${diffs}
      `
    );
    

    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    this.log(`chunks join ${chunks.join("").trim()}`);

    execSync('git add .')
    execSync(`git commit -m "${chunks.join("").trim()}"`)
  }



  private formatUntrackedFiles(files: string[]): void {
    for (const file of files) {
      this.log(`diff --git a/${file} b/${file}`);
      this.log('new file mode 100644');
      this.log('index 0000000..e69de29');
      this.log('--- /dev/null');
      this.log(`+++ b/${file}`);
      this.log('@@ -0,0 +1 @@');
      const cat = spawn('cat', [file]);

      cat.stdout.on('data', data => this.log(`+${data.toString().replaceAll('\n', '\n+')}`));
      cat.stderr.on('data', data => this.error(data.toString()));

      cat.on('close', catCode => {
        if (catCode !== 0) {
          this.error(`cat command exited with code ${catCode}`);
        }
      });
    }
  }

  private runGitDiff(): Promise<string> {
    return new Promise((resolve, reject) => {
      const diff = spawn('git', ['diff', 'HEAD']);
      let diffString = '';

      diff.stdout.on('data', data => {
        diffString += data.toString();
      });

      diff.stderr.on('data', data => {
        this.error(data.toString());
        reject(new Error(`Error occurred while running git diff`));
      });

      diff.on('close', code => {
        if (code === 0) {
          resolve(diffString);
        } else {
          reject(new Error(`git diff exited with code ${code}`));
        }
      });
    });
  }

  private showUntrackedFiles(): Promise<string> {
    return new Promise((resolve, reject) => {
      const lsFiles = spawn('git', ['ls-files', '--others', '--exclude-standard']);
      let fileList: string = '';

      lsFiles.stdout.on('data', data => {
        fileList += data.toString();
      });
      lsFiles.stderr.on('data', data => {
        this.error(data.toString());
      });

      lsFiles.on('close', code => {
        if (code === 0) {
          resolve(fileList.trim());
        } else {
          reject(new Error(`git ls-files exited with code ${code}`));
        }
      });
    });
  }  
}


    