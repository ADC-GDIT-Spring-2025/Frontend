import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Typed from 'typed.js';

interface MarkdownTypedRendererProps {
    markdownContent: string;
    
}

const MarkdownTypedRenderer: React.FC<MarkdownTypedRendererProps> = ({ markdownContent }) => {
  const typedRef = useRef<HTMLDivElement | null>(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize Typed.js
    if (typedRef.current) {
      // Destroy previous instance if it exists
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }

      // Create new Typed instance
      typedInstanceRef.current = new Typed(typedRef.current, {
        strings: [markdownContent],
        typeSpeed: 10,
        showCursor: true,
        cursorChar: '|',
        onComplete: () => {
          // When typing is complete, show the markdown content
          if (contentRef.current) {
            contentRef.current.style.display = 'block';
          }
          if (typedRef.current) {
            typedRef.current.style.display = 'none'; // Hide the typed text
          }
          // Hide the cursor
          if (typedRef.current) {
            typedRef.current.nextElementSibling?.classList.add('hidden'); // Ensure the cursor is hidden
          }
        }
      });
    }

    return () => {
      // Clean up Typed instance on unmount
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, [markdownContent]);

  return (
    <div className="relative">
      {/* Typed.js will type into this element */}
      <div className="font-mono whitespace-pre-wrap text-white" ref={typedRef}></div>
      
      {/* The actual markdown render that will replace the typed text when complete */}
      <div 
        ref={contentRef} 
        className="prose max-w-none text-white" 
        style={{ display: 'none' }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default MarkdownTypedRenderer;