import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- Court at a glance: 20×44 ft; non-volley zone ("kitchen") is 7 ft from the net; net 36 in at posts, 34 in at center
- Gear essentials: midweight paddle (about 7.8–8.3 oz); balls—outdoor = harder/smaller holes, indoor = slightly softer/larger holes; optional eye protection
- Safe footwear: wear court shoes with lateral support; avoid running shoes; use lace-lock if heel slips
- Quick safety check: 5-min dynamic warm-up, hydrate, call "ball on" to pause play, don’t backpedal—turn and run
- Demo plan: mark NVZ with tape/cones, check net height at center, bounce-test indoor vs outdoor balls, side-to-side shoe stability test
\`\`\`mermaid
flowchart LR
  A["Arrive at court"] --> B["Check lines & net: 20x44 ft, NVZ 7 ft, net 34 in center"]
  B --> C["Pick paddle (7.8–8.3 oz) & ball (indoor/outdoor)"]
  C --> D["Footwear check: court shoes + lace-lock if needed"]
  D --> E["Quick warm-up & hydration"]
  E --> F["Ready to rally"]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Quick Tour: Court, Equipment, and Safe Footwear</h1>
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