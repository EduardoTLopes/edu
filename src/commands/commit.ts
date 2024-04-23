// import { Ollama } from "@langchain/community/llms/ollama";
import {checkbox} from '@inquirer/prompts'
import {Command, Flags} from '@oclif/core'
import {execSync} from 'node:child_process'

// Correcting the import error by ensuring proper syntax and file path
import {runLLM} from '../helpers/ai/openai/commit-generation.js'
import {addFilesStatus, listGitTrackedFiles, listGitUntrackedFiles} from '../helpers/git/index.js'

export default class Commit extends Command {
  static description = 'Command to generate commits based on the changes in the git repository.'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    gpt: Flags.boolean({
      char: 'g',
      description: 'Use GPT-4 to generate the commit message.',
    }),
    llama: Flags.boolean({
      char: 'l',
      description: 'Use Ollama to generate the commit message.',
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Commit)

    // unstage all files

    execSync('git reset HEAD -- .')

    // list files that are being tracked by git
    const trackedFiles = listGitTrackedFiles()

    // list files that are not being tracked by git

    const untrackedFiles = listGitUntrackedFiles()

    // put together trackedFiles and UntrackedFiles

    const allFiles = [...trackedFiles, ...untrackedFiles]

    // ask user to select files to commit

    const filesToCommit = await checkbox({
      choices: allFiles.map((file) => ({name: file, value: file})),
      message: 'Select files to commit',
    })

    // check if file was deleted

    const filesStatus = addFilesStatus(filesToCommit).map((file) => {
      const isTracked = trackedFiles.includes(file.path)
      return {...file, isTracked}
    })

    // get the diff of the files on fileStatus

    const chunks = filesStatus.map((file) => {
      let diffString: string = ''
      if (file.isTracked) {
        if (file.status === 'D') {
          diffString += `file ${file.path} was deleted\n`
        } else {
          const diff = execSync(`git diff -- ${file.path}`).toString()
          diffString += `\n${diff}`
        }

        if (file.path.includes('.lock')) {
          diffString += `file ${file.path} was updated\n`
        }
      } else {
        // Only read the file content if it's not tracked (hence, not deleted)
        diffString += `\n${execSync(`cat -- ${file.path}`).toString()}`
      }

      return diffString
    })
    let commitMessage = ''
    if (flags.llama) {
      // use ollama to generate the commit message
    }

    if (flags.gpt) {
      const response = await runLLM(chunks.join('').trim())
      console.log({response})
      commitMessage = response
    }

    for (const file of filesStatus) {
      execSync(`git add ${file.path}`, {stdio: 'ignore'})
    }

    execSync(`git commit -m "${commitMessage}"`)
  }
}
