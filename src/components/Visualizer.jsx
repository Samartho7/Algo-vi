// import { motion, AnimatePresence } from "framer-motion";
// import { complexityInfo } from "../utils/complexityInfo";

// export default function Visualizer({ step, algorithm }) {
//   // 🔁 Linked List Visual (e.g., Singly Insert at Head)
//   if (algorithm === "singly_insert_head") {
//     return (
//       <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
//         {/* Header */}
//         <div className="flex-shrink-0 p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
//           <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
//             🧠 Linked List Visualization
//           </h2>
//         </div>

//         {/* Main Content - Scrollable Container */}
//         <div className="flex-1 overflow-auto p-4">
//           <div className="h-full min-h-[400px] p-4 bg-white rounded-lg shadow-sm border border-slate-200">
//             <AnimatePresence>
//               {/* Linked List Nodes Container - Responsive Flow */}
//               <motion.div
//                 className="flex flex-wrap items-start gap-4 p-4 min-h-[200px]"
//                 initial="hidden"
//                 animate="visible"
//                 variants={{
//                   hidden: {},
//                   visible: {
//                     transition: {
//                       staggerChildren: 0.15,
//                     },
//                   },
//                 }}
//               >
//                 {step?.nodes?.map((node, idx) => {
//                   const isLastNode = idx === step.nodes.length - 1;
//                   const nextNode = step.nodes[idx + 1];

//                   return (
//                     <motion.div
//                       key={node.id}
//                       variants={{
//                         hidden: { opacity: 0, y: 20, scale: 0.95 },
//                         visible: { opacity: 1, y: 0, scale: 1 },
//                       }}
//                       className="flex items-center gap-4"
//                     >
//                       {/* Node Container */}
//                       <div className="relative">
//                         {/* Head/Tail Indicators - Positioned above the node */}
//                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//                           {node.isHead && (
//                             <motion.div
//                               initial={{ opacity: 0, scale: 0.8 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-lg border border-yellow-300"
//                             >
//                               HEAD
//                             </motion.div>
//                           )}
//                           {node.isTail && (
//                             <motion.div
//                               initial={{ opacity: 0, scale: 0.8 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-full shadow-lg border border-green-300"
//                             >
//                               TAIL
//                             </motion.div>
//                           )}
//                         </div>

//                         {/* Node Block */}
//                         <motion.div
//                           whileHover={{ scale: 1.05 }}
//                           className="flex border-2 border-slate-300 rounded-lg overflow-hidden shadow-lg min-w-[140px] bg-white transition-all duration-300"
//                         >
//                           {/* Data Section */}
//                           <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white p-3 text-center w-1/2 relative">
//                             <div className="text-lg font-bold mb-1">
//                               {node.value}
//                             </div>
//                             <div className="text-xs font-mono opacity-90">
//                               Data
//                             </div>
//                           </div>

//                           {/* Address Section */}
//                           <div className="bg-gradient-to-b from-slate-100 to-slate-200 text-slate-700 p-3 text-center w-1/2 border-l-2 border-slate-300">
//                             <div className="text-xs font-mono font-bold mb-1">
//                               {node.next ?? "NULL"}
//                             </div>
//                             <div className="text-xs font-mono opacity-75">
//                               Next
//                             </div>
//                           </div>
//                         </motion.div>
//                       </div>

//                       {/* Arrow - Only show if not the last node */}
//                       {!isLastNode && (
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0.8 }}
//                           animate={{ opacity: 1, scale: [0.8, 1.2, 1] }}
//                           transition={{ duration: 0.4, delay: 0.2 }}
//                           className="flex items-center justify-center"
//                         >
//                           <svg
//                             className="w-8 h-8 text-slate-400 drop-shadow-sm"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth={2.5}
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <line x1="2" y1="12" x2="22" y2="12" />
//                             <polyline points="16,6 22,12 16,18" />
//                           </svg>
//                         </motion.div>
//                       )}
//                     </motion.div>
//                   );
//                 })}
//               </motion.div>
//             </AnimatePresence>

//             {/* Empty state */}
//             {(!step?.nodes || step.nodes.length === 0) && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-center py-12 text-slate-500 h-full flex flex-col items-center justify-center"
//               >
//                 <div className="text-4xl mb-4">🔗</div>
//                 <div className="text-lg font-medium">Empty Linked List</div>
//                 <div className="text-sm">
//                   Nodes will appear here as you add them
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>

