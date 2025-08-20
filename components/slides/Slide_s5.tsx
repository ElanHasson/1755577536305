import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- Serve basics
  - Underhand only; contact below the waist; paddle swings upward; feet behind baseline
  - Serve diagonally cross-court; one try (let serves are playable if they land in)
  - Call the score before you serve
- Two-bounce rule
  - On the serve, ball must bounce once on the returner’s side and once on the server’s side before any volley
- Kitchen (Non-Volley Zone)
  - 7 ft from the net; you can enter to hit a ball that bounced
  - No volleys while any part of you touches the NVZ or its line; re-establish both feet outside before volleying
- Scoring (rec standard)
  - Side-out scoring to 11, win by 2; only the serving team scores
  - Doubles call format: server score – receiver score – server # (1 or 2); first serve of game starts as “0-0-2”
\`\`\`text
Score call examples
Start: 0-0-2
Server says: 5-4-1 (first server on the team)
If rally won by servers: next call 6-4-1
If rally lost: partner serves → 5-4-2
\`\`\`
\`\`\`mermaid
flowchart TD
A["Call score"] --> B["Underhand serve diagonally (below waist)"]
B --> C["Return must bounce once"]
C --> D["Serving team lets next shot bounce"]
D --> E["After two bounces: volleys allowed outside Kitchen"]
E --> F{"Feet in Kitchen?"}
F -->|Yes| G["No volley — let it bounce or exit first"]
F -->|No| H["Volley allowed"]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Rules in a Minute: Serve, Two-Bounce Rule, Kitchen, and Scoring</h1>
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