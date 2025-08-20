import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- Serve mechanics: underhand swing; contact below waist; behind baseline; aim diagonally cross-court; call the score before serving
- Two-bounce rule: serve must bounce on receiver; return must bounce on server; only then can anyone volley; early volley = fault
- Kitchen awareness: no volley while in/on NVZ line; step in only after a bounce; control momentum so feet don’t carry you into NVZ
- Quick cues: low-to-high swing; watch for bounce-bounce; heels soft near the line; say “ball on” to stop play
\`\`\`mermaid
flowchart TD
S["Serve: underhand, below waist, diagonal"] --> B1["Bounce 1: lands on receiver"]
B1 --> R["Return: after bounce"]
R --> B2["Bounce 2: lands on server"]
B2 --> OK["Now volleys allowed"]
OK --> V["Volley attempt"]
V --> K["Kitchen check: feet not on/in NVZ"]
K -->|Feet outside NVZ| Legal["Legal volley"]
K -->|Foot on/in NVZ| Fault["Fault: kitchen violation"]
R -->|Early volley on serve| Fault
S -->|Serve fault: out or net| Fault
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Live Demo: Serve Mechanics, Two-Bounce Timing, and Kitchen Awareness</h1>
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