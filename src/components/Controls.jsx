import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Zap,
  Clock,
} from "lucide-react";

export default function Controls({
  stepIndex,
  setStepIndex,
  steps,
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
  label,
  onReset,
  isComparePlaying,
  isGlobal = false,
}) {
  function handleReset() {
    setIsPlaying(false);
    setStepIndex(0);
    if (onReset) onReset();
  }

  const progress =
    steps.length > 0 ? (stepIndex / (steps.length - 1)) * 100 : 0;

  return (
    <div className="flex-1 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 shadow-sm mx-1">
      {label && (
        <div className="text-center font-semibold text-slate-700 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-200">
          <span className="text-sm">{label}</span>
        </div>
      )}

      <div className="px-3 py-2">
        {/* Progress Bar - Only show if not global control */}
        {!isGlobal && (
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-slate-600">
                Step {stepIndex + 1} of {steps.length}
              </span>
              <span className="text-xs text-slate-500">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-col gap-2">
          {/* Play/Pause and Navigation Buttons */}
          <div className="flex items-center justify-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={isGlobal && isComparePlaying}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm text-sm ${
                isPlaying
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                  : "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause size={14} />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>Play</span>
                </>
              )}
            </button>

            {/* Previous Button - Only show for individual algorithm controls */}
            {!isGlobal && (
              <button
                onClick={() => {
                  if (stepIndex > 0) {
                    setStepIndex(stepIndex - 1);
                  }
                }}
                disabled={isPlaying || stepIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm text-sm"
              >
                <SkipBack size={14} />
                <span>Prev</span>
              </button>
            )}

            {/* Next Button - Only show for individual algorithm controls */}
            {!isGlobal && (
              <button
                onClick={() => {
                  if (stepIndex < steps.length - 1) {
                    setStepIndex(stepIndex + 1);
                  }
                }}
                disabled={isPlaying || stepIndex >= steps.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm text-sm"
              >
                <SkipForward size={14} />
                <span>Next</span>
              </button>
            )}

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-md font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm text-sm"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center justify-center gap-2 bg-white rounded-md px-3 py-1.5 shadow-inner border border-slate-200">
            <div className="flex items-center gap-1 text-slate-600">
              <Zap size={14} />
              <span className="text-xs font-medium">Speed:</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${
                    ((2000 - speed) / 1900) * 100
                  }%, #e2e8f0 ${((2000 - speed) / 1900) * 100}%, #e2e8f0 100%)`,
                }}
              />
              <div className="flex items-center gap-1 min-w-[3rem]">
                <Clock size={12} className="text-slate-500" />
                <span className="text-xs font-medium text-slate-700">
                  {speed}ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
