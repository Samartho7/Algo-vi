import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { complexityInfo } from "../utils/complexityInfo";
import codeTemplates from "../utils/codeTemplates";

/* ─── Derived at module load — auto-updates when you add algos/languages ─── */
// Unique primary algorithm keys (skip alias duplicates: 'linear', 'binary')
const ALGO_KEYS = Object.keys(complexityInfo).filter(
  (k) => k !== "linear" && k !== "binary"
);
const ALGO_COUNT = ALGO_KEYS.length;

// Derive languages from any template entry
const LANG_LABELS = { c: "C", cpp: "C++", java: "Java" };
const LANGUAGES = Object.keys(
  Object.values(codeTemplates)[0] ?? {}
).map((k) => LANG_LABELS[k] ?? k.toUpperCase());

// Accent palette cycles through for preview cards
const ACCENT_CYCLE = [
  { accent: "from-indigo-500/20 to-purple-500/20", border: "border-indigo-500/25", dot: "bg-indigo-400" },
  { accent: "from-emerald-500/20 to-teal-500/20",  border: "border-emerald-500/25", dot: "bg-emerald-400" },
  { accent: "from-orange-500/20 to-pink-500/20",   border: "border-orange-500/25", dot: "bg-orange-400" },
];

// Show a rotating sample of 3 algorithms from the full list as preview cards
const PREVIEW_KEYS = [
  ALGO_KEYS.find((k) => complexityInfo[k]?.name?.toLowerCase().includes("bubble")),
  ALGO_KEYS.find((k) => complexityInfo[k]?.name?.toLowerCase().includes("merge")),
  ALGO_KEYS.find((k) => complexityInfo[k]?.name?.toLowerCase().includes("quick")),
].filter(Boolean);

const PREVIEW_ALGOS = PREVIEW_KEYS.map((key, i) => ({
  key,
  ...ACCENT_CYCLE[i % ACCENT_CYCLE.length],
}));

/* ─── Design tokens (mirror the sidebar/topbar palette) ─── */
// Primary: indigo-600 → purple-600
// Surface: slate-900 / slate-800/50 / slate-700/50
// Accent-green: emerald-400 (live dot)
// Accent-cyan: cyan-400 (info)
// Text: slate-300 / slate-400