//         {/* Info Panel */}
//         <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200">
//           <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
//               <span>Node Data</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded border border-slate-300"></div>
//               <span>Next Pointer</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"></div>
//               <span>Head</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded"></div>
//               <span>Tail</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 🧠 Enhanced Search Visualization (Linear / Binary)
//   if (algorithm?.includes("search")) {
//     return (
//       <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50">
//         {/* Header */}
//         <div className="flex-shrink-0 p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
//           <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//             🔍 Search Visualization
//           </h2>
//         </div>
//         {/* Complexity Information */}
//         {(() => {
//           const algorithmType =
//             algorithm === "binary_search" ? "binary" : "linear";
//           const info = complexityInfo[algorithmType];
//           const arraySize = step?.array?.length || 0;

//           // Calculate expected iterations
//           let expectedIterations = "N/A";
//           if (algorithmType === "linear") {
//             expectedIterations = `Avg: ${Math.ceil(
//               arraySize / 2
//             )}, Max: ${arraySize}`;
//           } else if (algorithmType === "binary") {
//             expectedIterations = `Max: ${Math.ceil(Math.log2(arraySize))}`;
//           }

//           return info ? (
//             <div className="flex-shrink-0 p-4 bg-white border-b border-slate-200">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-sm font-semibold text-slate-700">
//                   {info.name} Complexity
//                 </h3>
//                 <span className="text-xs text-slate-500">
//                   Array size: {arraySize}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
//                 <div className="bg-green-50 p-2 rounded border border-green-200">
//                   <div className="text-green-600 font-medium mb-1">
//                     Best Case
//                   </div>
//                   <div className="text-green-800 font-bold">{info.best}</div>
//                 </div>
//                 <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
//                   <div className="text-yellow-600 font-medium mb-1">
//                     Average
//                   </div>
//                   <div className="text-yellow-800 font-bold">
//                     {info.average}
//                   </div>
//                 </div>
//                 <div className="bg-red-50 p-2 rounded border border-red-200">
//                   <div className="text-red-600 font-medium mb-1">
//                     Worst Case
//                   </div>
//                   <div className="text-red-800 font-bold">{info.worst}</div>
//                 </div>
//                 <div className="bg-slate-50 p-2 rounded border border-slate-200">
//                   <div className="text-slate-600 font-medium mb-1">
//                     Expected
//                   </div>
//                   <div className="text-slate-800 font-bold">
//                     {expectedIterations}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : null;
//         })()}

//         {/* Main Container */}
//         <div className="flex-1 p-4 overflow-hidden">
//           <div className="h-full p-4 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col">
//             {/* Bars Container */}
//             <div className="flex-1 flex gap-2 justify-center items-end py-4 min-h-0">
//               <AnimatePresence>
//                 {step?.array?.map(({ id, value }, i) => {
//                   const isCompared =
//                     step.indices?.includes(i) && step.action === "compare";
//                   const isFound =
//                     step.indices?.includes(i) && step.action === "found";
//                   const isShiftLeft =
//                     step.indices?.includes(i) && step.action === "shiftLeft";
//                   const isShiftRight =
//                     step.indices?.includes(i) && step.action === "shiftRight";
//                   const isActive = step.indices?.includes(i);
//                   const isNotFound = step.action === "notFound";

//                   // Enhanced color scheme with gradients
//                   let bgColor = "bg-gradient-to-t from-slate-700 to-slate-800";
//                   let textColor = "text-white";
//                   let borderColor = "border-slate-600";
//                   let shadowColor = "shadow-slate-400/30";

