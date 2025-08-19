import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const mermaidRef = useRef(0);
  
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#667eea',
        primaryTextColor: '#fff',
        primaryBorderColor: '#7c3aed',
        lineColor: '#5a67d8',
        secondaryColor: '#764ba2',
        tertiaryColor: '#667eea',
        background: '#1a202c',
        mainBkg: '#2d3748',
        secondBkg: '#4a5568',
        tertiaryBkg: '#718096',
        textColor: '#fff',
        nodeTextColor: '#fff',
      }
    });
    
    // Find and render mermaid diagrams
    const renderDiagrams = async () => {
      const diagrams = document.querySelectorAll('.language-mermaid');
      for (let i = 0; i < diagrams.length; i++) {
        const element = diagrams[i];
        const graphDefinition = element.textContent;
        const id = `mermaid-${mermaidRef.current++}`;
        
        try {
          const { svg } = await mermaid.render(id, graphDefinition);
          element.innerHTML = svg;
          element.classList.remove('language-mermaid');
          element.classList.add('mermaid-rendered');
        } catch (error) {
          console.error('Mermaid rendering error:', error);
        }
      }
    };
    
    renderDiagrams();
  }, [markdown]);
  
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
                <pre className="language-mermaid">
                  <code>{String(children).replace(/\n$/, '')}</code>
                </pre>
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