import {
  Code,
  Settings,
  GitCompare,
  Play,
  Database,
  ChevronDown,
  Zap,
  Layers,
  Binary,
} from "lucide-react";

export default function Sidebar({
  language,
  setLanguage,
  algorithm,
  setAlgorithm,
  inputArrayStr,
  setInputArrayStr,
  compareMode,
  setCompareMode,
  algorithm1,
  setAlgorithm1,
  algorithm2,
  setAlgorithm2,
}) {
  const isLinkedList = algorithm?.startsWith("singly");

  return (
    <div className="w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Binary className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Algorithm Visualizer
            </h2>
            <p className="text-sm text-slate-400">Interactive Code Learning</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
        {/* Language Selector */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-indigo-400" />
            <label className="text-sm font-semibold text-slate-300">
              Programming Language
            </label>
          </div>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-slate-800/70"
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Algorithm Selector */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-400" />
            <label className="text-sm font-semibold text-slate-300">
              Algorithm
            </label>
          </div>
          <div className="relative">
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:bg-slate-800/70"
            >
              <optgroup
                label="🔄 Sorting Algorithms"
                className="text-slate-300"
              >
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="quick">Quick Sort</option>
              </optgroup>
              <optgroup
                label="🔗 Linked List Operations"
                className="text-slate-300"
              >
                <option value="singly_insert_head">
                  Singly - Insert at Head
                </option>
              </optgroup>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Input Array (only for sorting) */}
        {!isLinkedList && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <label className="text-sm font-semibold text-slate-300">
                Input Array
              </label>
            </div>
            <input
              type="text"
              value={inputArrayStr}
              onChange={(e) => setInputArrayStr(e.target.value)}
              placeholder="e.g. 5, 3, 8, 4, 2"
              className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-slate-800/70"
            />
            <p className="text-xs text-slate-500">
              Separate numbers with commas
            </p>
          </div>
        )}

        {/* Compare Mode Toggle */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-purple-400" />
            <label className="text-sm font-semibold text-slate-300">
              Compare Mode
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-300">
                {compareMode
                  ? "Compare two algorithms"
                  : "Single algorithm mode"}
              </span>
            </div>

            <button
              onClick={() => setCompareMode((prev) => !prev)}
              disabled={isLinkedList}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed ${
                compareMode
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 focus:ring-emerald-500"
                  : "bg-slate-600 focus:ring-slate-400"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 flex items-center justify-center ${
                  compareMode ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {compareMode ? (
                  <GitCompare className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Play className="w-3 h-3 text-slate-600" />
                )}
              </span>
            </button>
          </div>

          {isLinkedList && (
            <p className="text-xs text-amber-400 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Compare mode not available for linked lists
            </p>
          )}
        </div>

        {/* Algorithm Comparison Selectors */}
        {compareMode && !isLinkedList && (
          <div className="space-y-4 p-4 bg-slate-800/20 rounded-lg border border-slate-700/30">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-slate-300">
                Algorithm Comparison
              </span>
            </div>

            {/* Algorithm 1 */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Algorithm 1
              </label>
              <div className="relative">
                <select
                  value={algorithm1}
                  onChange={(e) => setAlgorithm1(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:bg-slate-700/70"
                >
                  <option value="bubble">Bubble Sort</option>
                  <option value="selection">Selection Sort</option>
                  <option value="merge">Merge Sort</option>
                  <option value="insertion">Insertion Sort</option>
                  <option value="quick">Quick Sort</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-3 w-3 h-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Algorithm 2 */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Algorithm 2
              </label>
              <div className="relative">
                <select
                  value={algorithm2}
                  onChange={(e) => setAlgorithm2(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:bg-slate-700/70"
                >
                  <option value="bubble">Bubble Sort</option>
                  <option value="selection">Selection Sort</option>
                  <option value="merge">Merge Sort</option>
                  <option value="insertion">Insertion Sort</option>
                  <option value="quick">Quick Sort</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-3 w-3 h-3 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Ready to visualize
        </div>
      </div>
    </div>
  );
}
