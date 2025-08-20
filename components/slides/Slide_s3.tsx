import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Low barrier, fast wins**: small court, underhand serve, simple rules mean beginners rally in minutes
- **More play, less strain**: slower ball and compact space = more touches, longer rallies, less running
- **Social by design**: doubles format encourages teamwork, laughs, and inclusive play across ages
- **Affordable access**: low-cost starter paddles and many public courts make entry easy
- **Familiar feel**: skills from tennis, ping-pong, and badminton transfer quickly
\`\`\`mermaid
flowchart TD
A["Low barrier"] --> B["Quick rallies"]
B --> C["Immediate reward"]
C --> D["Social connection"]
D --> E["Motivation to return"]
E --> A
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Why It’s So Fun and Easy to Love</h1>
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