//                   if (isFound) {
//                     bgColor = "bg-gradient-to-t from-green-600 to-green-500";
//                     shadowColor = "shadow-green-400/50";
//                     borderColor = "border-green-500";
//                   } else if (isCompared) {
//                     bgColor = "bg-gradient-to-t from-yellow-500 to-yellow-400";
//                     textColor = "text-yellow-900";
//                     shadowColor = "shadow-yellow-400/50";
//                     borderColor = "border-yellow-400";
//                   } else if (isShiftLeft) {
//                     bgColor = "bg-gradient-to-t from-blue-500 to-blue-400";
//                     textColor = "text-white";
//                     shadowColor = "shadow-blue-400/50";
//                     borderColor = "border-blue-400";
//                   } else if (isShiftRight) {
//                     bgColor = "bg-gradient-to-t from-purple-500 to-purple-400";
//                     textColor = "text-white";
//                     shadowColor = "shadow-purple-400/50";
//                     borderColor = "border-purple-400";
//                   } else if (isNotFound) {
//                     // Dim all bars when not found
//                     bgColor = "bg-gradient-to-t from-red-300 to-red-200";
//                     textColor = "text-red-700";
//                     shadowColor = "shadow-red-200/30";
//                     borderColor = "border-red-300";
//                   } else if (
//                     step.action === "done" &&
//                     step.message?.includes("not found")
//                   ) {
//                     // Final state for not found
//                     bgColor = "bg-gradient-to-t from-slate-500 to-slate-400";
//                     textColor = "text-slate-200";
//                     shadowColor = "shadow-slate-400/30";
//                     borderColor = "border-slate-500";
//                   }

//                   // Dynamic bar sizing
//                   const maxHeight = 140;
//                   const minHeight = 40;
//                   const height = Math.min(
//                     Math.max(value * 3 + minHeight, minHeight),
//                     maxHeight
//                   );

//                   return (
//                     <motion.div
//                       key={id}
//                       layout
//                       initial={{ scale: 0.8, y: 20, opacity: 0 }}
//                       animate={{
//                         scale: isActive ? 1.08 : isNotFound ? 0.95 : 1,
//                         y: 0,
//                         opacity: isNotFound ? 0.6 : 1,
//                         rotateX: isFound ? 5 : 0,
//                       }}
//                       exit={{ scale: 0.8, opacity: 0, y: 20 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 200,
//                         damping: 25,
//                         duration: 0.4,
//                       }}
//                       className={`w-12 flex items-center justify-center rounded-lg font-bold border-2 transition-all duration-300 ${bgColor} ${textColor} ${borderColor} shadow-lg ${shadowColor}`}
//                       style={{ height: `${height}px` }}
//                     >
//                       <span className="text-sm font-bold drop-shadow-sm select-none">
//                         {value}
//                       </span>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </div>

//             {/* Enhanced Status Display */}
//             <div className="flex-shrink-0 space-y-3">
//               {/* Current Step Info */}
//               <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
//                 {step && (
//                   <div className="flex items-center justify-between text-sm">
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`w-3 h-3 rounded-full ${
//                           step.action === "found"
//                             ? "bg-green-500"
//                             : step.action === "compare"
//                             ? "bg-yellow-500"
//                             : step.action === "shiftLeft"
//                             ? "bg-blue-500"
//                             : step.action === "shiftRight"
//                             ? "bg-purple-500"
//                             : step.action === "notFound"
//                             ? "bg-red-500"
//                             : "bg-slate-500"
//                         }`}
//                       ></div>
//                       <span>
//                         <strong>Action:</strong>{" "}
//                         {step.action === "notFound"
//                           ? "Not Found"
//                           : step.action === "shiftLeft"
//                           ? "Search Left"
//                           : step.action === "shiftRight"
//                           ? "Search Right"
//                           : step.action.charAt(0).toUpperCase() +
//                             step.action.slice(1)}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
//                       <span>
//                         <strong>Indices:</strong>{" "}
//                         {step.indices?.length > 0
//                           ? step.indices.join(", ")
//                           : "None"}
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Message Display with Enhanced Styling */}
//               {step?.message && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`p-3 rounded-lg border-l-4 ${
//                     step.action === "found"
//                       ? "bg-green-50 border-green-400 text-green-800"
//                       : step.action === "notFound"
//                       ? "bg-red-50 border-red-400 text-red-800"
//                       : step.action === "compare"
//                       ? "bg-yellow-50 border-yellow-400 text-yellow-800"
//                       : step.action === "shiftLeft" ||
//                         step.action === "shiftRight"
//                       ? "bg-blue-50 border-blue-400 text-blue-800"
//                       : "bg-slate-50 border-slate-400 text-slate-800"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg">
//                       {step.action === "found"
//                         ? "🎉"
//                         : step.action === "notFound"
//                         ? "❌"
//                         : step.action === "compare"
//                         ? "🔍"
//                         : step.action === "shiftLeft"
//                         ? "⬅️"
//                         : step.action === "shiftRight"
//                         ? "➡️"
//                         : "ℹ️"}
//                     </span>
//                     <span className="text-sm font-medium">{step.message}</span>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Binary Search Range Indicator */}
//               {algorithm === "binary_search" &&
//                 step?.low !== undefined &&
//                 step?.high !== undefined && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="p-3 bg-indigo-50 rounded-lg border border-indigo-200"
//                   >
//                     <div className="flex items-center justify-between text-sm text-indigo-800">
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
//                         <span>
//                           <strong>Search Range:</strong>
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <span>
//                           Low: <strong>{step.low}</strong>
//                         </span>
//                         {step.mid !== undefined && (
//                           <span>
//                             Mid: <strong>{step.mid}</strong>
//                           </span>
//                         )}
//                         <span>
//                           High: <strong>{step.high}</strong>
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Legend */}
//         <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200">
//           <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded"></div>
//               <span>Unvisited</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded"></div>
//               <span>Comparing</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded"></div>
//               <span>Search Left</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded"></div>
//               <span>Search Right</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-green-600 to-green-500 rounded"></div>
//               <span>Found</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-gradient-to-r from-red-300 to-red-200 rounded border border-red-300"></div>
//               <span>Not Found</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 🧠 Array-based Sorting Visualization (Default)

