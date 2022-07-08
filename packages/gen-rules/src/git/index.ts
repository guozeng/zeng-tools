import { writeFileSync } from 'fs'

const cwd = process.cwd()
const gitignore = `.DS_Store
.idea
*.cpuprofile
*.local
*.log
/.vscode/
dist
dist-*
node_modules
temp
TODOs.md
.eslintcache
.npmrc
pnpm-lock.yaml
test
`

function fn(command: string) {
  switch (command) {
    case 'git-ignore':
      writeFileSync(`${cwd}/.gitignore`, gitignore, {
        encoding: 'utf-8'
      })
      break
    default:
  }
}

export = fn
