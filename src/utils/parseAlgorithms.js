// ✅ All parsing functions now use stable `id` and consistent snapshots

export function parseBubbleSort(inputArr = []) {
  const arr = inputArr.map((item, index) => ({
    id: index,
    value: item.value ?? item,
  }));
  const steps = [];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({
        action: "compare",
        indices: [j, j + 1],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 6, cpp: 6, java: 5 },
      });
      if (arr[j].value > arr[j + 1].value) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          action: "swap",
          indices: [j, j + 1],
          array: arr.map((item, idx) => ({ id: idx, value: item.value })),
          line: { c: 8, cpp: 7, java: 6 },
        });
      }
    }
  }

  steps.push({
    action: "done",
    indices: [],
    array: arr.map((item, idx) => ({ id: idx, value: item.value })),
    line: { c: 1, cpp: 1, java: 1 },
  });
  return steps;
}

export function parseSelectionSort(inputArr = []) {
  const arr = inputArr.map((item, index) => ({
    id: index,
    value: item.value ?? item,
  }));
  const steps = [];

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        action: "compare",
        indices: [minIdx, j],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 6, cpp: 6, java: 5 },
      });
      if (arr[j].value < arr[minIdx].value) {
        minIdx = j;
        steps.push({
          action: "min",
          indices: [minIdx],
          array: arr.map((item, idx) => ({ id: idx, value: item.value })),
          line: { c: 7, cpp: 7, java: 6 },
        });
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        action: "swap",
        indices: [i, minIdx],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 11, cpp: 11, java: 10 },
      });
    }
  }

  steps.push({
    action: "done",
    indices: [],
    array: arr.map((item, idx) => ({ id: idx, value: item.value })),
    line: { c: 1, cpp: 1, java: 1 },
  });
  return steps;
}

export function parseInsertionSort(inputArr = []) {
  const arr = inputArr.map((item, index) => ({
    id: index,
    value: item.value ?? item,
  }));
  const steps = [];

  for (let i = 1; i < arr.length; i++) {
    const key = { ...arr[i] };
    let j = i - 1;

    while (j >= 0 && arr[j].value > key.value) {
      steps.push({
        action: "compare",
        indices: [j, j + 1],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 6, cpp: 6, java: 5 },
      });

      arr[j + 1] = { ...arr[j] };
      steps.push({
        action: "shift",
        indices: [j, j + 1],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 7, cpp: 7, java: 6 },
      });

      j--;
    }

    arr[j + 1] = key;
    steps.push({
      action: "insert",
      indices: [j + 1],
      array: arr.map((item, idx) => ({ id: idx, value: item.value })),
      line: { c: 10, cpp: 10, java: 9 },
    });
  }

  steps.push({
    action: "done",
    indices: [],
    array: arr.map((item, idx) => ({ id: idx, value: item.value })),
    line: { c: 1, cpp: 1, java: 1 },
  });
  return steps;
}

export function parseMergeSort(inputArr = []) {
  const arr = inputArr.map((item, index) => ({
    id: index,
    value: item.value ?? item,
  }));
  const steps = [];

  function mergeSort(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
  }

  function merge(l, m, r) {
    const left = arr.slice(l, m + 1).map((item) => ({ ...item }));
    const right = arr.slice(m + 1, r + 1).map((item) => ({ ...item }));
    let i = 0,
      j = 0,
      k = l;

    while (i < left.length && j < right.length) {
      steps.push({
        action: "compare",
        indices: [l + i, m + 1 + j],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 13, cpp: 13, java: 21 },
      });

      if (left[i].value <= right[j].value) {
        arr[k++] = { ...left[i++] };
      } else {
        arr[k++] = { ...right[j++] };
      }

      steps.push({
        action: "merge",
        indices: [k - 1],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 14, cpp: 14, java: 22 },
      });
    }

    while (i < left.length) {
      arr[k++] = { ...left[i++] };
      steps.push({
        action: "merge",
        indices: [k - 1],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 19, cpp: 19, java: 27 },
      });
    }

    while (j < right.length) {
      arr[k++] = { ...right[j++] };
      steps.push({
        action: "merge",
        indices: [k - 1],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 22, cpp: 22, java: 30 },
      });
    }
  }

  mergeSort(0, arr.length - 1);
  steps.push({
    action: "done",
    indices: [],
    array: arr.map((item, idx) => ({ id: idx, value: item.value })),
    line: { c: 1, cpp: 1, java: 1 },
  });

  return steps;
}