//   return (
//     <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50">
//       {/* Header */}
//       <div className="flex-shrink-0 p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
//         <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//           🧠 Sorting Visualization
//         </h2>
//       </div>

//       {/* Main Sorting Container - Takes most of the space */}
//       <div className="flex-1 p-4 overflow-hidden">
//         <div className="h-full p-4 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col">
//           {/* Bars Container */}
//           <div className="flex-1 flex gap-2 justify-center items-end min-h-0 py-4">
//             <AnimatePresence>
//               {step?.array?.map(({ id, value }, i) => {
//                 const isActive = step.indices?.includes(i);
//                 const isSwap = step.action === "swap" && isActive;

//                 let bgColor = "bg-gradient-to-t from-slate-700 to-slate-800";
//                 let textColor = "text-white";
//                 let borderColor = "border-slate-600";
//                 let shadowColor = "shadow-slate-400/30";

//                 // Enhanced colors per action with gradients
//                 if (step.action === "done") {
//                   bgColor = "bg-gradient-to-t from-green-600 to-green-500";
//                   shadowColor = "shadow-green-400/40";
//                   borderColor = "border-green-500";
//                 } else if (step.action === "insert" && isActive) {
//                   bgColor = "bg-gradient-to-t from-emerald-400 to-emerald-300";
//                   textColor = "text-emerald-900";
//                   shadowColor = "shadow-emerald-400/40";
//                   borderColor = "border-emerald-400";
//                 } else if (step.action === "merge" && isActive) {
//                   bgColor = "bg-gradient-to-t from-purple-600 to-purple-500";
//                   textColor = "text-white";
//                   shadowColor = "shadow-purple-400/40";
//                   borderColor = "border-purple-500";
//                 } else if (step.action === "pivot" && isActive) {
//                   bgColor = "bg-gradient-to-t from-blue-600 to-blue-500";
//                   shadowColor = "shadow-blue-400/40";
//                   borderColor = "border-blue-500";
//                 } else if (step.action === "partition" && isActive) {
//                   bgColor = "bg-gradient-to-t from-pink-500 to-pink-400";
//                   textColor = "text-pink-900";
//                   shadowColor = "shadow-pink-400/40";
//                   borderColor = "border-pink-400";
//                 } else if (isActive) {
//                   switch (algorithm) {
//                     case "bubble":
//                       bgColor = isSwap
//                         ? "bg-gradient-to-t from-red-600 to-red-500"
//                         : "bg-gradient-to-t from-yellow-500 to-yellow-400";
//                       textColor = isSwap ? "text-white" : "text-yellow-900";
//                       shadowColor = isSwap
//                         ? "shadow-red-400/40"
//                         : "shadow-yellow-400/40";
//                       borderColor = isSwap
//                         ? "border-red-500"
//                         : "border-yellow-400";
//                       break;
//                     case "selection":
//                       bgColor = isSwap
//                         ? "bg-gradient-to-t from-red-600 to-red-500"
//                         : "bg-gradient-to-t from-yellow-500 to-yellow-400";
//                       textColor = isSwap ? "text-white" : "text-yellow-900";
//                       shadowColor = isSwap
//                         ? "shadow-red-400/40"
//                         : "shadow-yellow-400/40";
//                       borderColor = isSwap
//                         ? "border-red-500"
//                         : "border-yellow-400";
//                       break;
//                     case "merge":
//                       bgColor = "bg-gradient-to-t from-green-400 to-green-300";
//                       textColor = "text-green-900";
//                       shadowColor = "shadow-green-400/40";
//                       borderColor = "border-green-400";
//                       break;
//                     case "quick":
//                       bgColor =
//                         "bg-gradient-to-t from-yellow-500 to-yellow-400";
//                       textColor = "text-yellow-900";
//                       shadowColor = "shadow-yellow-400/40";
//                       borderColor = "border-yellow-400";
//                       break;
//                     default:
//                       bgColor =
//                         "bg-gradient-to-t from-yellow-500 to-yellow-400";
//                       textColor = "text-yellow-900";
//                       shadowColor = "shadow-yellow-400/40";
//                       borderColor = "border-yellow-400";
//                   }
//                 }

