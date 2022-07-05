import { exec } from 'child_process'

// git移除某文件的版本控制
// git rm -r --cached 文件
// 命令： gr git-rmv 文件

// git log
// git log --graph --oneline --decorate
// 命令： gr git-prettylog

function spawnFn(options: { [x: string]: string } & { _: string[] }) {
  const command = options._[0]
  switch (command) {
    case 'git-rmv':
      const files = options._[1] || '.'
      exec(`git rm -r --cached ${files}`, (err, stdout, stderr) => {
        if (err) {
          return
        }
        console.log(stdout)
      })
      break
    case 'git-prettylog':
      exec(`git log --graph --oneline --decorate`, (err, stdout, stderr) => {
        if (err) {
          return
        }
        console.log(stdout)
      })
      break
    default:
      return
  }
}

export = spawnFn
