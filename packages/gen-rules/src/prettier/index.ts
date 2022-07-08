// import { resolve } from 'path'
import { writeFileSync, mkdirSync, existsSync } from 'fs'

const cwd = process.cwd()

const prettierConfig = `module.exports = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
  bracketSameLine: false,
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: 'ignore',
  arrowParens: 'always',
}
`
const prettierIgnore = `*.yaml
**/dist/*
.npmrc
`

const editorConfig = `root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
quote_type = single
`

const vscodeSettings = `{
  "editor.formatOnSave": true
}`

export = (formatOnSave?: boolean) => {
  writeFileSync(`${cwd}/.prettierrc.js`, prettierConfig, {
    encoding: 'utf-8'
  })
  writeFileSync(`${cwd}/.prettierignore`, prettierIgnore, {
    encoding: 'utf-8'
  })
  writeFileSync(`${cwd}/.editorconfig`, editorConfig, {
    encoding: 'utf-8'
  })

  if (formatOnSave) {
    if (!existsSync(`${cwd}/.vscode`)) {
      mkdirSync(`${cwd}/.vscode`)
    }
    writeFileSync(`${cwd}/.vscode/settings.json`, vscodeSettings, {
      encoding: 'utf-8'
    })
  }
}