//                 // Dynamic bar sizing based on container
//                 const maxHeight = 120; // Reduced max height
//                 const minHeight = 32;
//                 const height = Math.min(
//                   Math.max(value * 3 + minHeight, minHeight),
//                   maxHeight
//                 );

//                 return (
//                   <motion.div
//                     key={id} // Ensures unique identity across steps
//                     layout
//                     initial={{ scale: 0.8, y: 20, opacity: 0 }}
//                     animate={{
//                       scale: isActive ? 1.05 : 1,
//                       y: 0,
//                       opacity: 1,
//                       rotateX: isSwap ? 10 : 0,
//                     }}
//                     exit={{ scale: 0.8, opacity: 0, y: 20 }}
//                     transition={{
//                       type: "spring",
//                       stiffness: 200,
//                       damping: 25,
//                       duration: 0.3,
//                     }}
//                     className={`w-10 flex items-center justify-center rounded-md font-bold border-2 transition-all duration-300 ${bgColor} ${textColor} ${borderColor} shadow-md ${shadowColor}`}
//                     style={{ height: `${height}px` }}
//                   >
//                     <span className="text-sm font-bold drop-shadow-sm select-none">
//                       {value}
//                     </span>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </div>

//           {/* Current Step Info - Compact */}
//           <div className="flex-shrink-0 p-3 bg-slate-50 rounded-md border border-slate-200">
//             {step && (
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                   <span>
//                     <strong>Action:</strong> {step.action}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                   <span>
//                     <strong>Indices:</strong>{" "}
//                     {step.indices?.join(", ") || "None"}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Complexity Info - Collapsible */}
//       <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200">
//         {algorithm && complexityInfo[algorithm] && (
//           <div className="space-y-2">
//             <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
//               📈 {complexityInfo[algorithm].name}
//             </h3>
//             <div className="grid grid-cols-2 gap-2 text-xs">
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span>
//                   <strong>Best:</strong> {complexityInfo[algorithm].best}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                 <span>
//                   <strong>Worst:</strong> {complexityInfo[algorithm].worst}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                 <span>
//                   <strong>Average:</strong> {complexityInfo[algorithm].average}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                 <span>
//                   <strong>Space:</strong> {complexityInfo[algorithm].space}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { motion, AnimatePresence } from "framer-motion";
import { complexityInfo } from "../utils/complexityInfo";

