import {execSync} from 'node:child_process'

import {GitFileStatus, GitFiles} from './types.js'

export function listGitTrackedFiles() {
  const files = execSync('git diff --name-only').toString().split('\n')
  files.pop()
  return files
}

export function listGitUntrackedFiles() {
  const files = execSync('git ls-files --others --exclude-standard').toString().split('\n')
  files.pop()
  return files
}

export function addFilesStatus(filesToCommit: Array<string>) {
  const filesStatus: GitFiles[] = filesToCommit.map((file) => {
    const fileStatusOutput = execSync(`git status --porcelain ${file}`).toString().trim()
    return {path: file, status: fileStatusOutput.slice(0, 1) as GitFileStatus}
  })

  return filesStatus
}
