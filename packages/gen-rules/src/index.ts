import gitFns from './git/index'
import prettier from './prettier/index'

import { exec } from 'child_process'
import { readFileSync } from 'fs'

// import mst from 'minimist'

// const argv = mst(process.argv.slice(2))

// const commands = ['git-rmv', 'git-prettylog', 'git-ignore', 'prettier']

// if (argv._.length === 0) {
//   console.warn('gr <command>')
// } else if (!commands.includes(argv._[0])) {
//   console.error(`gr: ${argv._[0]} 命令不存在`)
// } else {
//   const command = argv._[0]
//   switch (command) {
//     case 'git-rmv':
//     case 'git-prettylog':
//     case 'git-ignore':
//       spawnFn(argv)
//       break
//     case 'prettier':
//       const f = argv.a
//       prettier(f)
//       break
//   }
// }

import cac from 'cac'

const cli = cac('gr')

cli.command('git-rmv [file]', '移除某文件git版本控制').action((file = '.') => {
  exec(`git rm -r --cached ${file}`, (err, stdout, stderr) => {
    if (err) {
      return
    }
    console.log(stdout)
  })
})

cli.command('git-prettylog', '更漂亮的git log').action(() => {
  exec(`git log --graph --oneline --decorate`, (err, stdout, stderr) => {
    if (err) {
      return
    }
    console.table(stdout)
  })
})

cli.command('git-ignore', '生成.gitignore文件，包含一些常见配置').action(() => {
  gitFns('git-ignore')
})

cli
  .command('prettier', '生成prettier配置文件')
  .option('-a, --autoformat', 'vscode保存时自动格式化')
  .action((options) => {
    prettier(options.a)
  })

cli.help()

const cwd = process.cwd()
cli.version(
  JSON.parse(
    readFileSync(`${cwd}/package.json`, {
      encoding: 'utf-8',
    })
  ).version
)

cli.parse()

// console.log(JSON.stringify(parsed, null, 2))
