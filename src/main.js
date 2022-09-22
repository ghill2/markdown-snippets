const codeBlocks = require('code-blocks')
const fs = require('fs')
const path = require('path');
const util = require('./util')
module.exports = {parseFiles}

const SNIPPETS_FOLDER = util.getSnippetsFolderPath()
const MARKDOWN_FOLDER = util.getMarkdownFolderPath()
const SNIPPETS_FILE = path.join(SNIPPETS_FOLDER, "snippets.code-snippets")
var COUNTER = 0;

var flatten = require('flat')

// var SNIPPETS = {};
// --------------------------------------------------------------------

async function parseFiles() {
    
    console.log(
        "SnippetsFolder: " + SNIPPETS_FOLDER,
        "\n",
        "MarkdownFolder: " + MARKDOWN_FOLDER
    )
    if (MARKDOWN_FOLDER == "") {
        console.log("Markdown folder not set.")
        return
    }
    util.ensureFileExists(SNIPPETS_FILE)

    var files = util.getFilesRecursively(MARKDOWN_FOLDER, ".md")
    
    let jsonDicts = await Promise.all(files.map(item => parseFile(item)))
    console.log(jsonDicts)
    var jsonDict = util.flattenArrayOfDicts(jsonDicts)
    console.log(jsonDict)
    var jsonText = JSON.stringify(jsonDict, null, 2)
    console.log(jsonText)
    fs.writeFileSync(SNIPPETS_FILE, jsonText)
    

    const count = Object.keys(jsonDict).length;
    console.log(`Written ${count} snippets....`)
    // console.log(jsonText)
    return count
    
}


// --------------------------------------------------------------------

function parseFile(filePath) {
    return codeBlocks.fromFile(filePath)
        .then(blocks => {
            var snippets = {};
            blocks.forEach(item => {
                if (!item.title) {return}
                snippets[item.title] = Snippet.fromObject(item).toDict()
            })
            return snippets
        })
    
}

// --------------------------------------------------------------------

class Snippet {
    constructor(
        scope, // string
        prefix, // string
        body, // string[]
        description // string
    ) {
        this.scope = scope // the language
        this.prefix = prefix
        this.body = body
        this.description = description
    }
    toDict() {
        return {"scope": this.scope,
                "prefix": this.prefix,
                "body": this.body,
                "description": this.description}
    }
    static fromObject(obj) {
        var pre = ""
        if (typeof obj.info.pre !== "undefined" ) {
            pre = obj.info.pre // Object has a prefix.
        }

        var desc = ""
        if (typeof obj.info.desc !== "undefined" ) {
            desc = obj.info.desc // Object has a description.
        }
        return new Snippet( obj.lang,
                            pre,
                            this.textToSnippetBody(obj.value),
                            desc)
    }
    static textToSnippetBody(text) {
        var body = text.split(/\r\n|\r|\n/)
            
        const isEmptyLine = (line) =>
            !line
            || line.trim() === ''
            || line.trim() === '/n'
            || line.trim() === '/r'
            || line.trim() === '/r/n'
    
        const trimBody = [...body]
        for (let i = 0; i < body.length; i++) {
            if (!isEmptyLine(body[i]))
            break
            trimBody.shift()
        }
        for (let j = body.length - 1; j >= 0; j--) {
            if (!isEmptyLine(body[j]))
            break
            trimBody.pop()
        }
        
        return trimBody
    }
    
}