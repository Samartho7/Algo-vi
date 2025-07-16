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
} from "./utils/parseAlgorithms";
import codeTemplates from "./utils/codeTemplates";

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
    };

    if (compareMode) {
      const parsed1 = parseMap[algorithm1](inputArray);
      const parsed2 = parseMap[algorithm2](inputArray);
      setSteps1(parsed1);
      setSteps2(parsed2);
    } else {
      const parsed = parseMap[algorithm](inputArray);
      setSteps(parsed);
    }
  }, [algorithm, algorithm1, algorithm2, inputArray, compareMode]);

  

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
      />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          {compareMode ? (
            <>
              {/* First Algorithm Section */}
              <div className="flex flex-1 min-w-0">
                <div className="w-1/2 min-w-0">
                  <CodeEditor
                    code={codeTemplates[algorithm1][language]}
                    setCode={setCode}
                    language={language}
                    highlightedLine={steps1[stepIndex1]?.line?.[language] ?? 1}
                  />
                </div>
                <div className="w-1/2 min-w-0">
                  <Visualizer
                    // key={`algo1-${algorithm1}-${stepIndex1}`}
                    step={steps1[stepIndex1]}
                    stepIndex={stepIndex1}
                    algorithm={algorithm1}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="w-px bg-gray-300 flex-shrink-0"></div>

              {/* Second Algorithm Section */}
              <div className="flex flex-1 min-w-0">
                <div className="w-1/2 min-w-0">
                  <CodeEditor
                    code={codeTemplates[algorithm2][language]}
                    setCode={setCode}
                    language={language}
                    highlightedLine={steps2[stepIndex2]?.line?.[language] ?? 1}
                  />
                </div>
                <div className="w-1/2 min-w-0">
                  <Visualizer
                    // key={`algo2-${algorithm2}-${stepIndex2}`}
                    step={steps2[stepIndex2]}
                    stepIndex={stepIndex2}
                    algorithm={algorithm2}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-1/2 min-w-0">
                <CodeEditor
                  code={code}
                  setCode={setCode}
                  language={language}
                  highlightedLine={highlightedLine}
                />
              </div>
              <div className="w-1/2 min-w-0">
                <Visualizer
                  step={steps[stepIndex]}
                  algorithm={algorithm}
                  stepIndex={stepIndex}
                  // key={`single-${algorithm}-${stepIndex}`}
                />
              </div>
            </>
          )}
        </div>
        {compareMode ? (
          <>
            <div className="flex items-stretch py-2 gap-2 bg-gray-200 flex-shrink-0 px-2">
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
            <div className="w-full flex justify-center px-4 pb-4">
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
          </>
        ) : (
          <div className="flex-shrink-0">
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
