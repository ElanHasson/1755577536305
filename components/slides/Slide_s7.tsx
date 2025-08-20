import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Dink (soft control)**: Gentle shot that lands in the kitchen; aim cross-court; keep paddle face slightly open and contact out front
- **Third-Shot Drop (after serve)**: Arc the ball 3–5 ft over the net so it falls in the kitchen; move forward together to the NVZ line
- **Drive (apply pressure)**: Fast, flat ball to body/feet when the return is high; expect a block and be ready to reset softly
- **Simple plan**: Serve deep, return deep; choose drop ~70% and drive ~30%; win with patience at the NVZ, not raw power
\`\`\`mermaid
flowchart LR
S["Serve (underhand)"] --> R["Return (deep)"]
R --> Q["Third shot: assess height"]
Q -->|low or neutral| Drop["Drop: arc to kitchen"]
Q -->|high sitter| Drive["Drive: fast to body/feet"]
Drop --> NVZ["Advance to NVZ and dink"]
Drive --> Block["Expect block; reset softly"]
Block --> NVZ
NVZ --> Win["Create error or pop-up"]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Key Shots and Simple Strategies: Dinks, Third-Shot Drops, and Drives</h1>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code({node, inline, className, children, ...props}: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            // Handle inline code
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            
            // Handle mermaid diagrams
            if (language === 'mermaid') {
              return (
                <Mermaid chart={String(children).replace(/\n$/, '')} />
              );
            }
            
            // Handle code blocks with syntax highlighting
            if (language) {
              return (
                <SyntaxHighlighter
                  language={language}
                  style={atomDark}
                  showLineNumbers={true}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            
            // Default code block without highlighting
            return (
              <pre>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}