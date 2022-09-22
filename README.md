# markdown-snippets README

## Features

Parse Markdown code blocks into VSCode snippets.

* multiple files.
* multiple snippets per file.
* multiple languages per file allowed. See [VSCode language identifiers](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers).

<br>

---

## Snippet format

<br>

\#\# My Cool Snippet

\`\`\`python pre="hworld" desc="insert hello world"

print("Hello World")

\`\`\`

<br>

IMPORTANT:

The language identifier is needed. See [VSCode language identifiers](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers).

The pre, desc tag are optional.

<br>

---

## How to use

**1) Set this setting in settings.json:**

* `markdownSnippets.markdownFolder`: The path to the folder with your markdown files.

**2) Run command Save Snippets from command palette.**

* Snippets are also exported when VSCode starts up.

<br>

---

## Release Notes

### 1.0.0

Initial release.

<br>

---

## More information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

