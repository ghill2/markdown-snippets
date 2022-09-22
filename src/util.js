// import { type } from 'os'
// import { join } from 'path'
const path = require('path');
const os = require('os');
const fs = require('fs')
const glob = require("glob");

function flattenArrayOfDicts(arr) {
    var dict = {};
    for (const d of arr) {
        for (const [key, value] of Object.entries(d)) {
            dict[key] = value
        }
    }
    return dict
}

function getMarkdownFolderPath() {
    try {
        const vscode = require('vscode');
        return vscode.workspace.getConfiguration().get("markdownSnippets.markdownFolder", "");
    }
    catch(err) {
        return "/Users/g1/Desktop/dotfiles/snippets"
    }
}
// https://github.com/promise96319/snippets-manager/blob/2f38d61e6810cb8c4c04146b6477b61b2b994bec/src/utils/vscode.ts#L12
function getSnippetsFolderPath() {
    console.log(os.type())
    let vsCodeUserSettingsPath
    const isInsiders = /insiders/i.test(process.argv0)
    const isCodium = /codium/i.test(process.argv0)
    const isOSS = /vscode-oss/i.test(__dirname)
    const CodeDir = isInsiders ? 'Code - Insiders' : isCodium ? 'VSCodium' : isOSS ? 'Code - OSS' : 'Code'
    const isPortable = !!process.env.VSCODE_PORTABLE
    if (isPortable) {
      vsCodeUserSettingsPath = `${process.env.VSCODE_PORTABLE}/user-data/User/`
    }
    else {
      switch (os.type()) {
        case 'Darwin':
          vsCodeUserSettingsPath = `${process.env.HOME}/Library/Application Support/${CodeDir}/User/`
          break
        case 'Linux':
          vsCodeUserSettingsPath = `${process.env.HOME}/.config/${CodeDir}/User/`
          break
        case 'Windows_NT':
          vsCodeUserSettingsPath = `${process.env.APPDATA}\\${CodeDir}\\User\\`
          break
        default:
          vsCodeUserSettingsPath = `${process.env.HOME}/.config/${CodeDir}/User/`
          break
      }
    }
    return path.join(vsCodeUserSettingsPath, 'snippets')
  }

function getFilesRecursively(folder, ext) {
  return glob.sync(`${folder}/**/*${ext}`)
}
function ensureFileExists(file) {
    if (fs.existsSync(file)) {return}
    fs.mkdirSync(file, { recursive: true })
    fs.writeFileSync(file, '{}')
}


module.exports = {getSnippetsFolderPath, getMarkdownFolderPath, ensureFileExists, getFilesRecursively, flattenArrayOfDicts}