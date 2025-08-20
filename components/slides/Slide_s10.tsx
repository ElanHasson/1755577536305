import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Quick recap:** Tennis + ping-pong + badminton = fast, social, easy-to-learn
- **Do this week:** Find a beginner session; bring a midweight paddle, 2 balls, court shoes
- **Play smart:** Learn serve, two-bounce rule, and the kitchen; warm up 5–8 min; call the score and "ball on"
- **Join & level up:** Open play, rotate partners, practice dinks/third-shot drop; try a clinic or light DUPR matching
- **Resources:** USA Pickleball rulebook/specs; local parks/club schedules; PPA/APP/MLP to watch pros; safety/setup checklist

\`\`\`mermaid
flowchart TD
A["Start"] --> B["Find beginner session"]
B --> C["Learn basics: serve, two-bounce, kitchen"]
C --> D["Play open sessions"]
D --> E["Level up: dinks, third-shot drop, clinic"]
E --> F["Share & invite others"]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Wrap-Up and Next Steps: Actionable Takeaways and Resources</h1>
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