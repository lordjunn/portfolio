"use client"

import { useEffect } from "react"

export default function SyntaxHighlighter() {
  useEffect(() => {
    // Simple syntax highlighter function
    function highlightSyntax() {
      const codeBlocks = document.querySelectorAll("pre.code-block code")

      codeBlocks.forEach((codeBlock) => {
        const parent = codeBlock.parentElement
        if (!parent) return

        const language = Array.from(parent.classList)
          .find((cls) => cls.startsWith("language-"))
          ?.replace("language-", "")

        if (!language) return

        let html = codeBlock.innerHTML

        // HTML/XML highlighting
        if (language === "html" || language === "xml") {
          html = html
            // Tags
            .replace(/(&lt;\/?)(\w+)(\s|&gt;)/g, '$1<span class="token tag">$2</span>$3')
            // Attributes
            .replace(/(\s)(\w+)=/g, '$1<span class="token attr-name">$2</span>=')
            // Attribute values
            .replace(/=(&quot;.*?&quot;|&#039;.*?&#039;)/g, '=<span class="token attr-value">$1</span>')
            // Comments
            .replace(/(&lt;!--)(.*?)(--&gt;)/g, '<span class="token comment">$1$2$3</span>')
        }

        // CSS highlighting
        else if (language === "css") {
          html = html
            // Selectors
            .replace(/([^{}]*)(\{)/g, '<span class="token selector">$1</span>$2')
            // Properties
            .replace(/(\s*)([a-z-]+)(\s*:)/g, '$1<span class="token property">$2</span>$3')
            // Values
            .replace(/(:)([^;{}]*)([;}])/g, '$1<span class="token value">$2</span>$3')
            // Comments
            .replace(/(\/\*)(.*?)(\*\/)/gs, '<span class="token comment">$1$2$3</span>')
        }

        // JavaScript/TypeScript highlighting
        else if (language === "javascript" || language === "js" || language === "typescript" || language === "ts") {
          const keywords = [
            "var",
            "let",
            "const",
            "function",
            "class",
            "extends",
            "return",
            "if",
            "else",
            "for",
            "while",
            "switch",
            "case",
            "break",
            "continue",
            "new",
            "this",
            "import",
            "export",
            "from",
            "as",
            "async",
            "await",
            "try",
            "catch",
            "throw",
            "typeof",
            "instanceof",
          ]

          // Keywords
          keywords.forEach((keyword) => {
            const regex = new RegExp(`\\b(${keyword})\\b`, "g")
            html = html.replace(regex, '<span class="token keyword">$1</span>')
          })

          // Strings
          html = html.replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token string">$1</span>')

          // Numbers
          html = html.replace(/\b(\d+)\b/g, '<span class="token number">$1</span>')

          // Comments
          html = html.replace(/(\/\/.*?)(\n|$)/g, '<span class="token comment">$1</span>$2')
          html = html.replace(/(\/\*)(.*?)(\*\/)/gs, '<span class="token comment">$1$2$3</span>')
        }

        // Bash/Shell highlighting
        else if (language === "bash" || language === "shell") {
          const commands = [
            "cd",
            "ls",
            "mkdir",
            "rm",
            "cp",
            "mv",
            "echo",
            "cat",
            "grep",
            "find",
            "sudo",
            "apt",
            "apt-get",
            "npm",
            "yarn",
            "git",
          ]

          // Commands
          commands.forEach((cmd) => {
            const regex = new RegExp(`\\b(${cmd})\\b`, "g")
            html = html.replace(regex, '<span class="token keyword">$1</span>')
          })

          // Variables
          html = html.replace(/(\$\w+)/g, '<span class="token function">$1</span>')

          // Strings
          html = html.replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token string">$1</span>')

          // Comments
          html = html.replace(/(#.*?)(\n|$)/g, '<span class="token comment">$1</span>$2')
        }

        // PowerShell highlighting
        else if (language === "powershell") {
          // Cmdlets
          html = html.replace(/\b([A-Z]\w+-\w+)\b/g, '<span class="token keyword">$1</span>')

          // Variables
          html = html.replace(/(\$\w+)/g, '<span class="token function">$1</span>')

          // Strings
          html = html.replace(/(&quot;.*?&quot;|&#039;.*?&#039;)/g, '<span class="token string">$1</span>')

          // Comments
          html = html.replace(/(#.*?)(\n|$)/g, '<span class="token comment">$1</span>$2')
        }

        codeBlock.innerHTML = html
      })
    }

    // Run the highlighter
    highlightSyntax()
  }, [])

  return null
}

