import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- Where to play: public parks, school gyms, rec centers, dedicated clubs; look for "open play", beginner socials, and city rec classes
- What to bring: midweight paddle, indoor/outdoor balls for your venue, court shoes, water; optional eye protection; keep a spare ball
- Safety first: 5–8 min dynamic warm-up; court shoes (not running); hydrate, sunscreen; call "ball on"; turn and run—don’t backpedal
- Inclusive options: wheelchair/para rules, slower balls and drills, beginner-only hours, loaner paddles, light use of ratings to match play
- Quick setup anywhere: portable net + tape lines; mark the kitchen; post a one-page rules and etiquette cheat sheet

\`\`\`mermaid
flowchart TD
Start["Find place to play"]
Where["Parks, rec centers, gyms, clubs"]
Prepare["Warm-up, proper shoes, water, eyewear"]
Include["Beginner hours, adaptive options, loaner gear"]
Play["Safe, fun games"]
Start --> Where --> Prepare --> Include --> Play
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Getting Started: Where to Play, Safety, and Inclusive Options</h1>
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