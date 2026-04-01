import { useState } from "react";
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
  X,
  Info,
  Clock,
  HardDrive,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { complexityInfo } from "../utils/complexityInfo";
import { motion, AnimatePresence } from "framer-motion";

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
  searchTarget,
  setSearchTarget,
  sidebarOpen,
  setSidebarOpen,
}) {
  const isLinkedList = algorithm?.startsWith("singly");
  const isSearchAlgorithm = algorithm?.includes("search") && !isLinkedList;
  const isLLSearch = algorithm === "singly_search";
  const [infoOpen, setInfoOpen] = useState(true);

  const currentAlgoInfo = complexityInfo[algorithm];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
      fixed lg:relative inset-y-0 left-0 z-50 lg:z-0
      w-80 lg:w-80 xl:w-96
      bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
      text-white shadow-2xl
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
      >
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-slate-700/50 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Binary className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  Algorithm Visualizer
                </h2>
                <p className="text-xs lg:text-sm text-slate-400">
                  Interactive Code Learning
                </p>
              </div>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto h-[calc(100vh-140px)] lg:max-h-[calc(100vh-120px)]">
          {/* Language Selector */}
          <div className="space-y-2 lg:space-y-3">
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
                className="w-full p-2.5 lg:p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm lg:text-base appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-slate-800/70"
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
              <ChevronDown className="absolute right-2.5 lg:right-3 top-3 lg:top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Algorithm Selector */}
          <div className="space-y-2 lg:space-y-3">
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
                className="w-full p-2.5 lg:p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm lg:text-base appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:bg-slate-800/70"
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
                  label="🔍 Search Algorithms"
                  className="text-slate-300"
                >
                  <option value="linear_search">Linear Search</option>
                  <option value="binary_search">Binary Search</option>
                </optgroup>

                <optgroup
                  label="🔗 Linked List Operations"
                  className="text-slate-300"
                >
                  <option value="singly_insert_head">Singly — Insert at Head</option>
                  <option value="singly_insert_tail">Singly — Insert at Tail</option>
                  <option value="singly_insert_pos">Singly — Insert at Position</option>
                  <option value="singly_delete_head">Singly — Delete at Head</option>
                  <option value="singly_delete_tail">Singly — Delete at Tail</option>
                  <option value="singly_traversal">Singly — Traversal</option>
                  <option value="singly_search">Singly — Search / Find</option>
                </optgroup>
              </select>
              <ChevronDown className="absolute right-2.5 lg:right-3 top-3 lg:top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Input Array / Linked List Input */}
          {(!isLinkedList || isLinkedList) && (
            <div className="space-y-2 lg:space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                <label className="text-sm font-semibold text-slate-300">
                  {isLinkedList ? "List Values" : "Input Array"}
                </label>
              </div>
              <input
                type="text"
                value={inputArrayStr}
                onChange={(e) => setInputArrayStr(e.target.value)}
                placeholder={isLinkedList ? "e.g. 3, 5, 7, 9" : "e.g. 5, 3, 8, 4, 2"}
                className="w-full p-2.5 lg:p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white text-sm lg:text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-slate-800/70"
              />
              <p className="text-xs text-slate-500">
                {algorithm === "singly_insert_tail"
                  ? "Last value is inserted at tail; rest form the initial list"
                  : algorithm === "singly_insert_pos"
                  ? "Format: [list…, value, position] — last two values = insert value & position"
                  : isLinkedList
                  ? "Separate node values with commas"
                  : "Separate numbers with commas"}
              </p>
            </div>
          )}

          {/* Search Target Input - Only show for search algorithms */}
          {!isLinkedList && isSearchAlgorithm && (
            <div className="space-y-2 lg:space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-md">
                  <Binary className="w-4 h-4 text-pink-400" />
                </div>
                <label className="text-sm font-semibold text-slate-300">
                  Search Target
                </label>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium bg-pink-500/10 text-pink-300 rounded-full border border-pink-500/20">
                    Required
                  </span>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="relative">
                  <input
                    type="number"
                    value={searchTarget || ""}
                    onChange={(e) =>
                      setSearchTarget(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    placeholder="Enter target value..."
                    className="w-full p-2.5 lg:p-3 rounded-lg bg-slate-800/70 border border-slate-700/50 text-white text-sm lg:text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500/50 transition-all duration-200 hover:bg-slate-800/90 hover:border-slate-600/70 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-1 h-1 bg-pink-300 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-0.5 h-0.5 bg-pink-200 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                  Value to search for in the array
                </p>
                {searchTarget !== null && searchTarget !== "" && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-emerald-400 font-medium">
                      Target:
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20 font-mono">
                      {searchTarget}
                    </span>
                  </div>
                )}
              </div>

              {/* Quick target suggestions */}
              <div className="flex items-start gap-2 pt-1">
                <span className="text-xs text-slate-400 mt-1 flex-shrink-0">
                  Quick select:
                </span>
                <div className="flex gap-1 flex-wrap">
                  {inputArrayStr
                    .split(",")
                    .slice(0, 4)
                    .map((num, i) => {
                      const value = parseInt(num.trim());
                      if (isNaN(value)) return null;
                      return (
                        <button
                          key={i}
                          onClick={() => setSearchTarget(value)}
                          className={`px-2 py-0.5 text-xs rounded border transition-all duration-200 hover:scale-105 ${
                            searchTarget === value
                              ? "bg-pink-500/20 text-pink-300 border-pink-500/30"
                              : "bg-slate-700/50 text-slate-400 border-slate-600/50 hover:bg-slate-700/70 hover:text-slate-300"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })
                    .filter(Boolean)}
                </div>
              </div>
            </div>
          )}

          {/* LL Search Target — only for singly_search */}
          {isLLSearch && (
            <div className="space-y-2 lg:space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-cyan-500/20 to-sky-500/20 rounded-md">
                  <Binary className="w-4 h-4 text-cyan-400" />
                </div>
                <label className="text-sm font-semibold text-slate-300">
                  Search Value
                </label>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20">
                    Optional
                  </span>
                </div>
              </div>
              <input
                type="number"
                value={searchTarget || ""}
                onChange={(e) => setSearchTarget(e.target.value ? Number(e.target.value) : null)}
                placeholder="Value to find in list…"
                className="w-full p-2.5 lg:p-3 rounded-lg bg-slate-800/70 border border-slate-700/50 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <p className="text-xs text-slate-500">Leave empty to use first array value as target</p>
            </div>
          )}

          {/* Compare Mode Toggle */}
          <div className="space-y-2 lg:space-y-3">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-purple-400" />
              <label className="text-sm font-semibold text-slate-300">
                Compare Mode
              </label>
            </div>

            <div className="flex items-center justify-between p-2.5 lg:p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <div className="flex items-center gap-2">
                <span className="text-xs lg:text-sm text-slate-300">
                  {compareMode
                    ? "Compare two algorithms"
                    : "Single algorithm mode"}
                </span>
              </div>

              <button
                onClick={() => setCompareMode((prev) => !prev)}
                disabled={isLinkedList}
                className={`relative w-12 h-6 lg:w-14 lg:h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed ${
                  compareMode
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 focus:ring-emerald-500"
                    : "bg-slate-600 focus:ring-slate-400"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 lg:w-6 lg:h-6 bg-white rounded-full shadow-lg transition-transform duration-300 flex items-center justify-center ${
                    compareMode
                      ? "translate-x-6 lg:translate-x-7"
                      : "translate-x-0"
                  }`}
                >
                  {compareMode ? (
                    <GitCompare className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-emerald-600" />
                  ) : (
                    <Play className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-slate-600" />
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

          {/* Algorithm Comparison Selectors - Exclude search algorithms */}
          {compareMode && !isLinkedList && (
            <div className="space-y-3 lg:space-y-4 p-3 lg:p-4 bg-slate-800/20 rounded-lg border border-slate-700/30">
              <div className="flex items-center gap-2 mb-2 lg:mb-3">
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
                    className="w-full p-2 lg:p-2.5 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white text-xs lg:text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:bg-slate-700/70"
                  >
                    <option value="bubble">Bubble Sort</option>
                    <option value="selection">Selection Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="quick">Quick Sort</option>
                  </select>
                  <ChevronDown className="absolute right-2 lg:right-2.5 top-2.5 lg:top-3 w-3 h-3 text-slate-400 pointer-events-none" />
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
                    className="w-full p-2 lg:p-2.5 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white text-xs lg:text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:bg-slate-700/70"
                  >
                    <option value="bubble">Bubble Sort</option>
                    <option value="selection">Selection Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="quick">Quick Sort</option>
                  </select>
                  <ChevronDown className="absolute right-2 lg:right-2.5 top-2.5 lg:top-3 w-3 h-3 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Algorithm Info Panel — inside the scroll area so it's always reachable */}
          {(compareMode ? complexityInfo[algorithm1] : currentAlgoInfo) && (
            <div className="border-t border-slate-700/50 -mx-4 lg:-mx-6 pt-4">
              <button
                onClick={() => setInfoOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 lg:px-6 pb-3 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400" />
                  <span>Algorithm Details</span>
                </div>
                <motion.div
                  animate={{ rotate: infoOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {infoOpen && (
                  <motion.div
                    key={compareMode ? "info-compare" : "info-single"}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {compareMode ? (
                      /* ── Compare mode: two cards side-by-side ── */
                      <div className="px-4 lg:px-6 pb-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { key: algorithm1, isFirst: true,  label: "Algo 1" },
                            { key: algorithm2, isFirst: false, label: "Algo 2" },
                          ].map(({ key, isFirst, label }) => {
                            const info = complexityInfo[key];
                            if (!info) return null;
                            return (
                              <div
                                key={label}
                                className={`flex flex-col gap-2 p-3 rounded-xl border ${
                                  isFirst
                                    ? "bg-indigo-500/5 border-indigo-500/20"
                                    : "bg-pink-500/5 border-pink-500/20"
                                }`}
                              >
                                {/* Card header */}
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isFirst ? "bg-indigo-400" : "bg-pink-400"}`} />
                                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isFirst ? "text-indigo-400" : "text-pink-400"}`}>
                                    {label}
                                  </span>
                                </div>
                                <p className={`text-xs font-semibold leading-tight ${isFirst ? "text-indigo-200" : "text-pink-200"}`}>
                                  {info.name}
                                </p>

                                {/* Mini complexity rows */}
                                <div className="space-y-1 mt-1">
                                  {[
                                    { label: "Best",  val: info.best,    color: "text-green-400" },
                                    { label: "Avg",   val: info.average, color: "text-yellow-400" },
                                    { label: "Worst", val: info.worst,   color: "text-red-400" },
                                    { label: "Space", val: info.space,   color: "text-blue-400" },
                                  ].map(({ label: l, val, color }) => (
                                    <div key={l} className="flex items-center justify-between text-[10px]">
                                      <span className="text-slate-500 uppercase tracking-wider">{l}</span>
                                      <span className={`font-bold font-mono ${color}`}>{val}</span>
                                    </div>
                                  ))}
                                </div>

                                {/* Stability */}
                                <div className={`flex items-center gap-1 mt-1 text-[10px] font-medium ${
                                  info.stable ? "text-emerald-400" : "text-orange-400"
                                }`}>
                                  {info.stable
                                    ? <CheckCircle className="w-3 h-3 flex-shrink-0" />
                                    : <XCircle className="w-3 h-3 flex-shrink-0" />}
                                  <span>{info.stable ? "Stable" : "Unstable"}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* ── Single mode: full-width card ── */
                      <div className="px-4 lg:px-6 pb-4 space-y-3">
                        <p className="text-xs text-slate-400 leading-relaxed border-l-2 border-cyan-500/40 pl-3">
                          {currentAlgoInfo.desc}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <span className="text-[10px] font-medium text-green-400 uppercase tracking-wider">Best</span>
                            <span className="text-sm font-bold font-mono text-green-300">{currentAlgoInfo.best}</span>
                          </div>
                          <div className="flex flex-col gap-1 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <span className="text-[10px] font-medium text-yellow-400 uppercase tracking-wider">Average</span>
                            <span className="text-sm font-bold font-mono text-yellow-300">{currentAlgoInfo.average}</span>
                          </div>
                          <div className="flex flex-col gap-1 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Worst</span>
                            <span className="text-sm font-bold font-mono text-red-300">{currentAlgoInfo.worst}</span>
                          </div>
                          <div className="flex flex-col gap-1 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <span className="text-[10px] font-medium text-blue-400 uppercase tracking-wider">Space</span>
                            <span className="text-sm font-bold font-mono text-blue-300">{currentAlgoInfo.space}</span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                          currentAlgoInfo.stable
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                            : "bg-orange-500/10 border border-orange-500/20 text-orange-300"
                        }`}>
                          {currentAlgoInfo.stable
                            ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            : <XCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                          <span>{currentAlgoInfo.stable ? "Stable Sort" : "Unstable Sort"}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-3 lg:p-4 border-t border-slate-700/50 bg-slate-900/50">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Ready to visualize
          </div>
        </div>
      </div>
    </>
  );
}