export default function Visualizer({ step, algorithm }) {
  // 🔁 Linked List Visual (e.g., Singly Insert at Head)
  if (algorithm === "singly_insert_head") {
    return (
      <div className="flex flex-col h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="flex-shrink-0 p-2 md:p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <h2 className="text-base md:text-xl font-bold text-slate-800 flex items-center gap-2">
            🧠 Linked List Visualization
          </h2>
        </div>

        {/* Main Content - Scrollable Container */}
        <div className="flex-1 overflow-auto p-2 md:p-4">
          <div className="min-h-[200px] p-2 md:p-4 bg-white rounded-lg shadow-sm border border-slate-200">
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
        <div className="flex-shrink-0 p-2 md:p-4 bg-white border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-slate-600">
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

  // 🧠 Enhanced Search Visualization (Linear / Binary)
  if (algorithm?.includes("search")) {
    return (
      <div className="flex flex-col h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-indigo-50">
        {/* Header */}
        <div className="flex-shrink-0 p-2 md:p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <h2 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-2">
            🔍 Search Visualization
          </h2>
        </div>
        {/* Complexity Information */}
        {(() => {
          const algorithmType =
            algorithm === "binary_search" ? "binary" : "linear";
          const info = complexityInfo[algorithmType];
          const arraySize = step?.array?.length || 0;

          // Calculate expected iterations
          let expectedIterations = "N/A";
          if (algorithmType === "linear") {
            expectedIterations = `Avg: ${Math.ceil(
              arraySize / 2
            )}, Max: ${arraySize}`;
          } else if (algorithmType === "binary") {
            expectedIterations = `Max: ${Math.ceil(Math.log2(arraySize))}`;
          }

          return info ? (
            <div className="flex-shrink-0 p-2 md:p-4 bg-white border-b border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs md:text-sm font-semibold text-slate-700">
                  {info.name} Complexity
                </h3>
                <span className="text-xs text-slate-500">
                  Array size: {arraySize}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-green-50 p-2 rounded border border-green-200">
                  <div className="text-green-600 font-medium mb-1">
                    Best Case
                  </div>
                  <div className="text-green-800 font-bold">{info.best}</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                  <div className="text-yellow-600 font-medium mb-1">
                    Average
                  </div>
                  <div className="text-yellow-800 font-bold">
                    {info.average}
                  </div>
                </div>
                <div className="bg-red-50 p-2 rounded border border-red-200">
                  <div className="text-red-600 font-medium mb-1">
                    Worst Case
                  </div>
                  <div className="text-red-800 font-bold">{info.worst}</div>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="text-slate-600 font-medium mb-1">
                    Expected
                  </div>
                  <div className="text-slate-800 font-bold">
                    {expectedIterations}
                  </div>
                </div>
              </div>
            </div>
          ) : null;
        })()}

        {/* Main Container */}
        <div className="flex-1 p-2 md:p-4 overflow-auto">
          <div className="min-h-[300px] p-2 md:p-4 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col">
            {/* Bars Container */}
            <div className="flex-1 flex gap-1 md:gap-2 justify-center items-end py-2 md:py-4 min-h-[200px]">
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
                  const maxHeight = 140;
                  const minHeight = 40;
                  const height = Math.min(
                    Math.max(value * 3 + minHeight, minHeight),
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

        {/* Enhanced Legend */}
        <div className="flex-shrink-0 p-2 md:p-4 bg-white border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded"></div>
              <span>Unvisited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded"></div>
              <span>Search Left</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded"></div>
              <span>Search Right</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-600 to-green-500 rounded"></div>
              <span>Found</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-red-300 to-red-200 rounded border border-red-300"></div>
              <span>Not Found</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🧠 Array-based Sorting Visualization (Default)

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="flex-shrink-0 p-2 md:p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <h2 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-2">
          🧠 Sorting Visualization
        </h2>
      </div>

      {/* Main Sorting Container - Takes most of the space */}
      <div className="flex-1 p-2 md:p-4 overflow-auto">
        <div className="min-h-[250px] p-2 md:p-4 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col">
          {/* Bars Container */}
          <div className="flex-1 flex gap-1 md:gap-2 justify-center items-end min-h-[180px] py-2 md:py-4">
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
                    className={`w-7 md:w-10 flex items-center justify-center rounded-md font-bold border-2 transition-all duration-300 ${bgColor} ${textColor} ${borderColor} shadow-md ${shadowColor}`}
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

          {/* Current Step Info - Compact */}
          <div className="flex-shrink-0 p-2 md:p-3 bg-slate-50 rounded-md border border-slate-200">
            {step && (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs md:text-sm gap-2">
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
      <div className="flex-shrink-0 p-2 md:p-4 bg-white border-t border-slate-200">
        {algorithm && complexityInfo[algorithm] && (
          <div className="space-y-2">
            <h3 className="font-semibold text-xs md:text-sm text-slate-800 flex items-center gap-2">
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