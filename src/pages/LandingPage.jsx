import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { complexityInfo } from "../utils/complexityInfo";

const features = [
  {
    icon: "⚡",
    title: "Multiple Algorithms",
    desc: "Sorting, Searching & Data Structure operations — all visualized step-by-step",
    color: "from-indigo-500 to-purple-600",
    bg: "from-indigo-500/10 to-purple-600/10",
    border: "border-indigo-500/20",
  },
  {
    icon: "💻",
    title: "Multi-Language",
    desc: "View live code in C, C++, Java and more — with line-by-line execution highlighting",
    color: "from-emerald-500 to-teal-600",
    bg: "from-emerald-500/10 to-teal-600/10",
    border: "border-emerald-500/20",
  },
  {
    icon: "⚖️",
    title: "Compare Mode",
    desc: "Run two algorithms side-by-side and compare their speed and complexity",
    color: "from-orange-500 to-pink-600",
    bg: "from-orange-500/10 to-pink-600/10",
    border: "border-orange-500/20",
  },
  {
    icon: "🎓",
    title: "Step-by-Step",
    desc: "Pause, rewind, and step through every operation with full explanations",
    color: "from-blue-500 to-cyan-600",
    bg: "from-blue-500/10 to-cyan-600/10",
    border: "border-blue-500/20",
  },
];

// Keys in complexityInfo that belong to each visual category
const SORTING_KEYS   = ["bubble", "selection", "insertion", "merge", "quick"];
const SEARCHING_KEYS = ["linear_search", "binary_search"];
const LL_KEYS = [
  "singly_insert_head",
  "singly_insert_tail",
  "singly_insert_pos",
  "singly_delete_head",
  "singly_delete_tail",
  "singly_traversal",
  "singly_search",
];

// Build the category list dynamically from complexityInfo so adding a new
// algorithm to that file automatically shows it here too.
const algorithmCategories = [
  {
    label: "Sorting",
    icon: "🔄",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    items: SORTING_KEYS
      .filter((k) => complexityInfo[k])
      .map((k) => complexityInfo[k].name),
  },
  {
    label: "Searching",
    icon: "🔍",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    items: SEARCHING_KEYS
      .filter((k) => complexityInfo[k])
      .map((k) => complexityInfo[k].name),
  },
  {
    label: "Linked Lists",
    icon: "🔗",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
    items: LL_KEYS
      .filter((k) => complexityInfo[k])
      .map((k) => complexityInfo[k].name),
  },
];

// Floating animated bar in hero
function FloatingBar({ height, delay, color, x }) {
  return (
    <motion.div
      className={`absolute bottom-0 w-6 md:w-8 rounded-t-md ${color} opacity-30`}
      style={{ left: x, height }}
      animate={{ height: [height, height * 0.4, height * 1.2, height] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function LandingPage({ onStart }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const bars = [
    { h: 80, delay: 0, color: "bg-indigo-400", x: "8%" },
    { h: 140, delay: 0.2, color: "bg-purple-400", x: "14%" },
    { h: 60, delay: 0.4, color: "bg-indigo-300", x: "20%" },
    { h: 110, delay: 0.6, color: "bg-blue-400", x: "26%" },
    { h: 180, delay: 0.15, color: "bg-purple-500", x: "32%" },
    { h: 90, delay: 0.35, color: "bg-indigo-400", x: "38%" },
    { h: 130, delay: 0.55, color: "bg-violet-400", x: "44%" },
    { h: 70, delay: 0.75, color: "bg-blue-300", x: "50%" },
    { h: 160, delay: 0.25, color: "bg-purple-400", x: "56%" },
    { h: 100, delay: 0.45, color: "bg-indigo-500", x: "62%" },
    { h: 120, delay: 0.65, color: "bg-violet-500", x: "68%" },
    { h: 50, delay: 0.85, color: "bg-purple-300", x: "74%" },
    { h: 190, delay: 0.1, color: "bg-indigo-400", x: "80%" },
    { h: 85, delay: 0.3, color: "bg-blue-400", x: "86%" },
    { h: 145, delay: 0.5, color: "bg-purple-500", x: "92%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-x-hidden">

      {/* === HERO SECTION === */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated floating bars decoration */}
        <div className="absolute inset-x-0 bottom-0 h-48 overflow-hidden pointer-events-none hidden md:block">
          {bars.map((b, i) => (
            <FloatingBar key={i} height={b.h} delay={b.delay} color={b.color} x={b.x} />
          ))}
        </div>

        {/* Content */}
        {mounted && (
          <motion.div
            className="relative z-10 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Interactive Learning Platform
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
                Visualize
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Algorithms
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent text-5xl md:text-6xl">
                Like Never Before
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Watch algorithms come alive — step by step, with live code highlighting,
              complexity analysis, and side-by-side comparisons.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                onClick={onStart}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-indigo-500/25 transition-all duration-300 overflow-hidden"
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
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </motion.button>

              <span className="text-slate-500 text-sm">No setup needed · Runs in browser</span>
            </motion.div>

          </motion.div>
        )}

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* === FEATURES SECTION === */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Learn DSA
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Built for students who want to truly understand how algorithms work, not just memorize them.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${f.bg} border ${f.border} backdrop-blur-sm group cursor-default`}
              >
                <div className={`text-4xl mb-4`}>{f.icon}</div>
                <h3 className={`text-lg font-bold mb-2 bg-gradient-to-r ${f.color} bg-clip-text text-transparent`}>
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === ALGORITHMS SECTION === */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              All Algorithms at a Glance
            </h2>
            <p className="text-slate-400">
              Click "Start Visualizing" to explore any of these algorithms interactively.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {algorithmCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border bg-slate-900/60 border-slate-800 backdrop-blur-sm`}
              >
                <div className={`flex items-center gap-2 mb-4 ${cat.color}`}>
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="text-lg font-bold">{cat.label}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-300 group"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cat.color.replace("text-", "bg-")} flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-24 px-4 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/50 to-transparent pointer-events-none" />
        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to see algorithms{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              in action?
            </span>
          </h2>
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xl rounded-2xl shadow-2xl shadow-indigo-500/30 transition-all duration-300"
          >
            Launch Visualizer →
          </motion.button>
          <p className="mt-4 text-slate-500 text-sm">
            Built with React · Vite · Framer Motion
          </p>
        </motion.div>
      </section>
    </div>
  );
}