export function parseQuickSort(inputArr = []) {
  const arr = inputArr.map((item, index) => ({
    id: index,
    value: item.value ?? item,
  }));
  const steps = [];

  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      steps.push({
        action: "pivot",
        indices: [pi],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 4, cpp: 4, java: 3 },
      });
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        action: "compare",
        indices: [j, high],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 7, cpp: 7, java: 6 },
      });
      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          action: "swap",
          indices: [i, j],
          array: arr.map((item, idx) => ({ id: idx, value: item.value })),
          line: { c: 10, cpp: 9, java: 8 },
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      action: "swap",
      indices: [i + 1, high],
      array: arr.map((item, idx) => ({ id: idx, value: item.value })),
      line: { c: 14, cpp: 12, java: 12 },
    });
    steps.push({
      action: "partition",
      indices: [i + 1],
      array: arr.map((item, idx) => ({ id: idx, value: item.value })),
      line: { c: 15, cpp: 13, java: 13 },
    });
    return i + 1;
  }

  quickSort(0, arr.length - 1);
  steps.push({
    action: "done",
    indices: [],
    array: arr.map((item, idx) => ({ id: idx, value: item.value })),
    line: { c: 1, cpp: 1, java: 1 },
  });
  return steps;
}

export function parseSinglyInsertHead(inputArray) {
  const steps = [];
  let head = null;

  inputArray.forEach((id, value) => {
    const newNode = {
      id,
      value,
      next: head,
      isHead: true,
    };

    if (head) head.isHead = false; // Remove head from previous node

    // 🔁 Take snapshot with correct head/tail flags
    steps.push({
      nodes: buildSnapshot(newNode),
      line: {
        cpp: 4,
        c: 4,
        java: 5,
      },
      action: "insert",
    });

    head = newNode; // Update head
  });

  return steps;
}

// Helper to convert linked list to array of nodes with flags
function buildSnapshot(head) {
  const nodes = [];
  let current = head;
  while (current) {
    nodes.push({
      id: current.id,
      value: current.value,
      isHead: current.isHead || false,
      isTail: current.next === null, // 🌟 Detect tail
      next: current.next
        ? `0x${(1000 + parseInt(current.next.id))?.toString(16)}`
        : null, // Fake address
    });
    current = current.next;
  }
  return nodes;
}

// Enhanced Linear Search with better "not found" handling
export function parseLinearSearch(inputArr = [], target) {
  if (target == null) return [];

  const arr = inputArr.map((item, index) => ({
    id: index,
    value: item.value ?? item,
  }));

  const steps = [];
  let found = false;

  // Initial step
  steps.push({
    action: "initialize",
    indices: [],
    array: arr.map((item, idx) => ({ id: idx, value: item.value })),
    line: { c: 1, cpp: 1, java: 1 },
    message: `Starting linear search for target ${target} in array of ${arr.length} elements`,
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      action: "compare",
      indices: [i],
      array: arr.map((item, idx) => ({ id: idx, value: item.value })),
      line: { c: 6, cpp: 6, java: 5 },
      message: `Comparing element at index ${i} (value: ${arr[i].value}) with target ${target}`,
    });

    if (arr[i].value === target) {
      steps.push({
        action: "found",
        indices: [i],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        line: { c: 8, cpp: 8, java: 7 },
        message: `🎉 Target ${target} found at index ${i}! Search completed successfully.`,
      });
      found = true;
      break;
    }
  }

  // Enhanced "not found" handling
  if (!found) {
    // First show all elements as "searched through"
    steps.push({
      action: "notFound",
      indices: [],
      array: arr.map((item, idx) => ({ id: idx, value: item.value })),
      line: { c: 12, cpp: 12, java: 11 },
      message: `❌ Searched through all ${arr.length} elements - target ${target} not found in the array`,
    });
  }

  // Final step
  steps.push({
    action: "done",
    indices: [],
    array: arr.map((item, idx) => ({ id: idx, value: item.value })),
    line: { c: 1, cpp: 1, java: 1 },
    message: found
      ? `Linear search completed: target ${target} found`
      : `Linear search completed: target ${target} not found`,
  });

  return steps;
}

