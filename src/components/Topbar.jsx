// export default function Topbar() {
//   return (
//     <div className="bg-white shadow px-4 py-2">
//       <h1 className="text-2xl font-semibold">Visualize your algorithms in real time 🚀</h1>
//     </div>
//   );
// }
export default function Topbar() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg px-6 py-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo/Icon */}
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Visualize your algorithms
            </h1>
            <p className="text-blue-100 text-sm mt-1 hidden md:block">
              Watch your code come to life in real time
            </p>
          </div>
        </div>

        {/* Rocket icon with animation */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl animate-bounce">🚀</div>
          <div className="hidden md:flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Subtle bottom border with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  );
}
