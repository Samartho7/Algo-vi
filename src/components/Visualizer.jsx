import { motion, AnimatePresence } from "framer-motion";
import { complexityInfo } from "../utils/complexityInfo";

export default function Visualizer({ step, stepIndex, algorithm }) {
  // 🔁 Linked List Visual (e.g., Singly Insert at Head)
  if (algorithm === "singly_insert_head") {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            🧠 Linked List Visualization
          </h2>
        </div>

        {/* Main Content - Scrollable Container */}
        <div className="flex-1 overflow-auto p-4">
          <div className="h-full min-h-[400px] p-4 bg-white rounded-lg shadow-sm border border-slate-200">
            <AnimatePresence>
              {/* Linked List Nodes Container - Responsive Flow */}
              <motion.div
                className="flex flex-wrap items-start gap-4 p-4 min-h-[200px]"
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

        {/* Info Panel */}
        <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
              <span>Node Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded border border-slate-300"></div>
              <span>Next Pointer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"></div>
              <span>Head</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded"></div>
              <span>Tail</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🧠 Array-based Sorting Visualization (Default)

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          🧠 Sorting Visualization
        </h2>
      </div>

      {/* Main Sorting Container - Takes most of the space */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="h-full p-4 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col">
          {/* Bars Container */}
          <div className="flex-1 flex gap-2 justify-center items-end min-h-0 py-4">
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
                const maxHeight = 120; // Reduced max height
                const minHeight = 32;
                const height = Math.min(
                  Math.max(value * 3 + minHeight, minHeight),
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
                    className={`w-10 flex items-center justify-center rounded-md font-bold border-2 transition-all duration-300 ${bgColor} ${textColor} ${borderColor} shadow-md ${shadowColor}`}
                    style={{ height: `${height}px` }}
                  >
                    <span className="text-sm font-bold drop-shadow-sm select-none">
                      {value}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Current Step Info - Compact */}
          <div className="flex-shrink-0 p-3 bg-slate-50 rounded-md border border-slate-200">
            {step && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>
                    <strong>Action:</strong> {step.action}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>
                    <strong>Indices:</strong>{" "}
                    {step.indices?.join(", ") || "None"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complexity Info - Collapsible */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200">
        {algorithm && complexityInfo[algorithm] && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
              📈 {complexityInfo[algorithm].name}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>
                  <strong>Best:</strong> {complexityInfo[algorithm].best}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>
                  <strong>Worst:</strong> {complexityInfo[algorithm].worst}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>
                  <strong>Average:</strong> {complexityInfo[algorithm].average}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>
                  <strong>Space:</strong> {complexityInfo[algorithm].space}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//   return (
//     <div className="w-1/2 p-4 overflow-auto bg-gray-50 flex flex-col">
//       <h2 className="text-lg font-semibold mb-2">🧠 Visualization</h2>

//       <div className="flex gap-2 justify-center items-end h-48 transition-all duration-500">
//         <AnimatePresence>
//           {step?.array?.map((val, i) => {
//             const isActive = step.indices?.includes(i);
//             const isSwap = step.action === "swap" && isActive;

//             let bgColor = "bg-gray-800";
//             let textColor = "text-white";

//             // 🔸 Special animations/colors per action
//             if (step.action === "done") {
//               bgColor = "bg-green-700";
//             } else if (step.action === "insert" && isActive) {
//               bgColor = "bg-green-500";
//               textColor = "text-black";
//             } else if (step.action === "merge" && isActive) {
//               bgColor = "bg-purple-500";
//               textColor = "text-white";
//             } else if (step.action === "pivot" && isActive) {
//               bgColor = "bg-blue-500";
//             } else if (step.action === "partition" && isActive) {
//               bgColor = "bg-pink-500";
//               textColor = "text-black";
//             } else if (isActive) {
//               switch (algorithm) {
//                 case "bubble":
//                   bgColor = isSwap ? "bg-red-500" : "bg-yellow-400";
//                   textColor = isSwap ? "text-white" : "text-black";
//                   break;
//                 case "selection":
//                   bgColor = isSwap ? "bg-red-500" : "bg-yellow-400";
//                   textColor = "text-black";
//                   break;
//                 case "merge":
//                   bgColor = "bg-green-300";
//                   textColor = "text-black";
//                   break;
//                 case "quick":
//                   bgColor = "bg-yellow-400";
//                   textColor = "text-black";
//                   break;
//                 default:
//                   bgColor = "bg-yellow-400";
//               }
//             }

//             return (
//               <motion.div
//                 key={i}
//                 layout
//                 initial={{ scale: 0.8, y: 10 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 180, damping: 20 }}
//                 className={`w-10 h-10 flex items-center justify-center rounded font-bold shadow-md transition-all duration-300 ${bgColor} ${textColor}`}
//               >
//                 {val}
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </div>

//       <div className="border rounded p-2 font-mono text-sm bg-white mt-4">
//         {/* <pre>{code}</pre> */}
//         {step && (
//           <div className="mt-2 p-2 bg-blue-100 rounded">
//             <strong>Action:</strong> {step.action} <br />
//             <strong>Indices:</strong> {step.indices?.join(", ")}
//           </div>
//         )}
//         {algorithm && complexityInfo[algorithm] && (
//           <div className="mt-4 p-3 bg-white border rounded text-sm leading-6">
//             <h3 className="font-bold text-lg mb-2">
//               📈 {complexityInfo[algorithm].name} - Time & Space Complexity
//             </h3>
//             <ul className="list-disc pl-5 space-y-1">
//               <li title="Time complexity when the input is already sorted or optimal.">
//                 <strong>Best Case:</strong> {complexityInfo[algorithm].best}
//               </li>
//               <li title="Expected time complexity for random input.">
//                 <strong>Average Case:</strong>{" "}
//                 {complexityInfo[algorithm].average}
//               </li>
//               <li title="Time complexity in the worst possible scenario.">
//                 <strong>Worst Case:</strong> {complexityInfo[algorithm].worst}
//               </li>
//               <li title="Additional memory used beyond input array.">
//                 <strong>Space:</strong> {complexityInfo[algorithm].space}
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