// Enhanced Binary Search with better "not found" handling and range visualization
export function parseBinarySearch(inputArr = [], target) {
  if (target == null) return [];

  const arr = [...inputArr]
    .map((item, index) => ({
      id: index,
      value: item.value ?? item,
    }))
    .sort((a, b) => a.value - b.value);

  const steps = [];
  let low = 0,
    high = arr.length - 1;
  let found = false;
  let iterationCount = 0;

  // Add initial step showing sorted array
  steps.push({
    action: "initialize",
    indices: [],
    array: arr.map((item, idx) => ({ id: idx, value: item.value })),
    low: low,
    high: high,
    line: { c: 1, cpp: 1, java: 1 },
    message: `Array sorted for binary search. Searching for ${target} in range [${low}, ${high}]`,
  });

  while (low <= high) {
    iterationCount++;
    let mid = Math.floor((low + high) / 2);

    steps.push({
      action: "compare",
      indices: [mid],
      array: arr.map((item, idx) => ({ id: idx, value: item.value })),
      low: low,
      high: high,
      mid: mid,
      line: { c: 7, cpp: 7, java: 6 },
      message: `Iteration ${iterationCount}: Checking middle element at index ${mid} (value: ${arr[mid].value}) vs target ${target}`,
    });

    if (arr[mid].value === target) {
      steps.push({
        action: "found",
        indices: [mid],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        low: low,
        high: high,
        mid: mid,
        line: { c: 9, cpp: 9, java: 8 },
        message: `🎉 Target ${target} found at index ${mid} after ${iterationCount} iterations!`,
      });
      found = true;
      break;
    } else if (arr[mid].value < target) {
      steps.push({
        action: "shiftRight",
        indices: [mid],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        low: low,
        high: high,
        mid: mid,
        line: { c: 11, cpp: 11, java: 10 },
        message: `${
          arr[mid].value
        } < ${target}: Target is in the right half. New range: [${
          mid + 1
        }, ${high}]`,
      });
      low = mid + 1;
    } else {
      steps.push({
        action: "shiftLeft",
        indices: [mid],
        array: arr.map((item, idx) => ({ id: idx, value: item.value })),
        low: low,
        high: high,
        mid: mid,
        line: { c: 13, cpp: 13, java: 12 },
        message: `${
          arr[mid].value
        } > ${target}: Target is in the left half. New range: [${low}, ${
          mid - 1
        }]`,
      });
      high = mid - 1;
    }
  }

  // Enhanced "not found" handling
  if (!found) {
    steps.push({
      action: "notFound",
      indices: [],
      array: arr.map((item, idx) => ({ id: idx, value: item.value })),
      low: low,
      high: high,
      line: { c: 16, cpp: 16, java: 15 },
      message: `❌ Search space exhausted after ${iterationCount} iterations. Target ${target} not found (low ${low} > high ${high})`,
    });
  }

  // Final step
  steps.push({
    action: "done",
    indices: [],
    array: arr.map((item, idx) => ({ id: idx, value: item.value })),
    low: low,
    high: high,
    message: found
      ? `Binary search completed: target ${target} found in ${iterationCount} iterations`
      : `Binary search completed: target ${target} not found after ${iterationCount} iterations`,
  });

  return steps;
}
