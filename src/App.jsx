import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/topbar";
import CodeEditor from "./components/CodeEditor";
import Visualizer from "./components/Visualizer";
import Controls from "./components/Controls";
import {
  parseBubbleSort,
  parseSelectionSort,
  parseMergeSort,
  parseInsertionSort,
  parseQuickSort,
  parseSinglyInsertHead,
  parseLinearSearch,
  parseBinarySearch,
} from "./utils/parseAlgorithms";
import codeTemplates from "./utils/codeTemplates";
import { Menu, X } from "lucide-react";

export default function App() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [inputArrayStr, setInputArrayStr] = useState("5, 3, 8, 4, 2");
  const [inputArray, setInputArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [algorithm1, setAlgorithm1] = useState("bubble");
  const [algorithm2, setAlgorithm2] = useState("merge"); // default comparison
  const [steps1, setSteps1] = useState([]);
  const [steps2, setSteps2] = useState([]);
  const [stepIndex1, setStepIndex1] = useState(0);
  const [stepIndex2, setStepIndex2] = useState(0);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [speed1, setSpeed1] = useState(1000);
  const [speed2, setSpeed2] = useState(1000);
  const [isComparePlaying, setIsComparePlaying] = useState(false);
  const [searchTarget, setSearchTarget] = useState(null); // default target value
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentStep = steps.length > 0 ? steps[stepIndex] : null;
  // Fix: Change 'lines' to 'line' and provide better fallback
  const highlightedLine = currentStep?.line?.[language] ?? 1;

  useEffect(() => {
    const template = codeTemplates[algorithm][language];
    setCode(template);
  }, [algorithm, language]);

  // Update code template on algorithm or language change (default mode only)
  useEffect(() => {
    if (!compareMode) {
      const template = codeTemplates[algorithm][language];
      setCode(template);
    }
  }, [algorithm, language, compareMode]);

  // Parse input array string into actual number array
  useEffect(() => {
    const arr = inputArrayStr
      .split(",")
      .map((num, i) => {
        const value = parseInt(num.trim());
        return !isNaN(value) ? { id: `${i}-${value}`, value } : null;
      })
      .filter(Boolean);

    setInputArray(arr);
    setOriginalArray(arr);
  }, [inputArrayStr]);

  // Parse sorting steps based on current algorithms and mode
  useEffect(() => {
    const parseMap = {
      bubble: parseBubbleSort,
      selection: parseSelectionSort,
      merge: parseMergeSort,
      insertion: parseInsertionSort,
      quick: parseQuickSort,
      singly_insert_head: parseSinglyInsertHead,
      linear_search: parseLinearSearch,
      binary_search: parseBinarySearch,
    };

    let parsed1 = [],
      parsed2 = [],
      parsed = [];

    if (["linear_search", "binary_search"].includes(algorithm1)) {
      parsed1 =
        searchTarget != null
          ? parseMap[algorithm1](inputArray, searchTarget)
          : [];
    } else {
      parsed1 = parseMap[algorithm1](inputArray);
    }

    if (["linear_search", "binary_search"].includes(algorithm2)) {
      parsed2 =
        searchTarget != null
          ? parseMap[algorithm2](inputArray, searchTarget)
          : [];
    } else {
      parsed2 = parseMap[algorithm2](inputArray);
    }

    if (["linear_search", "binary_search"].includes(algorithm)) {
      parsed =
        searchTarget != null
          ? parseMap[algorithm](inputArray, searchTarget)
          : [];
    } else {
      parsed = parseMap[algorithm](inputArray);
    }

    setSteps(parsed);
    setSteps1(parsed1);
    setSteps2(parsed2);
  }, [
    algorithm,
    algorithm1,
    algorithm2,
    inputArray,
    compareMode,
    searchTarget,
  ]);

  const resetAnimation = useCallback(
    (step = 0) => {
      setInputArray(originalArray);
      setStepIndex(step);
      setStepIndex1(step);
      setStepIndex2(step);
      setIsPlaying(false);
      setIsPlaying1(false);
      setIsPlaying2(false);
    },
    [originalArray]
  );

  useEffect(() => {
    resetAnimation();
  }, [compareMode, algorithm, algorithm1, algorithm2, inputArray]);

  // Sync main algorithm back when Compare Mode is turned off
  useEffect(() => {
    if (!compareMode) {
      setAlgorithm(algorithm1);
    }
  }, [compareMode]);

  // Animate default mode
  useEffect(() => {
    if (compareMode || !isPlaying || stepIndex >= steps.length - 1) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, stepIndex, steps, compareMode, speed]);

  // Animate Algorithm 1 (Compare Mode)
  useEffect(() => {
    if (!compareMode || !isPlaying1 || stepIndex1 >= steps1.length - 1) return;

    const interval1 = setInterval(() => {
      setStepIndex1((prev) => {
        if (prev < steps1.length - 1) return prev + 1;
        clearInterval(interval1);
        return prev;
      });
    }, speed1);

    return () => clearInterval(interval1);
  }, [isPlaying1, stepIndex1, steps1, compareMode, speed1]);

  // Animate Algorithm 2 (Compare Mode)
  useEffect(() => {
    if (!compareMode || !isPlaying2 || stepIndex2 >= steps2.length - 1) return;

    const interval2 = setInterval(() => {
      setStepIndex2((prev) => {
        if (prev < steps2.length - 1) return prev + 1;
        clearInterval(interval2);
        return prev;
      });
    }, speed2);

    return () => clearInterval(interval2);
  }, [isPlaying2, stepIndex2, steps2, compareMode, speed2]);

  useEffect(() => {
    if (compareMode) {
      setIsPlaying1(isComparePlaying);
      setIsPlaying2(isComparePlaying);
    }
  }, [isComparePlaying, compareMode]);

  useEffect(() => {
    if (currentStep && currentStep.line) {
      console.log("🔍 Step line object:", currentStep.line);
      console.log("📌 Highlighted line:", highlightedLine);
    } else {
      console.log("⛔ Step or line not available yet");
    }
  }, [currentStep, highlightedLine]);

  console.log("📌 Highlighted line:", highlightedLine);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar - responsive */}
      <Sidebar
        language={language}
        setLanguage={setLanguage}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        inputArrayStr={inputArrayStr}
        setInputArrayStr={setInputArrayStr}
        compareMode={compareMode}
        setCompareMode={setCompareMode}
        algorithm1={algorithm1}
        setAlgorithm1={setAlgorithm1}
        algorithm2={algorithm2}
        setAlgorithm2={setAlgorithm2}
        searchTarget={searchTarget}
        setSearchTarget={setSearchTarget}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 lg:ml-0">
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Algorithm Visualizer
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <Topbar />

        {/* Content Area - responsive layout */}
        <div className="flex flex-1 overflow-hidden">
          {compareMode ? (
            <div className="flex flex-col lg:flex-row w-full min-h-0 overflow-y-auto lg:overflow-y-hidden">
              {/* First Algorithm Section */}
              <div className="flex flex-1 min-w-0 flex-col md:flex-row lg:min-h-0">
                <div className="w-full md:w-1/2 min-w-0 h-40 sm:h-48 md:h-auto">
                  <CodeEditor
                    code={codeTemplates[algorithm1][language]}
                    setCode={setCode}
                    language={language}
                    highlightedLine={steps1[stepIndex1]?.line?.[language] ?? 1}
                  />
                </div>
                <div className="w-full md:w-1/2 min-w-0 h-40 sm:h-48 md:h-auto">
                  <Visualizer
                    step={steps1[stepIndex1]}
                    stepIndex={stepIndex1}
                    algorithm={algorithm1}
                  />
                </div>
              </div>

              {/* Divider - responsive */}
              <div className="hidden lg:block w-px bg-gray-300 flex-shrink-0 mx-1"></div>
              <div className="block lg:hidden h-px bg-gray-300 flex-shrink-0 my-2"></div>

              {/* Second Algorithm Section */}
              <div className="flex flex-1 min-w-0 flex-col md:flex-row lg:min-h-0">
                <div className="w-full md:w-1/2 min-w-0 h-40 sm:h-48 md:h-auto">
                  <CodeEditor
                    code={codeTemplates[algorithm2][language]}
                    setCode={setCode}
                    language={language}
                    highlightedLine={steps2[stepIndex2]?.line?.[language] ?? 1}
                  />
                </div>
                <div className="w-full md:w-1/2 min-w-0 h-40 sm:h-48 md:h-auto">
                  <Visualizer
                    step={steps2[stepIndex2]}
                    stepIndex={stepIndex2}
                    algorithm={algorithm2}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row w-full">
              <div className="w-full lg:w-1/2 min-w-0 h-64 lg:h-auto">
                <CodeEditor
                  code={code}
                  setCode={setCode}
                  language={language}
                  highlightedLine={highlightedLine}
                />
              </div>
              <div className="w-full lg:w-1/2 min-w-0 h-64 lg:h-auto">
                <Visualizer
                  step={steps[stepIndex]}
                  algorithm={algorithm}
                  stepIndex={stepIndex}
                />
              </div>
            </div>
          )}
        </div>

        {/* Controls Section - responsive */}
        {compareMode ? (
          <div className="flex-shrink-0 bg-gray-200">
            {/* Individual Algorithm Controls */}
            <div className="flex flex-col md:flex-row items-stretch py-2 gap-2 px-2">
              <div className="flex-1">
                <Controls
                  stepIndex={stepIndex1}
                  setStepIndex={setStepIndex1}
                  steps={steps1}
                  isPlaying={isPlaying1}
                  setIsPlaying={setIsPlaying1}
                  speed={speed1}
                  setSpeed={setSpeed1}
                  label={`Algorithm 1: ${algorithm1}`}
                  onReset={() => {
                    setStepIndex1(0);
                    setIsPlaying1(false);
                  }}
                  isComparePlaying={isComparePlaying}
                />
              </div>
              <div className="flex-1">
                <Controls
                  stepIndex={stepIndex2}
                  setStepIndex={setStepIndex2}
                  steps={steps2}
                  isPlaying={isPlaying2}
                  setIsPlaying={setIsPlaying2}
                  speed={speed2}
                  setSpeed={setSpeed2}
                  label={`Algorithm 2: ${algorithm2}`}
                  onReset={() => {
                    setStepIndex2(0);
                    setIsPlaying2(false);
                  }}
                  isComparePlaying={isComparePlaying}
                />
              </div>
            </div>

            {/* Global Control */}
            <div className="w-full flex justify-center px-4 pb-4">
              <div className="w-full max-w-md">
                <Controls
                  label="Global Control"
                  isPlaying={isComparePlaying}
                  setIsPlaying={setIsComparePlaying}
                  steps={[]}
                  stepIndex={0}
                  setStepIndex={() => {}}
                  onReset={resetAnimation}
                  speed={Math.min(speed1, speed2)}
                  setSpeed={(val) => {
                    setSpeed1(val);
                    setSpeed2(val);
                  }}
                  isComparePlaying={false}
                  isGlobal={true}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-shrink-0 px-2 py-2">
            <Controls
              stepIndex={stepIndex}
              setStepIndex={setStepIndex}
              steps={steps}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              speed={speed}
              setSpeed={setSpeed}
              onReset={resetAnimation}
            />
          </div>
        )}
      </div>
    </div>
  );
}
