// utils/complexityInfo.js

export const complexityInfo = {
  bubble: {
    name: "Bubble Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  selection: {
    name: "Selection Sort",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  insertion: {
    name: "Insertion Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  merge: {
    name: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
  },
  quick: {
    name: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
  },
  linear: {
    name: "Linear Search",
    best: "O(1)",
    average: "O(n)",
    worst: "O(n)",
    space: "O(1)",
  },
  binary: {
    name: "Binary Search",
    best: "O(1)",
    average: "O(log n)",
    worst: "O(log n)",
    space: "O(1)",
  },
};