/* ─── DSA Facts Bubbles ─── */
const DSA_FACTS = [
  { category: "O(log n)",   fact: "Binary search on 1 billion sorted items takes at most 30 comparisons. Halving the search space each step is insanely powerful.", highlight: "30 steps on 1B items", grad: "from-indigo-500 via-indigo-600 to-indigo-800",  glow: "rgba(99,102,241,0.6)"  },
  { category: "2–3× fast",  fact: "Quicksort is called 'quick' because it's typically 2–3× faster than Merge Sort in practice, despite sharing the same O(n log n) average case.", highlight: "Fastest in practice", grad: "from-violet-500 via-violet-600 to-indigo-700",  glow: "rgba(139,92,246,0.6)"  },
  { category: "Stable?",    fact: "Merge Sort is stable — equal elements keep their relative order. Quicksort is typically not. This matters when sorting records by multiple keys.", highlight: "Stability = order safety", grad: "from-purple-500 via-purple-600 to-purple-800",  glow: "rgba(168,85,247,0.6)"  },
  { category: "O(n) Heap",  fact: "Building a heap from an unsorted array takes O(n), not O(n log n). Most people get this wrong — it's a classic interview trick question.", highlight: "Build phase is O(n)", grad: "from-emerald-500 via-emerald-600 to-teal-700",  glow: "rgba(16,185,129,0.6)"  },
  { category: "Floyd's",    fact: "Floyd's cycle detection uses a slow and a fast pointer — no visited-set needed. It detects loops in a linked list in O(n) time and O(1) space.", highlight: "O(1) space cycle detection", grad: "from-cyan-500 via-cyan-600 to-blue-700",      glow: "rgba(6,182,212,0.6)"   },
  { category: "Hash O(1)",  fact: "Hash tables give O(1) average lookup — but O(n) worst case when all keys collide to one bucket. A good hash function is everything.", highlight: "O(1) avg vs O(n) worst", grad: "from-amber-500 via-orange-500 to-orange-700",   glow: "rgba(245,158,11,0.6)"  },
  { category: "BFS / DFS",  fact: "BFS uses a queue and finds shortest paths in unweighted graphs. DFS uses a stack and is better for topological sorts and cycle detection.", highlight: "Queue = BFS · Stack = DFS", grad: "from-sky-500 via-sky-600 to-blue-700",          glow: "rgba(14,165,233,0.6)"  },
  { category: "n log n ✓",  fact: "Comparison-based sorting can never beat O(n log n). Proven by information theory — distinguishing n! orderings requires log₂(n!) ≈ n log n comparisons.", highlight: "Proven lower bound", grad: "from-pink-500 via-pink-600 to-rose-700",        glow: "rgba(236,72,153,0.6)"  },
  { category: "Recursion",  fact: "Every recursive call adds a frame to the call stack. Without tail-call optimization, deep recursion means O(n) stack space — and eventual stack overflow.", highlight: "Depth = stack space", grad: "from-indigo-400 via-blue-500 to-indigo-700",   glow: "rgba(99,102,241,0.55)" },
  { category: "DP = DAG",   fact: "Dynamic programming breaks problems into overlapping subproblems. Every DP solution is a directed acyclic graph (DAG) of states — memoization collapses it.", highlight: "Memoization collapses the DAG", grad: "from-teal-500 via-teal-600 to-emerald-700",   glow: "rgba(20,184,166,0.6)"  },
  { category: "Trie O(m)",  fact: "A Trie finds all words matching a prefix in O(m) time — where m is the prefix length — regardless of how large the dictionary is.", highlight: "Independent of dict size", grad: "from-lime-500 via-green-600 to-green-700",      glow: "rgba(132,204,22,0.6)"  },
  { category: "Dijkstra",   fact: "Dijkstra's algorithm breaks on negative edge weights. For those graphs, reach for Bellman-Ford — O(VE) but handles negative edges correctly.", highlight: "Negative weights → Bellman-Ford", grad: "from-rose-500 via-red-500 to-red-700",          glow: "rgba(239,68,68,0.6)"   },
  { category: "Array O(1)", fact: "Arrays store elements contiguously in memory, giving O(1) random access. A linked list must traverse from head — O(n) — to reach any element.", highlight: "Contiguous = O(1) access", grad: "from-fuchsia-500 via-fuchsia-600 to-purple-700",glow: "rgba(217,70,239,0.6)"  },
  { category: "Priority Q", fact: "A priority queue is a heap under the hood. Both insert and extract take O(log n) — the min (or max) element is always available at the root in O(1).", highlight: "Root is always min/max", grad: "from-orange-500 via-amber-500 to-yellow-600",    glow: "rgba(234,88,12,0.6)"   },
];

const BUBBLE_POSITIONS = [
  { x: "6%",  y: "10%" }, { x: "60%", y: "6%"  }, { x: "36%", y: "46%" },
  { x: "74%", y: "42%" }, { x: "2%",  y: "58%" }, { x: "52%", y: "75%" },
  { x: "80%", y: "18%" }, { x: "25%", y: "72%" },
];
const BUBBLE_SIZES = [88, 76, 96, 66, 72, 60, 54, 64];

let _bubbleUid = 0;

function FloatingBubble({ bubble, onPop }) {
  // Derive stable animation values from uid so float doesn't reset on array changes
  const seed = bubble.uid % 8;
  const yAmp = 14 + (seed % 4) * 4;
  const xAmp = 8  + (seed % 3) * 3;
  const yDur = 4.6 + seed * 0.46;
  const xDur = yDur * 1.27; // irrational ratio → never repeats exactly

  const pos  = BUBBLE_POSITIONS[bubble.posIdx];
  const fact = bubble.fact;

  return (
    <motion.button
      style={{
        position: "absolute",
        left: pos?.x ?? "50%",
        top:  pos?.y ?? "50%",
        width:  bubble.size,
        height: bubble.size,
        zIndex: 10,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1, opacity: 1,
        y: [0, -yAmp, 0, yAmp * 0.55, 0],
        x: [0,  xAmp, 0, -xAmp * 0.6, 0],
      }}
      exit={{ scale: [1, 1.45, 0], opacity: [1, 0.6, 0] }}
      transition={{
        scale:   { duration: 0.45, ease: "backOut" },
        opacity: { duration: 0.45 },
        exit:    { duration: 0.32, ease: "easeOut" },
        y: { duration: yDur, repeat: Infinity, ease: "easeInOut", delay: seed * 0.22 },
        x: { duration: xDur, repeat: Infinity, ease: "easeInOut", delay: seed * 0.14 },
      }}
      whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 260, damping: 17 } }}
      onClick={onPop}
      className="rounded-full cursor-pointer focus:outline-none select-none"
      aria-label={`Reveal: ${fact.category}`}
    >
      {/* Breathing glow ring */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{ boxShadow: [`0 0 0 0px ${fact.glow}`, `0 0 0 14px transparent`] }}
        transition={{ duration: yDur * 0.6, repeat: Infinity, ease: "easeOut", delay: seed * 0.3 }}
      />
      {/* Sphere */}
      <div
        className={`relative w-full h-full rounded-full bg-gradient-to-br ${fact.grad} flex flex-col items-center justify-center overflow-hidden`}
        style={{ boxShadow: `0 6px 28px ${fact.glow}, inset 0 1px 0 rgba(255,255,255,0.22)` }}
      >
        {/* Glossy specular */}
        <div
          className="absolute rounded-full bg-white/18 blur-[3px]"
          style={{ width: "50%", height: "30%", top: "12%", left: "22%" }}
        />
        <span className="relative text-white font-bold text-[10px] tracking-wide drop-shadow text-center px-2 leading-tight">
          {fact.category}
        </span>
      </div>
    </motion.button>
  );
}

