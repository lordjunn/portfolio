import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked with highlight.js for syntax highlighting
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error(err);
      }
    }
    return code; // Use default escaping for unknown languages
  },
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert line breaks to <br>
  headerIds: true, // Add IDs to headers
  mangle: false, // Don't escape HTML
  pedantic: false, // Don't be pedantic
  sanitize: false, // Don't sanitize HTML
  smartLists: true, // Use smart lists
  smartypants: true // Use smart typography
});

export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    // Process markdown to HTML
    return marked.parse(markdown);
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return `<p>Error processing markdown content.</p>`;
  }
}