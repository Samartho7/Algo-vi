import Editor from "@monaco-editor/react";
import { useRef, useEffect, useState } from "react";

export default function CodeEditor({
  code,
  setCode,
  language,
  highlightedLine,
}) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setIsLoading(false);
    
    // Add custom CSS for line highlighting
    const style = document.createElement('style');
    style.textContent = `
      .myLineHighlight {
        background: rgba(255, 193, 7, 0.2) !important;
        border-left: 4px solid #ffc107 !important;
        animation: highlight-pulse 2s ease-in-out;
      }
      
      @keyframes highlight-pulse {
        0%, 100% { background: rgba(255, 193, 7, 0.2) !important; }
        50% { background: rgba(255, 193, 7, 0.4) !important; }
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    if (
      editorRef.current &&
      monacoRef.current &&
      typeof highlightedLine === "number"
    ) {
      decorationRef.current = editorRef.current.deltaDecorations(
        decorationRef.current,
        [
          {
            range: new monacoRef.current.Range(
              highlightedLine,
              1,
              highlightedLine,
              1
            ),
            options: {
              isWholeLine: true,
              className: "myLineHighlight",
            },
          },
        ]
      );
    }
  }, [highlightedLine]);

  const getLanguageIcon = (lang) => {
    const icons = {
      javascript: "🟨",
      python: "🐍",
      java: "☕",
      cpp: "⚡",
      c: "🔧",
      typescript: "🔷",
      go: "🐹",
      rust: "🦀",
      php: "🐘",
      ruby: "💎",
    };
    return icons[lang] || "📝";
  };

  return (
    <div className="flex flex-col bg-gray-50 border-r border-gray-200 min-w-0 h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="flex items-center space-x-2 min-w-0">
              <span className="text-xl flex-shrink-0">{getLanguageIcon(language)}</span>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-gray-800 capitalize truncate">
                  {language} Editor
                </h2>
                <p className="text-xs text-gray-500 truncate">
                  Write your algorithm code here
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Live indicator */}
            {typeof highlightedLine === "number" && (
              <div className="flex items-center space-x-2 bg-amber-100 px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-amber-700">
                  Line {highlightedLine}
                </span>
              </div>
            )}
            
            {/* Settings button */}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 relative bg-gray-900 min-h-0 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="flex items-center space-x-3 text-gray-400">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
              <span className="text-sm">Loading editor...</span>
            </div>
          </div>
        )}
        
        <Editor
          height="100%"
          width="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            fontFamily: "Fira Code, Consolas, Monaco, monospace",
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: "on",
            lineHeight: 1.5,
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: "line",
            selectionHighlight: false,
            bracketPairColorization: {
              enabled: true,
            },
            guides: {
              indentation: true,
              bracketPairs: true,
            },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: true,
            scrollbar: {
              vertical: "auto",
              horizontal: "auto",
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>

      {/* Footer with stats */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span>Lines: {code?.split('\n').length || 0}</span>
            <span>Characters: {code?.length || 0}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="capitalize">{language}</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>UTF-8</span>
          </div>
        </div>
      </div>
    </div>
  );
}