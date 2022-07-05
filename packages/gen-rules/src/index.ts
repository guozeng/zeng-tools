import spawnFn from './git/index'
import prettier from './prettier/index'

import mst from 'minimist'

const argv = mst(process.argv.slice(2))

const commands = ['git-rmv', 'git-prettylog', 'prettier']

if (argv._.length === 0) {
  console.warn('gr <command>')
} else if (!commands.includes(argv._[0])) {
  console.error(`gr: ${argv._[0]} 命令不存在`)
} else {
  const command = argv._[0]
  switch (command) {
    case 'git-rmv':
    case 'git-prettylog':
      spawnFn(argv)
      break
    case 'prettier':
      const f = argv.a
      prettier(f)
      break
  }
}
