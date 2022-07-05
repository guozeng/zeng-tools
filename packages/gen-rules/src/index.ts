import { exec } from 'child_process'

// git移除某文件的版本控制
// git rm -r --cached 文件
// 命令： gr git-rmv 文件

// git log
// git log --graph --oneline --decorate
// 命令： gr git-prettylog

import mst from 'minimist'

const argv = mst(process.argv.slice(2))

spawnFn(argv)

function spawnFn(options: { [x: string]: string } & { _: string[] }) {
  if (options._.length === 0) {
    console.warn('gr <command>')
    return
  }
  const command = options._[0]
  let spa

  switch (command) {
    case 'git-rmv':
      const files = options._[1] || '.'
      // spa = spawn('git', [`rm -r --cached ${files}`])
      exec(`git rm -r --cached ${files}`, (err, stdout, stderr) => {
        if (err) {
          return
        }
        console.log(stdout)
      })
      break
    case 'git-prettylog':
      // spa = spawn('git', ['log', '--graph', '--oneline', '--decorate'])
      exec(`git log --graph --oneline --decorate`, (err, stdout, stderr) => {
        if (err) {
          return
        }
        console.log(stdout)
      })
      break
    default:
      console.error(`gr: ${command} 命令不存在`)
      return
  }

  // spa.stdout.on('data', (data) => {
  //   console.log(`${data}`)
  // })
  // spa.stderr.on('data', (data) => {
  //   console.error(`${data}`)
  // })
  // spa.on('close', (code) => {
  //   // console.log(`child process exited with code ${code}`)
  // })
}