function FloatingBubbles({ onStart }) {
  const factCursorRef = useRef(BUBBLE_POSITIONS.length); // initial bubbles use 0..N-1
  const createBubbleRef = useRef(null);

  createBubbleRef.current = (posIdx) => {
    const factIdx = factCursorRef.current % DSA_FACTS.length;
    factCursorRef.current++;
    return {
      uid:    _bubbleUid++,
      fact:   DSA_FACTS[factIdx],
      posIdx,
      size:   BUBBLE_SIZES[posIdx % BUBBLE_SIZES.length],
    };
  };

  const [bubbles, setBubbles] = useState(() =>
    BUBBLE_POSITIONS.map((_, i) => ({
      uid:    _bubbleUid++,
      fact:   DSA_FACTS[i % DSA_FACTS.length],
      posIdx: i,
      size:   BUBBLE_SIZES[i],
    }))
  );

  const [poppedFact, setPoppedFact] = useState(null);
  const [showHint,   setShowHint]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const handlePop = useCallback((uid, posIdx, fact) => {
    setPoppedFact(fact);
    setBubbles(prev => prev.filter(b => b.uid !== uid));
    // Respawn at the same slot after the exit animation finishes
    setTimeout(() => {
      setBubbles(prev => [...prev, createBubbleRef.current(posIdx)]);
    }, 750);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* Open arena — no border box */}
      <div className="relative w-full" style={{ height: 340 }}>
        {/* Fade-out hint */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 text-[11px] text-slate-500 font-medium pointer-events-none z-20 flex items-center gap-1.5 whitespace-nowrap"
          animate={{ opacity: showHint ? 1 : 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Click a bubble to reveal a DSA fact
        </motion.div>

        <AnimatePresence>
          {bubbles.map((b) => (
            <FloatingBubble
              key={b.uid}
              bubble={b}
              onPop={() => handlePop(b.uid, b.posIdx, b.fact)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Fact card */}
      <AnimatePresence mode="wait">
        {poppedFact && (
          <motion.div
            key={poppedFact.category}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="rounded-xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex-shrink-0 mt-0.5 bg-gradient-to-br ${poppedFact.grad}`}
                style={{ boxShadow: `0 4px 14px ${poppedFact.glow}` }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white mb-1">{poppedFact.category}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">{poppedFact.fact}</p>
              </div>
            </div>

            {/* Highlight pill */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border"
              style={{
                background: `${poppedFact.glow.replace("0.6", "0.12")}`,
                borderColor: poppedFact.glow.replace("0.6", "0.35"),
                color: "white",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: poppedFact.glow }}
              />
              {poppedFact.highlight}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!poppedFact && (
        <motion.p
          className="text-center text-[11px] text-slate-600"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          ↑ Click any bubble to explore a DSA fact
        </motion.p>
      )}
    </div>
  );
}



/* ─── Features ─── */
const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Step-by-Step Playback",
    desc: "Pause, rewind, and step through every operation. Each frame comes with a plain-English explanation.",
    accent: "text-indigo-400",
    bg: "from-indigo-500/8 to-indigo-500/0",
    border: "border-indigo-500/20",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Live Code Highlighting",
    desc: "Watch the exact line that executes — in C, C++, or Java — sync'd with the visualizer.",
    accent: "text-purple-400",
    bg: "from-purple-500/8 to-purple-500/0",
    border: "border-purple-500/20",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Compare Mode",
    desc: "Race two algorithms side-by-side. See which wins — and why — in real time.",
    accent: "text-emerald-400",
    bg: "from-emerald-500/8 to-emerald-500/0",
    border: "border-emerald-500/20",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "Linked List Ops",
    desc: "Insert, delete, traverse, and search — fully animated pointer-level visualization.",
    accent: "text-cyan-400",
    bg: "from-cyan-500/8 to-cyan-500/0",
    border: "border-cyan-500/20",
  },
];

/* ─── Subtle grid background ─── */
function GridBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}

/* ─── Main Component ─── */
export default function LandingPage({ onStart }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Brand — exact match to sidebar header */}
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-sm bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Algorithm Visualizer
            </span>
          </div>

          {/* CTA */}
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-200"
          >
            Open Visualizer
          </motion.button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 overflow-hidden">
        <GridBg />

        {/* Ambient blobs — indigo/purple matching sidebar */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        {mounted && (
          <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center py-20">

            {/* ── Left: Text ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Badge — mirrors sidebar header style */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full text-indigo-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Interactive Code Learning
                <span className="ml-1 text-slate-500">·</span>
                <span className="text-slate-400 font-normal">No setup needed</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
              >
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Understand
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Algorithms
                </span>
                <br />
                <span className="text-slate-400 text-4xl lg:text-5xl font-bold">
                  at the code level.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-lg leading-relaxed max-w-lg mb-8"
              >
                Watch every swap, pointer move, and comparison unfold — step by step,
                with the exact line of code highlighted in real time.
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >
                <motion.button
                  onClick={onStart}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(99,102,241,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base rounded-xl shadow-xl shadow-indigo-500/25 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Visualizing
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  {/* Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </motion.button>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free · No login
                </div>
              </motion.div>

              {/* Stats strip — derived from actual data, stays in sync automatically */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex items-center gap-6 flex-wrap"
              >
                {[
                  { label: "Algorithms", value: `${ALGO_COUNT}` },
                  { label: "Languages", value: LANGUAGES.join(" / ") },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                      {s.value}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: UI previews ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <FloatingBubbles onStart={onStart} />
            </motion.div>
          </div>
        )}
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <GridBg />
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Section label — styled like sidebar section headers */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-3">
              What's inside
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Built for{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                real understanding
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Not just animations — every feature is designed to make the "why" click.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`relative p-5 rounded-xl bg-gradient-to-br ${f.bg} border ${f.border} bg-slate-900/60 backdrop-blur-sm group cursor-default`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/50 mb-4 ${f.accent}`}>
                  {f.icon}
                </div>
                <h3 className={`text-sm font-bold mb-2 ${f.accent}`}>{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLEXITY TABLE SNEAK-PEEK ─────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
              Complexity info built in
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Algorithms at a glance
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Every algorithm ships with Big-O data, stability info, and a plain-English description — right in the sidebar.
            </p>
          </motion.div>

          {/* Cards styled exactly like the sidebar info panel cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PREVIEW_ALGOS.map(({ key, accent, border, dot }, i) => {
              const info = complexityInfo[key];
              if (!info) return null;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`p-5 rounded-xl bg-gradient-to-br ${accent} border ${border} bg-slate-900/70 backdrop-blur-sm`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                    <span className="text-sm font-bold text-white">{info.name}</span>
                  </div>

                  {/* Complexity rows — exact sidebar style */}
                  <div className="space-y-2 mb-4">
                    {[
                      { label: "Best", val: info.best, color: "text-emerald-400" },
                      { label: "Average", val: info.average, color: "text-yellow-400" },
                      { label: "Worst", val: info.worst, color: "text-red-400" },
                      { label: "Space", val: info.space, color: "text-blue-400" },
                    ].map(({ label, val, color }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
                        <span className={`text-xs font-bold font-mono ${color}`}>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stable badge */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                      info.stable
                        ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                        : "bg-orange-500/10 border-orange-500/25 text-orange-400"
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {info.stable ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      )}
                    </svg>
                    {info.stable ? "Stable" : "Unstable"}
                  </div>

                  {/* Description excerpt */}
                  <p className="mt-3 text-[11px] text-slate-500 leading-relaxed line-clamp-2 border-l-2 border-slate-700 pl-2.5">
                    {info.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-28 px-4 relative overflow-hidden">
        {/* Gradient sweep — same palette as topbar */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-indigo-600/10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <motion.div
          className="relative z-10 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold bg-indigo-500/10 border border-indigo-500/25 rounded-full text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Ready when you are
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            See algorithms{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              come alive.
            </span>
          </h2>
          <p className="text-slate-400 mb-10">
            Open the visualizer and pick any algorithm to start.
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-indigo-500/30 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Launch Visualizer
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </motion.button>

          <p className="mt-5 text-slate-600 text-xs">
            Built with React · Vite · Framer Motion
          </p>
        </motion.div>
      </section>
    </div>
  );
}
