export type GitFileStatus = 'A' | 'C' | 'D' | 'M' | 'R' | 'S' | 'U'
export type GitFiles = {
  path: string
  status: GitFileStatus
}
