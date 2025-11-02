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
  const [algorithm2, setAlgorithm2] = useState("merge");
  const [steps1, setSteps1] = useState([]);
  const [steps2, setSteps2] = useState([]);
  const [stepIndex1, setStepIndex1] = useState(0);
  const [stepIndex2, setStepIndex2] = useState(0);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [speed1, setSpeed1] = useState(1000);
  const [speed2, setSpeed2] = useState(1000);
  const [isComparePlaying, setIsComparePlaying] = useState(false);
  const [searchTarget, setSearchTarget] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("visualization");
  const [activeTab1, setActiveTab1] = useState("visualization");
  const [activeTab2, setActiveTab2] = useState("visualization");

  const currentStep = steps.length > 0 ? steps[stepIndex] : null;
  const highlightedLine = currentStep?.line?.[language] ?? 1;

  useEffect(() => {
    const template = codeTemplates[algorithm][language];
    setCode(template);
  }, [algorithm, language]);

  useEffect(() => {
    if (!compareMode) {
      const template = codeTemplates[algorithm][language];
      setCode(template);
    }
  }, [algorithm, language, compareMode]);

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
      setIsComparePlaying(false);
    },
    [originalArray]
  );

  useEffect(() => {
    resetAnimation();
  }, [compareMode, algorithm, algorithm1, algorithm2, inputArray]);

  useEffect(() => {
    if (!compareMode) {
      setAlgorithm(algorithm1);
    }
  }, [compareMode]);

  useEffect(() => {
    if (compareMode || !isPlaying || stepIndex >= steps.length - 1) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        setIsPlaying(false);
        return prev;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, stepIndex, steps, compareMode, speed]);

  useEffect(() => {
    if (!compareMode || !isComparePlaying) return;

    const interval1 = setInterval(() => {
      setStepIndex1((prev) => {
        if (prev < steps1.length - 1) return prev + 1;
        return prev;
      });
    }, speed1);

    const interval2 = setInterval(() => {
      setStepIndex2((prev) => {
        if (prev < steps2.length - 1) return prev + 1;
        return prev;
      });
    }, speed2);

    // Stop when both algorithms finish
    if (stepIndex1 >= steps1.length - 1 && stepIndex2 >= steps2.length - 1) {
      setIsComparePlaying(false);
    }

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [
    isComparePlaying,
    stepIndex1,
    stepIndex2,
    steps1,
    steps2,
    compareMode,
    speed1,
    speed2,
  ]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
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

      <div className="flex flex-col flex-1 min-w-0 lg:ml-0">
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
          <div className="w-10" />
        </div>

        <Topbar />

        <div className="flex flex-1 overflow-hidden">
          {compareMode ? (
            <div className="flex flex-col lg:flex-row w-full min-h-0 overflow-y-auto lg:overflow-y-hidden">
              {/* First Algorithm Section */}
              <div className="flex flex-1 min-w-0 flex-col lg:min-h-0 lg:flex-row">
                {/* Mobile: Tabbed Interface */}
                <div className="lg:hidden w-full flex flex-col h-96">
                  <div className="flex border-b border-gray-200 bg-white">
                    <button
                      onClick={() => setActiveTab1("visualization")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab1 === "visualization"
                          ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      📊 Visualization
                    </button>
                    <button
                      onClick={() => setActiveTab1("code")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab1 === "code"
                          ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      💻 Code
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {activeTab1 === "code" ? (
                      <CodeEditor
                        code={codeTemplates[algorithm1][language]}
                        setCode={setCode}
                        language={language}
                        highlightedLine={
                          steps1[stepIndex1]?.line?.[language] ?? 1
                        }
                      />
                    ) : (
                      <Visualizer
                        step={steps1[stepIndex1]}
                        stepIndex={stepIndex1}
                        algorithm={algorithm1}
                      />
                    )}
                  </div>
                </div>

                {/* Desktop: Side by Side */}
                <div className="hidden lg:block lg:w-1/2 min-w-0 lg:h-auto">
                  <CodeEditor
                    code={codeTemplates[algorithm1][language]}
                    setCode={setCode}
                    language={language}
                    highlightedLine={steps1[stepIndex1]?.line?.[language] ?? 1}
                  />
                </div>
                <div className="hidden lg:block lg:w-1/2 min-w-0 lg:h-auto">
                  <Visualizer
                    step={steps1[stepIndex1]}
                    stepIndex={stepIndex1}
                    algorithm={algorithm1}
                  />
                </div>
              </div>

              <div className="hidden lg:block w-px bg-gray-300 flex-shrink-0 mx-1"></div>
              <div className="block lg:hidden h-px bg-gray-300 flex-shrink-0 my-2"></div>

              {/* Second Algorithm Section */}
              <div className="flex flex-1 min-w-0 flex-col lg:min-h-0 lg:flex-row">
                {/* Mobile: Tabbed Interface */}
                <div className="lg:hidden w-full flex flex-col h-96">
                  <div className="flex border-b border-gray-200 bg-white">
                    <button
                      onClick={() => setActiveTab2("visualization")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab2 === "visualization"
                          ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      📊 Visualization
                    </button>
                    <button
                      onClick={() => setActiveTab2("code")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab2 === "code"
                          ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      💻 Code
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {activeTab2 === "code" ? (
                      <CodeEditor
                        code={codeTemplates[algorithm2][language]}
                        setCode={setCode}
                        language={language}
                        highlightedLine={
                          steps2[stepIndex2]?.line?.[language] ?? 1
                        }
                      />
                    ) : (
                      <Visualizer
                        step={steps2[stepIndex2]}
                        stepIndex={stepIndex2}
                        algorithm={algorithm2}
                      />
                    )}
                  </div>
                </div>

                {/* Desktop: Side by Side */}
                <div className="hidden lg:block lg:w-1/2 min-w-0 lg:h-auto">
                  <CodeEditor
                    code={codeTemplates[algorithm2][language]}
                    setCode={setCode}
                    language={language}
                    highlightedLine={steps2[stepIndex2]?.line?.[language] ?? 1}
                  />
                </div>
                <div className="hidden lg:block lg:w-1/2 min-w-0 lg:h-auto">
                  <Visualizer
                    step={steps2[stepIndex2]}
                    stepIndex={stepIndex2}
                    algorithm={algorithm2}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full overflow-hidden">
              {/* Mobile: Tabbed Interface */}
              <div className="lg:hidden w-full flex flex-col flex-1">
                <div className="flex border-b border-gray-200 bg-white flex-shrink-0">
                  <button
                    onClick={() => setActiveTab("visualization")}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "visualization"
                        ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    📊 Visualization
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "code"
                        ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    💻 Code
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  {activeTab === "code" ? (
                    <CodeEditor
                      code={code}
                      setCode={setCode}
                      language={language}
                      highlightedLine={highlightedLine}
                    />
                  ) : (
                    <Visualizer
                      step={steps[stepIndex]}
                      algorithm={algorithm}
                      stepIndex={stepIndex}
                    />
                  )}
                </div>
              </div>

              {/* Desktop: Side by Side */}
              <div className="hidden lg:block lg:w-1/2 min-w-0">
                <CodeEditor
                  code={code}
                  setCode={setCode}
                  language={language}
                  highlightedLine={highlightedLine}
                />
              </div>
              <div className="hidden lg:block lg:w-1/2 min-w-0">
                <Visualizer
                  step={steps[stepIndex]}
                  algorithm={algorithm}
                  stepIndex={stepIndex}
                />
              </div>
            </div>
          )}
        </div>

        {/* Controls Section */}
        {compareMode ? (
          <div className="flex-shrink-0 bg-gray-200">
            {/* Synced Single Control for Compare Mode */}
            <Controls
              isCompareMode={true}
              algorithm1={algorithm1}
              algorithm2={algorithm2}
              stepIndex1={stepIndex1}
              stepIndex2={stepIndex2}
              steps1={steps1}
              steps2={steps2}
              isPlaying={isComparePlaying}
              setIsPlaying={setIsComparePlaying}
              speed={speed1}
              setSpeed={(val) => {
                setSpeed1(val);
                setSpeed2(val);
              }}
              onReset={resetAnimation}
            />
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
              algorithm1={algorithm}
            />
          </div>
        )}
      </div>
    </div>
  );
}
