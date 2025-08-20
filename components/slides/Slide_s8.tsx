import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Quick poll:** Where did you first hear about pickleball? Vote now or drop a letter in chat: F Friend/neighbor, S Social/media, W Work/school, C Club/gym, O Other
- Fastest-growing U.S. sport for multiple years; both casual and core participation still rising into 2024
- Culture shift: from neighborhood courts to pro tours and team leagues; celebrity investment and nonstop streaming
- Facilities boom: dedicated indoor clubs, tennis-to-pickleball conversions, smarter noise solutions
- Why it sticks: small court, social doubles, quick rallies—easy to start, rewarding to keep playing
\`\`\`mermaid
flowchart LR
Discover["Hear from a friend or media"] --> Try["First open play or clinic"]
Try --> Connect["Meet partners and join group chats"]
Connect --> Compete["Local ladders, rec nights, watch pros"]
Compete --> Sustain["Weekly habit and community identity"]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Culture and Growth: Quick Poll and Key Trends</h1>
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