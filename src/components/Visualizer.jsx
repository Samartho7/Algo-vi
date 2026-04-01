import { motion, AnimatePresence } from "framer-motion";
import { complexityInfo } from "../utils/complexityInfo";

export default function Visualizer({ step, algorithm }) {
  // 🔁 Linked List Visual (e.g., Singly Insert at Head)
  if (algorithm === "singly_insert_head") {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-3 md:p-5 flex flex-col min-h-0">
          <div className="flex-1 px-4 py-6 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center min-h-0 overflow-auto">
            <AnimatePresence>
              {/* Linked List Nodes Container */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-4 pt-8 pb-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {step?.nodes?.map((node, idx) => {
                  const isLastNode = idx === step.nodes.length - 1;
                  const nextNode = step.nodes[idx + 1];

                  return (
                    <motion.div
                      key={node.id}
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                      }}
                      className="flex items-center gap-4"
                    >
                      {/* Node Container */}
                      <div className="relative">
                        {/* Head/Tail Indicators - Positioned above the node */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {node.isHead && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-lg border border-yellow-300"
                            >
                              HEAD
                            </motion.div>
                          )}
                          {node.isTail && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-full shadow-lg border border-green-300"
                            >
                              TAIL
                            </motion.div>
                          )}
                        </div>

                        {/* Node Block */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex border-2 border-slate-300 rounded-lg overflow-hidden shadow-lg min-w-[140px] bg-white transition-all duration-300"
                        >
                          {/* Data Section */}
                          <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white p-3 text-center w-1/2 relative">
                            <div className="text-lg font-bold mb-1">
                              {node.value}
                            </div>
                            <div className="text-xs font-mono opacity-90">
                              Data
                            </div>
                          </div>

                          {/* Address Section */}
                          <div className="bg-gradient-to-b from-slate-100 to-slate-200 text-slate-700 p-3 text-center w-1/2 border-l-2 border-slate-300">
                            <div className="text-xs font-mono font-bold mb-1">
                              {node.next ?? "NULL"}
                            </div>
                            <div className="text-xs font-mono opacity-75">
                              Next
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Arrow - Only show if not the last node */}
                      {!isLastNode && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: [0.8, 1.2, 1] }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="flex items-center justify-center"
                        >
                          <svg
                            className="w-8 h-8 text-slate-400 drop-shadow-sm"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <polyline points="16,6 22,12 16,18" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Empty state */}
            {(!step?.nodes || step.nodes.length === 0) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-slate-500 h-full flex flex-col items-center justify-center"
              >
                <div className="text-4xl mb-4">🔗</div>
                <div className="text-lg font-medium">Empty Linked List</div>
                <div className="text-sm">
                  Nodes will appear here as you add them
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex-shrink-0 px-3 py-2 md:px-4 md:py-2.5 bg-white border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
              <span>Data</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-slate-100 to-slate-200 rounded border border-slate-300"></div>
              <span>Next</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"></div>
              <span>Head</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded"></div>
              <span>Tail</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🔁 Linked List Traversal Visualization
  if (algorithm === "singly_traversal") {
    const nodes = step?.nodes || [];
    const isDone = step?.action === "done";
    const isMove = step?.action === "move";

    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-teal-50 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-3 md:p-5 flex flex-col min-h-0">
          <div className="flex-1 px-4 py-6 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center min-h-0 overflow-auto">
            <AnimatePresence>
              {/* Node row */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-4 pt-10 pb-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {nodes.map((node, idx) => {
                  const isLastNode = idx === nodes.length - 1;
                  const isCurrent = node.isCurrent;
                  const isVisited = node.isVisited;
                  const isMoving = node.isMoving;

                  return (
                    <motion.div
                      key={node.id}
                      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                      className="flex items-center gap-3"
                    >
                      {/* Node container */}
                      <div className="relative">
                        {/* Labels above node */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 z-10">
                          {node.isHead && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow border border-yellow-300"
                            >
                              HEAD
                            </motion.div>
                          )}
                          {isCurrent && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full shadow-lg border border-cyan-300"
                            >
                              {isMoving ? "→" : "CURR"}
                            </motion.div>
                          )}
                        </div>

                        {/* Node block */}
                        <motion.div
                          animate={{
                            scale: isCurrent ? 1.1 : isDone ? 1 : 1,
                            boxShadow: isCurrent
                              ? "0 0 0 3px rgba(20, 184, 166, 0.5), 0 4px 20px rgba(20,184,166,0.3)"
                              : isVisited
                              ? "0 2px 6px rgba(0,0,0,0.08)"
                              : "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
                          className={`flex border-2 rounded-lg overflow-hidden min-w-[120px] transition-all duration-300 ${
                            isCurrent
                              ? "border-teal-400 bg-white"
                              : isVisited
                              ? "border-slate-200 opacity-60"
                              : isDone
                              ? "border-green-300"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {/* Data Section */}
                          <div
                            className={`p-3 text-center w-1/2 relative ${
                              isCurrent
                                ? "bg-gradient-to-b from-teal-500 to-cyan-600 text-white"
                                : isVisited
                                ? "bg-gradient-to-b from-slate-400 to-slate-500 text-white"
                                : isDone
                                ? "bg-gradient-to-b from-green-500 to-emerald-600 text-white"
                                : "bg-gradient-to-b from-blue-500 to-blue-600 text-white"
                            }`}
                          >
                            <div className="text-lg font-bold mb-0.5">{node.value}</div>
                            <div className="text-[10px] font-mono opacity-90">Data</div>
                            {/* Visited checkmark */}
                            {isVisited && !isCurrent && (
                              <div className="absolute top-1 right-1 text-xs">✓</div>
                            )}
                          </div>

                          {/* Next Section */}
                          <div className="bg-gradient-to-b from-slate-100 to-slate-200 text-slate-700 p-3 text-center w-1/2 border-l-2 border-slate-300">
                            <div className={`text-[10px] font-mono font-bold mb-1 ${
                              isMoving ? "text-teal-600 animate-pulse" : ""
                            }`}>
                              {node.next ?? "NULL"}
                            </div>
                            <div className="text-[10px] font-mono opacity-75">Next</div>
                          </div>
                        </motion.div>

                        {/* TAIL label */}
                        {node.isTail && (
                          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-full shadow border border-green-300"
                            >
                              TAIL
                            </motion.div>
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      {!isLastNode && (
                        <motion.div
                          animate={{
                            color: node.isMoving ? "#14b8a6" : "#94a3b8",
                            scale: node.isMoving ? [1, 1.3, 1] : 1,
                          }}
                          transition={{ duration: 0.4 }}
                          className="flex items-center"
                        >
                          <svg className="w-8 h-8 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <polyline points="16,6 22,12 16,18" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}

                {/* NULL terminus */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: isDone ? 1 : 0.4,
                    x: 0,
                    scale: isDone ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <svg className="w-8 h-8 text-slate-300 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <polyline points="16,6 22,12 16,18" />
                  </svg>
                  <div className={`px-4 py-2 rounded-lg border-2 font-mono font-bold text-sm transition-all duration-300 ${
                    isDone
                      ? "border-green-400 bg-green-50 text-green-700 shadow-md"
                      : "border-slate-300 bg-slate-50 text-slate-400"
                  }`}>
                    NULL
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Empty state */}
            {nodes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-slate-500 flex flex-col items-center justify-center"
              >
                <div className="text-4xl mb-4">🔗</div>
                <div className="text-lg font-medium">Empty Linked List</div>
                <div className="text-sm">Add values to traverse</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex-shrink-0 px-3 py-2 md:px-4 bg-white border-t border-slate-200">
          {/* Progress + message */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${
                step?.action === "visit" ? "bg-teal-500 animate-pulse" :
                step?.action === "move" ? "bg-cyan-500 animate-bounce" :
                step?.action === "done" ? "bg-green-500" :
                "bg-slate-400"
              }`} />
              <span className="text-xs font-semibold text-slate-600">
                {step?.action === "done" ? "Done" :
                 step?.action === "move" ? "Moving" :
                 step?.action === "visit" ? "Visiting" : "Ready"}
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Visited: {step?.visitedCount ?? 0} / {nodes.length}
            </span>
          </div>
          {step?.message && (
            <motion.div
              key={step.message}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs px-3 py-1.5 rounded-lg border-l-4 ${
                step.action === "done"
                  ? "bg-green-50 border-green-400 text-green-800"
                  : step.action === "visit"
                  ? "bg-teal-50 border-teal-400 text-teal-800"
                  : step.action === "move"
                  ? "bg-cyan-50 border-cyan-400 text-cyan-800"
                  : "bg-slate-50 border-slate-400 text-slate-700"
              }`}
            >
              {step.message}
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <div className="flex-shrink-0 px-3 py-2 md:px-4 bg-white border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 rounded" />
              <span>Current (CURR)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-slate-400 to-slate-500 rounded opacity-60" />
              <span>Visited ✓</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded" />
              <span>Unvisited</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded" />
              <span>Done</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🔗 Shared visualizer for new LL operations
  const newLLOps = [
    "singly_insert_tail",
    "singly_insert_pos",
    "singly_delete_head",
    "singly_delete_tail",
    "singly_search",
  ];
  if (newLLOps.includes(algorithm)) {
    const nodes = step?.nodes || [];
    const action = step?.action;
    const isDone = action === "done";
    const isInsert = action === "insert";
    const isDelete = action === "delete";
    const isFound = action === "found";
    const isNotFound = action === "not_found";

    // Gradient background per operation type
    const bgMap = {
      singly_insert_tail: "from-slate-50 to-emerald-50",
      singly_insert_pos:  "from-slate-50 to-violet-50",
      singly_delete_head: "from-slate-50 to-rose-50",
      singly_delete_tail: "from-slate-50 to-orange-50",
      singly_search:      "from-slate-50 to-cyan-50",
    };

    const accentMap = {
      singly_insert_tail: { curr: "from-emerald-500 to-teal-600",   label: "emerald", border: "border-emerald-400", shadow: "rgba(16,185,129,0.4)" },
      singly_insert_pos:  { curr: "from-violet-500 to-purple-600",  label: "violet",  border: "border-violet-400", shadow: "rgba(139,92,246,0.4)" },
      singly_delete_head: { curr: "from-rose-500 to-red-600",       label: "rose",    border: "border-rose-400",   shadow: "rgba(244,63,94,0.4)"  },
      singly_delete_tail: { curr: "from-orange-500 to-amber-600",   label: "orange",  border: "border-orange-400", shadow: "rgba(249,115,22,0.4)"  },
      singly_search:      { curr: "from-cyan-500 to-sky-600",       label: "cyan",    border: "border-cyan-400",   shadow: "rgba(6,182,212,0.4)"   },
    };
    const accent = accentMap[algorithm];

    const actionMeta = {
      start:      { icon: "🔗", label: "Init",     color: "bg-slate-400" },
      traverse:   { icon: "🔍", label: "Traverse", color: "bg-yellow-400" },
      found_tail: { icon: "📌", label: "Tail",     color: "bg-teal-400" },
      found_pos:  { icon: "📍", label: "Position", color: "bg-violet-400" },
      insert:     { icon: "✅", label: "Insert",   color: "bg-emerald-500" },
      delete:     { icon: "🗑️", label: "Delete",   color: "bg-red-500" },
      compare:    { icon: "👁️", label: "Compare",  color: "bg-yellow-400" },
      found:      { icon: "🎉", label: "Found",    color: "bg-green-500" },
      not_found:  { icon: "❌", label: "Not Found",color: "bg-red-400" },
      move:       { icon: "➡️", label: "Move",     color: "bg-cyan-400" },
      done:       { icon: "✅", label: "Done",     color: "bg-green-500" },
    };
    const meta = actionMeta[action] || { icon: "ℹ️", label: action, color: "bg-slate-400" };

    return (
      <div className={`flex flex-col h-full bg-gradient-to-br ${bgMap[algorithm]} overflow-hidden`}>
        <div className="flex-1 p-3 md:p-5 flex flex-col min-h-0">
          <div className="flex-1 px-4 py-8 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center min-h-0 overflow-auto">
            {/* Stable container — never unmounts, nodes animate in/out individually */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-10 pb-6">

              <AnimatePresence>
                {nodes.map((node, idx) => {
                  const isLastNode = idx === nodes.length - 1;
                  const isCurrent = node.isCurrent;
                  const isNewNode = node.isNew;
                  const isDeleted = node.isDeleted;

                  const isTarget = node.isTarget;
                  const isVisited = node.isVisited;

                  // Compute node data-section style
                  let dataBg = "bg-gradient-to-b from-blue-500 to-blue-600";
                  let nodeBoxBorder = "border-slate-300";
                  let boxShadow = "0 4px 12px rgba(0,0,0,0.1)";

                  if (isDeleted) {
                    dataBg = "bg-gradient-to-b from-red-400 to-red-500 opacity-70";
                    nodeBoxBorder = "border-red-400";
                    boxShadow = "0 0 0 3px rgba(239,68,68,0.4)";
                  } else if (isNewNode) {
                    dataBg = "bg-gradient-to-b from-emerald-400 to-green-500";
                    nodeBoxBorder = "border-emerald-400";
                    boxShadow = "0 0 0 3px rgba(16,185,129,0.5), 0 4px 20px rgba(16,185,129,0.3)";
                  } else if (isTarget) {
                    dataBg = "bg-gradient-to-b from-green-500 to-emerald-600";
                    nodeBoxBorder = "border-green-400";
                    boxShadow = "0 0 0 3px rgba(34,197,94,0.5), 0 4px 20px rgba(34,197,94,0.3)";
                  } else if (isCurrent) {
                    dataBg = `bg-gradient-to-b ${accent.curr}`;
                    nodeBoxBorder = accent.border;
                    boxShadow = `0 0 0 3px ${accent.shadow}, 0 4px 20px ${accent.shadow}`;
                  } else if (isVisited) {
                    dataBg = "bg-gradient-to-b from-slate-400 to-slate-500";
                    nodeBoxBorder = "border-slate-300";
                    boxShadow = "none";
                  } else if (isDone) {
                    dataBg = "bg-gradient-to-b from-green-500 to-emerald-600";
                    nodeBoxBorder = "border-green-300";
                  }

                  return (
                    <motion.div
                      key={node.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: isDeleted ? 0.55 : 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                      className="flex items-center gap-3"
                    >
                      <div className="relative">
                        {/* Top labels */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 z-10 whitespace-nowrap">
                          {node.isHead && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow border border-yellow-300"
                            >
                              HEAD
                            </motion.div>
                          )}
                          {isNewNode && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-full shadow border border-emerald-300"
                            >
                              NEW
                            </motion.div>
                          )}
                          {isDeleted && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full shadow border border-red-300"
                            >
                              DEL
                            </motion.div>
                          )}
                          {isTarget && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full shadow border border-green-300"
                            >
                              FOUND
                            </motion.div>
                          )}
                          {isCurrent && !isNewNode && !isDeleted && !isTarget && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`px-2 py-0.5 text-[10px] font-bold text-white rounded-full shadow border border-${accent.label}-300 bg-gradient-to-r ${accent.curr}`}
                            >
                              CURR
                            </motion.div>
                          )}
                        </div>

                        {/* Node block */}
                        <motion.div
                          animate={{ boxShadow, scale: isDeleted ? 0.92 : isCurrent || isNewNode || isTarget ? 1.08 : 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
                          className={`flex border-2 ${nodeBoxBorder} rounded-lg overflow-hidden min-w-[120px] bg-white transition-all duration-300 ${isDeleted ? "opacity-60" : ""}`}
                        >
                          {/* Data section */}
                          <div className={`${dataBg} text-white p-3 text-center w-1/2 relative`}>
                            <div className="text-base font-bold mb-0.5">{node.value}</div>
                            <div className="text-[10px] font-mono opacity-90">Data</div>
                            {isVisited && !isCurrent && (
                              <div className="absolute top-1 right-1 text-[10px]">✓</div>
                            )}
                            {isDeleted && (
                              <div className="absolute top-1 right-1 text-[10px]">✕</div>
                            )}
                          </div>
                          {/* Next section */}
                          <div className="bg-gradient-to-b from-slate-100 to-slate-200 text-slate-700 p-3 text-center w-1/2 border-l-2 border-slate-300">
                            <div className="text-[10px] font-mono font-bold mb-1 truncate">{node.next ?? "NULL"}</div>
                            <div className="text-[10px] font-mono opacity-75">Next</div>
                          </div>
                        </motion.div>

                        {/* TAIL label below */}
                        {node.isTail && !isDeleted && (
                          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-full shadow border border-green-300"
                            >
                              TAIL
                            </motion.div>
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      {!isLastNode && (
                        <motion.div
                          animate={{ color: isCurrent ? "#f59e0b" : "#94a3b8" }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg className="w-7 h-7 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <polyline points="16,6 22,12 16,18" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* NULL terminus — stable, never remounts */}
              {nodes.length > 0 && (
                <motion.div
                  animate={{ opacity: isDone ? 1 : 0.4, scale: isDone ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-7 h-7 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <polyline points="16,6 22,12 16,18" />
                  </svg>
                  <motion.div
                    animate={{
                      borderColor: isDone ? "#4ade80" : "#cbd5e1",
                      color: isDone ? "#15803d" : "#94a3b8",
                    }}
                    transition={{ duration: 0.3 }}
                    className="px-3 py-1.5 rounded-lg border-2 font-mono font-bold text-sm bg-slate-50"
                  >NULL</motion.div>
                </motion.div>
              )}

              {/* Empty state */}
              {nodes.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-slate-400"
                >
                  <div className="text-5xl mb-3">🔗</div>
                  <div className="text-base font-medium">Empty Linked List</div>
                  <div className="text-sm mt-1 text-slate-400">
                    {isDone ? "Operation completed — list is empty." : "Press Play to start"}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex-shrink-0 px-3 py-2 md:px-4 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${meta.color} ${action === "traverse" || action === "compare" ? "animate-pulse" : ""}`} />
            <span className="text-xs font-semibold text-slate-600">{meta.label}</span>
            <span className="ml-auto text-xs text-slate-400">Step {step ? "active" : "—"}</span>
          </div>
          {step?.message && (
            <motion.div
              key={step.message}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs px-3 py-1.5 rounded-lg border-l-4 ${
                isFound || isDone
                  ? "bg-green-50 border-green-400 text-green-800"
                  : isDelete || isNotFound
                  ? "bg-red-50 border-red-400 text-red-800"
                  : isInsert
                  ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                  : action === "traverse" || action === "compare"
                  ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                  : "bg-slate-50 border-slate-400 text-slate-700"
              }`}
            >
              {meta.icon} {step.message}
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <div className="flex-shrink-0 px-3 py-1.5 bg-white border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-slate-500">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded" /><span>Default</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-400 rounded" /><span>Current</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-400 rounded" /><span>New / Found</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-400 rounded" /><span>Deleted</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-400 rounded opacity-60" /><span>Visited</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded" /><span>Done</span></div>
          </div>
        </div>
      </div>
    );
  }

  // 🧠 Enhanced Search Visualization (Linear / Binary)
  if (algorithm?.includes("search")) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-indigo-50 overflow-hidden">


        {/* Main Container */}
        <div className="flex-1 p-3 md:p-5 flex flex-col min-h-0">
          <div className="flex-1 px-4 py-4 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col min-h-0">
            {/* Bars Container */}
            <div className="flex-1 flex gap-2 md:gap-3 justify-center items-center min-h-0">
              <AnimatePresence>
                {step?.array?.map(({ id, value }, i) => {
                  const isCompared =
                    step.indices?.includes(i) && step.action === "compare";
                  const isFound =
                    step.indices?.includes(i) && step.action === "found";
                  const isShiftLeft =
                    step.indices?.includes(i) && step.action === "shiftLeft";
                  const isShiftRight =
                    step.indices?.includes(i) && step.action === "shiftRight";
                  const isActive = step.indices?.includes(i);
                  const isNotFound = step.action === "notFound";

                  // Enhanced color scheme with gradients
                  let bgColor = "bg-gradient-to-t from-slate-700 to-slate-800";
                  let textColor = "text-white";
                  let borderColor = "border-slate-600";
                  let shadowColor = "shadow-slate-400/30";

                  if (isFound) {
                    bgColor = "bg-gradient-to-t from-green-600 to-green-500";
                    shadowColor = "shadow-green-400/50";
                    borderColor = "border-green-500";
                  } else if (isCompared) {
                    bgColor = "bg-gradient-to-t from-yellow-500 to-yellow-400";
                    textColor = "text-yellow-900";
                    shadowColor = "shadow-yellow-400/50";
                    borderColor = "border-yellow-400";
                  } else if (isShiftLeft) {
                    bgColor = "bg-gradient-to-t from-blue-500 to-blue-400";
                    textColor = "text-white";
                    shadowColor = "shadow-blue-400/50";
                    borderColor = "border-blue-400";
                  } else if (isShiftRight) {
                    bgColor = "bg-gradient-to-t from-purple-500 to-purple-400";
                    textColor = "text-white";
                    shadowColor = "shadow-purple-400/50";
                    borderColor = "border-purple-400";
                  } else if (isNotFound) {
                    // Dim all bars when not found
                    bgColor = "bg-gradient-to-t from-red-300 to-red-200";
                    textColor = "text-red-700";
                    shadowColor = "shadow-red-200/30";
                    borderColor = "border-red-300";
                  } else if (
                    step.action === "done" &&
                    step.message?.includes("not found")
                  ) {
                    // Final state for not found
                    bgColor = "bg-gradient-to-t from-slate-500 to-slate-400";
                    textColor = "text-slate-200";
                    shadowColor = "shadow-slate-400/30";
                    borderColor = "border-slate-500";
                  }

                  // Dynamic bar sizing
                  const maxHeight = 200;
                  const minHeight = 40;
                  const height = Math.min(
                    Math.max(value * 5 + minHeight, minHeight),
                    maxHeight
                  );

                  return (
                    <motion.div
                      key={id}
                      layout
                      initial={{ scale: 0.8, y: 20, opacity: 0 }}
                      animate={{
                        scale: isActive ? 1.08 : isNotFound ? 0.95 : 1,
                        y: 0,
                        opacity: isNotFound ? 0.6 : 1,
                        rotateX: isFound ? 5 : 0,
                      }}
                      exit={{ scale: 0.8, opacity: 0, y: 20 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        duration: 0.4,
                      }}
                      className={`w-8 md:w-12 flex items-center justify-center rounded-lg font-bold border-2 transition-all duration-300 ${bgColor} ${textColor} ${borderColor} shadow-lg ${shadowColor}`}
                      style={{ height: `${height}px` }}
                    >
                      <span className="text-xs md:text-sm font-bold drop-shadow-sm select-none">
                        {value}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Enhanced Status Display */}
            <div className="flex-shrink-0 space-y-2 md:space-y-3">
              {/* Current Step Info */}
              <div className="p-2 md:p-3 bg-slate-50 rounded-lg border border-slate-200">
                {step && (
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs md:text-sm gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          step.action === "found"
                            ? "bg-green-500"
                            : step.action === "compare"
                            ? "bg-yellow-500"
                            : step.action === "shiftLeft"
                            ? "bg-blue-500"
                            : step.action === "shiftRight"
                            ? "bg-purple-500"
                            : step.action === "notFound"
                            ? "bg-red-500"
                            : "bg-slate-500"
                        }`}
                      ></div>
                      <span>
                        <strong>Action:</strong>{" "}
                        {step.action === "notFound"
                          ? "Not Found"
                          : step.action === "shiftLeft"
                          ? "Search Left"
                          : step.action === "shiftRight"
                          ? "Search Right"
                          : step.action.charAt(0).toUpperCase() +
                            step.action.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <span>
                        <strong>Indices:</strong>{" "}
                        {step.indices?.length > 0
                          ? step.indices.join(", ")
                          : "None"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Display with Enhanced Styling */}
              {step?.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    step.action === "found"
                      ? "bg-green-50 border-green-400 text-green-800"
                      : step.action === "notFound"
                      ? "bg-red-50 border-red-400 text-red-800"
                      : step.action === "compare"
                      ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                      : step.action === "shiftLeft" ||
                        step.action === "shiftRight"
                      ? "bg-blue-50 border-blue-400 text-blue-800"
                      : "bg-slate-50 border-slate-400 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {step.action === "found"
                        ? "🎉"
                        : step.action === "notFound"
                        ? "❌"
                        : step.action === "compare"
                        ? "🔍"
                        : step.action === "shiftLeft"
                        ? "⬅️"
                        : step.action === "shiftRight"
                        ? "➡️"
                        : "ℹ️"}
                    </span>
                    <span className="text-sm font-medium">{step.message}</span>
                  </div>
                </motion.div>
              )}

              {/* Binary Search Range Indicator */}
              {algorithm === "binary_search" &&
                step?.low !== undefined &&
                step?.high !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-indigo-50 rounded-lg border border-indigo-200"
                  >
                    <div className="flex items-center justify-between text-sm text-indigo-800">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span>
                          <strong>Search Range:</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>
                          Low: <strong>{step.low}</strong>
                        </span>
                        {step.mid !== undefined && (
                          <span>
                            Mid: <strong>{step.mid}</strong>
                          </span>
                        )}
                        <span>
                          High: <strong>{step.high}</strong>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-shrink-0 px-3 py-2 md:px-4 md:py-2.5 bg-white border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-slate-700 to-slate-800 rounded"></div>
              <span>Unvisited</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded"></div>
              <span>Left</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-purple-400 rounded"></div>
              <span>Right</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-600 to-green-500 rounded"></div>
              <span>Found</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-red-300 to-red-200 rounded border border-red-300"></div>
              <span>Not Found</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🧠 Array-based Sorting Visualization (Default)

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-indigo-50 overflow-hidden">
      {/* Main Sorting Container */}
      <div className="flex-1 p-3 md:p-5 flex flex-col min-h-0">
        <div className="flex-1 px-4 py-4 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col min-h-0">
          {/* Bars Container — vertically centres bars */}
          <div className="flex-1 flex gap-2 md:gap-3 justify-center items-center min-h-0">
            <AnimatePresence>
              {step?.array?.map(({ id, value }, i) => {
                const isActive = step.indices?.includes(i);
                const isSwap = step.action === "swap" && isActive;

                let bgColor = "bg-gradient-to-t from-slate-700 to-slate-800";
                let textColor = "text-white";
                let borderColor = "border-slate-600";
                let shadowColor = "shadow-slate-400/30";

                // Enhanced colors per action with gradients
                if (step.action === "done") {
                  bgColor = "bg-gradient-to-t from-green-600 to-green-500";
                  shadowColor = "shadow-green-400/40";
                  borderColor = "border-green-500";
                } else if (step.action === "insert" && isActive) {
                  bgColor = "bg-gradient-to-t from-emerald-400 to-emerald-300";
                  textColor = "text-emerald-900";
                  shadowColor = "shadow-emerald-400/40";
                  borderColor = "border-emerald-400";
                } else if (step.action === "merge" && isActive) {
                  bgColor = "bg-gradient-to-t from-purple-600 to-purple-500";
                  textColor = "text-white";
                  shadowColor = "shadow-purple-400/40";
                  borderColor = "border-purple-500";
                } else if (step.action === "pivot" && isActive) {
                  bgColor = "bg-gradient-to-t from-blue-600 to-blue-500";
                  shadowColor = "shadow-blue-400/40";
                  borderColor = "border-blue-500";
                } else if (step.action === "partition" && isActive) {
                  bgColor = "bg-gradient-to-t from-pink-500 to-pink-400";
                  textColor = "text-pink-900";
                  shadowColor = "shadow-pink-400/40";
                  borderColor = "border-pink-400";
                } else if (isActive) {
                  switch (algorithm) {
                    case "bubble":
                      bgColor = isSwap
                        ? "bg-gradient-to-t from-red-600 to-red-500"
                        : "bg-gradient-to-t from-yellow-500 to-yellow-400";
                      textColor = isSwap ? "text-white" : "text-yellow-900";
                      shadowColor = isSwap
                        ? "shadow-red-400/40"
                        : "shadow-yellow-400/40";
                      borderColor = isSwap
                        ? "border-red-500"
                        : "border-yellow-400";
                      break;
                    case "selection":
                      bgColor = isSwap
                        ? "bg-gradient-to-t from-red-600 to-red-500"
                        : "bg-gradient-to-t from-yellow-500 to-yellow-400";
                      textColor = isSwap ? "text-white" : "text-yellow-900";
                      shadowColor = isSwap
                        ? "shadow-red-400/40"
                        : "shadow-yellow-400/40";
                      borderColor = isSwap
                        ? "border-red-500"
                        : "border-yellow-400";
                      break;
                    case "merge":
                      bgColor = "bg-gradient-to-t from-green-400 to-green-300";
                      textColor = "text-green-900";
                      shadowColor = "shadow-green-400/40";
                      borderColor = "border-green-400";
                      break;
                    case "quick":
                      bgColor =
                        "bg-gradient-to-t from-yellow-500 to-yellow-400";
                      textColor = "text-yellow-900";
                      shadowColor = "shadow-yellow-400/40";
                      borderColor = "border-yellow-400";
                      break;
                    default:
                      bgColor =
                        "bg-gradient-to-t from-yellow-500 to-yellow-400";
                      textColor = "text-yellow-900";
                      shadowColor = "shadow-yellow-400/40";
                      borderColor = "border-yellow-400";
                  }
                }

                // Dynamic bar sizing based on container
                const maxHeight = 200;
                const minHeight = 40;
                const height = Math.min(
                  Math.max(value * 5 + minHeight, minHeight),
                  maxHeight
                );

                return (
                  <motion.div
                    key={id} // Ensures unique identity across steps
                    layout
                    initial={{ scale: 0.8, y: 20, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      y: 0,
                      opacity: 1,
                      rotateX: isSwap ? 10 : 0,
                    }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      duration: 0.3,
                    }}
                    className={`w-9 sm:w-10 md:w-12 flex items-center justify-center rounded-md font-bold border-2 transition-all duration-300 ${bgColor} ${textColor} ${borderColor} shadow-md ${shadowColor}`}
                    style={{ height: `${height}px` }}
                  >
                    <span className="text-[11px] sm:text-xs md:text-sm font-bold drop-shadow-sm select-none">
                      {value}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Step Description Banner */}
          <div className="flex-shrink-0 mt-2">
            {step ? (
              <motion.div
                key={`${step.action}-${step.indices?.join("-")}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`px-3 py-2 rounded-lg border-l-4 flex items-start gap-2 text-xs md:text-sm ${
                  step.action === "done"
                    ? "bg-green-50 border-green-400 text-green-800"
                    : step.action === "swap"
                    ? "bg-red-50 border-red-400 text-red-800"
                    : step.action === "compare"
                    ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                    : step.action === "merge"
                    ? "bg-purple-50 border-purple-400 text-purple-800"
                    : step.action === "pivot" || step.action === "partition"
                    ? "bg-blue-50 border-blue-400 text-blue-800"
                    : step.action === "insert" || step.action === "shift"
                    ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                    : step.action === "min"
                    ? "bg-orange-50 border-orange-400 text-orange-800"
                    : "bg-slate-50 border-slate-400 text-slate-700"
                }`}
              >
                <span className="text-base flex-shrink-0">
                  {step.action === "done" ? "✅"
                    : step.action === "swap" ? "🔄"
                    : step.action === "compare" ? "👁️"
                    : step.action === "merge" ? "🔀"
                    : step.action === "pivot" ? "📍"
                    : step.action === "partition" ? "✂️"
                    : step.action === "insert" ? "📥"
                    : step.action === "shift" ? "➡️"
                    : step.action === "min" ? "🏷️"
                    : "ℹ️"}
                </span>
                <span className="font-medium leading-snug">
                  {step.action === "compare" && step.indices?.length >= 2
                    ? `Comparing index ${step.indices[0]} (value: ${step.array?.[step.indices[0]]?.value}) with index ${step.indices[1]} (value: ${step.array?.[step.indices[1]]?.value})`
                    : step.action === "swap" && step.indices?.length >= 2
                    ? `Swapping index ${step.indices[0]} (value: ${step.array?.[step.indices[0]]?.value}) with index ${step.indices[1]} (value: ${step.array?.[step.indices[1]]?.value})`
                    : step.action === "merge" && step.indices?.length >= 1
                    ? `Merging element — placing value ${step.array?.[step.indices[0]]?.value} at index ${step.indices[0]}`
                    : step.action === "pivot" && step.indices?.length >= 1
                    ? `Pivot set at index ${step.indices[0]} (value: ${step.array?.[step.indices[0]]?.value})`
                    : step.action === "partition" && step.indices?.length >= 1
                    ? `Partition complete — pivot ${step.array?.[step.indices[0]]?.value} placed at its correct position (index ${step.indices[0]})`
                    : step.action === "shift" && step.indices?.length >= 2
                    ? `Shifting value ${step.array?.[step.indices[1]]?.value} right to make room`
                    : step.action === "insert" && step.indices?.length >= 1
                    ? `Inserting key at index ${step.indices[0]} (value: ${step.array?.[step.indices[0]]?.value})`
                    : step.action === "min" && step.indices?.length >= 1
                    ? `New minimum found — value ${step.array?.[step.indices[0]]?.value} at index ${step.indices[0]}`
                    : step.action === "done"
                    ? "✨ Array is fully sorted!"
                    : `Action: ${step.action}`}
                </span>
              </motion.div>
            ) : (
              <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500">
                Press Play or click Next to start the visualization
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
