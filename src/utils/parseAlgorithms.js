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

export function parseLinkedListTraversal(inputArray) {
  if (!inputArray || inputArray.length === 0) return [];

  const steps = [];

  // Build the linked list internal structure from the input array values
  const values = inputArray.map((item) => item.value ?? item);

  // Build node objects
  const nodes = values.map((val, idx) => ({
    id: `trav-${idx}`,
    value: val,
    isHead: idx === 0,
    isTail: idx === values.length - 1,
    next: idx < values.length - 1 ? `0x${(1000 + idx + 1).toString(16)}` : null,
  }));

  // Step 1: Initial state — all nodes unvisited, curr at head
  steps.push({
    nodes: nodes.map((n, i) => ({
      ...n,
      isCurrent: i === 0,
      isVisited: false,
    })),
    currentIndex: 0,
    visitedCount: 0,
    action: "start",
    message: `Traversal starts at HEAD (value: ${nodes[0].value})`,
    line: { cpp: 3, c: 3, java: 4 },
  });

  // Step 2+: Visit each node
  for (let i = 0; i < nodes.length; i++) {
    // Mark i as visiting, 0..i-1 as visited
    steps.push({
      nodes: nodes.map((n, idx) => ({
        ...n,
        isCurrent: idx === i,
        isVisited: idx < i,
      })),
      currentIndex: i,
      visitedCount: i,
      action: "visit",
      message: `Visiting node ${i + 1}/${nodes.length} — value: ${nodes[i].value}${nodes[i].isHead ? " (HEAD)" : ""}${nodes[i].isTail ? " (TAIL)" : ""}`,
      line: { cpp: 5, c: 5, java: 6 },
    });

    // Move-to-next step (if not tail)
    if (i < nodes.length - 1) {
      steps.push({
        nodes: nodes.map((n, idx) => ({
          ...n,
          isCurrent: idx === i,
          isVisited: idx < i,
          isMoving: idx === i, // pointer is jumping
        })),
        currentIndex: i,
        visitedCount: i,
        action: "move",
        message: `curr = curr→next  (moving to node with value: ${nodes[i + 1].value})`,
        line: { cpp: 6, c: 6, java: 7 },
      });
    }
  }

  // Final step: reached NULL
  steps.push({
    nodes: nodes.map((n) => ({ ...n, isCurrent: false, isVisited: true })),
    currentIndex: nodes.length,
    visitedCount: nodes.length,
    action: "done",
    message: `✅ Traversal complete! Visited all ${nodes.length} nodes. curr = NULL`,
    line: { cpp: 7, c: 7, java: 8 },
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

// ─── Helper: build a plain node list from an array of values ───────────────
function buildListFromValues(values) {
  if (!values || values.length === 0) return null;
  const nodeObjs = values.map((v, i) => ({
    id: String(i),
    value: typeof v === "object" ? v.value : v,
    next: null,
    isHead: i === 0,
  }));
  for (let i = 0; i < nodeObjs.length - 1; i++) {
    nodeObjs[i].next = nodeObjs[i + 1];
  }
  return nodeObjs[0];
}

// ─── Helper: snapshot a head pointer into a plain array ────────────────────
function snap(head, extras = {}) {
  const nodes = [];
  let cur = head;
  let idx = 0;
  while (cur) {
    nodes.push({
      id: cur.id,
      value: cur.value,
      isHead: cur.isHead || idx === 0,
      isTail: cur.next === null,
      next: cur.next ? `0x${(1000 + Number(cur.next.id)).toString(16)}` : null,
      ...((extras[cur.id]) || {}),
    });
    cur = cur.next;
    idx++;
  }
  return nodes;
}

// ─── INSERT AT TAIL ─────────────────────────────────────────────────────────
export function parseInsertAtTail(inputArray) {
  if (!inputArray || inputArray.length === 0) return [];

  const values = inputArray.map((item) => (typeof item === "object" ? item.value : item));
  const steps = [];

  // We'll simulate inserting the LAST value into a list made of the first n-1 values.
  const insertValue = values[values.length - 1];
  const listValues = values.slice(0, -1);

  // Build initial list
  let head = buildListFromValues(listValues.length > 0 ? listValues : [values[0]]);
  if (listValues.length === 0) {
    // Edge: only one element, show empty then insert
    steps.push({
      nodes: [],
      action: "start",
      message: `Starting with empty list. Inserting ${insertValue} at tail.`,
      line: { cpp: 1, c: 1, java: 1 },
    });
    head = { id: "0", value: insertValue, next: null, isHead: true };
    steps.push({
      nodes: snap(head, { "0": { isNew: true } }),
      action: "insert",
      message: `List was empty — new node ${insertValue} is both HEAD and TAIL.`,
      line: { cpp: 4, c: 4, java: 5 },
    });
    steps.push({
      nodes: snap(head),
      action: "done",
      message: `✅ Insertion complete! Tail node: ${insertValue}`,
      line: { cpp: 10, c: 10, java: 11 },
    });
    return steps;
  }

  // Step 1 – show initial list
  steps.push({
    nodes: snap(head),
    action: "start",
    message: `Initial list shown. Inserting ${insertValue} at the TAIL. Starting traversal from HEAD.`,
    line: { cpp: 2, c: 2, java: 3 },
  });

  // Step 2 – traverse to find tail, highlighting curr
  let cur = head;
  while (cur.next) {
    steps.push({
      nodes: snap(head, { [cur.id]: { isCurrent: true } }),
      action: "traverse",
      message: `curr = node(${cur.value}) — not tail yet, moving forward…`,
      line: { cpp: 5, c: 5, java: 6 },
    });
    cur = cur.next;
  }

  // Step 3 – found tail
  steps.push({
    nodes: snap(head, { [cur.id]: { isCurrent: true } }),
    action: "found_tail",
    message: `Found TAIL node (value: ${cur.value}) — curr→next is NULL.`,
    line: { cpp: 6, c: 6, java: 7 },
  });

  // Step 4 – create new node and link
  const newNodeId = String(listValues.length);
  const newNode = { id: newNodeId, value: insertValue, next: null, isHead: false };
  cur.next = newNode;

  steps.push({
    nodes: snap(head, { [cur.id]: { isCurrent: true }, [newNodeId]: { isNew: true } }),
    action: "insert",
    message: `Created new node(${insertValue}) and linked tail→next to it.`,
    line: { cpp: 8, c: 8, java: 9 },
  });

  // Step 5 – done
  steps.push({
    nodes: snap(head),
    action: "done",
    message: `✅ Insertion complete! ${insertValue} is now the new TAIL.`,
    line: { cpp: 10, c: 10, java: 11 },
  });

  return steps;
}

// ─── INSERT AT POSITION ──────────────────────────────────────────────────────
export function parseInsertAtPosition(inputArray) {
  if (!inputArray || inputArray.length < 2) return [];

  const values = inputArray.map((item) => (typeof item === "object" ? item.value : item));
  const steps = [];

  // Insert 2nd-to-last value at position = last value (clamped to valid range)
  const insertValue = values[values.length - 2];
  const rawPos = Math.abs(values[values.length - 1]) || 1;
  const listValues = values.slice(0, -2);

  if (listValues.length === 0) listValues.push(1, 2, 3); // fallback demo list

  const pos = Math.min(rawPos, listValues.length); // clamp
  let head = buildListFromValues(listValues);

  steps.push({
    nodes: snap(head),
    action: "start",
    message: `Goal: insert ${insertValue} at position ${pos} (0-indexed). Traversing to position ${pos - 1}…`,
    line: { cpp: 2, c: 2, java: 3 },
  });

  if (pos === 0) {
    // Insert at head
    const newHead = { id: "new", value: insertValue, next: head, isHead: true };
    if (head) head.isHead = false;
    steps.push({
      nodes: snap(newHead, { new: { isNew: true } }),
      action: "insert",
      message: `Position 0 = HEAD. New node ${insertValue} becomes new HEAD.`,
      line: { cpp: 5, c: 5, java: 6 },
    });
    steps.push({
      nodes: snap(newHead),
      action: "done",
      message: `✅ Inserted ${insertValue} at position 0 (HEAD).`,
      line: { cpp: 10, c: 10, java: 11 },
    });
    return steps;
  }

  // Walk to node just before target position
  let cur = head;
  for (let i = 0; i < pos - 1 && cur.next; i++) {
    steps.push({
      nodes: snap(head, { [cur.id]: { isCurrent: true } }),
      action: "traverse",
      message: `At position ${i} (value: ${cur.value}). Moving to next…`,
      line: { cpp: 6, c: 6, java: 7 },
    });
    cur = cur.next;
  }

  steps.push({
    nodes: snap(head, { [cur.id]: { isCurrent: true } }),
    action: "found_pos",
    message: `At position ${pos - 1} (value: ${cur.value}). This is where we'll splice in.`,
    line: { cpp: 7, c: 7, java: 8 },
  });

  // Splice in new node
  const newNodeId = "new";
  const newNode = { id: newNodeId, value: insertValue, next: cur.next, isHead: false };
  cur.next = newNode;

  steps.push({
    nodes: snap(head, { [cur.id]: { isCurrent: true }, [newNodeId]: { isNew: true } }),
    action: "insert",
    message: `Spliced new node(${insertValue}) between position ${pos - 1} and ${pos}.`,
    line: { cpp: 8, c: 8, java: 9 },
  });

  steps.push({
    nodes: snap(head),
    action: "done",
    message: `✅ Inserted ${insertValue} at position ${pos} successfully!`,
    line: { cpp: 10, c: 10, java: 11 },
  });

  return steps;
}

// ─── DELETE AT HEAD ──────────────────────────────────────────────────────────
export function parseDeleteAtHead(inputArray) {
  if (!inputArray || inputArray.length === 0) return [];

  const values = inputArray.map((item) => (typeof item === "object" ? item.value : item));
  const steps = [];
  let head = buildListFromValues(values);

  steps.push({
    nodes: snap(head),
    action: "start",
    message: `Deleting HEAD node (value: ${head.value}). Pointing head to head→next.`,
    line: { cpp: 2, c: 2, java: 3 },
  });

  const deletedId = head.id;
  const deletedValue = head.value;

  steps.push({
    nodes: snap(head, { [deletedId]: { isDeleted: true } }),
    action: "delete",
    message: `Marking node(${deletedValue}) for deletion. head = head→next.`,
    line: { cpp: 4, c: 4, java: 5 },
  });

  if (head.next) {
    head = head.next;
    head.isHead = true;
  } else {
    head = null;
  }

  if (head) {
    steps.push({
      nodes: snap(head),
      action: "done",
      message: `✅ HEAD deleted! New HEAD is node(${head.value}). Memory freed.`,
      line: { cpp: 6, c: 6, java: 7 },
    });
  } else {
    steps.push({
      nodes: [],
      action: "done",
      message: `✅ List is now empty after deleting the only node (${deletedValue}).`,
      line: { cpp: 6, c: 6, java: 7 },
    });
  }

  return steps;
}

// ─── DELETE AT TAIL ──────────────────────────────────────────────────────────
export function parseDeleteAtTail(inputArray) {
  if (!inputArray || inputArray.length === 0) return [];

  const values = inputArray.map((item) => (typeof item === "object" ? item.value : item));
  const steps = [];
  let head = buildListFromValues(values);

  steps.push({
    nodes: snap(head),
    action: "start",
    message: `Deleting TAIL node. Need to traverse to second-to-last node first.`,
    line: { cpp: 2, c: 2, java: 3 },
  });

  if (!head.next) {
    // Only one node
    const val = head.value;
    steps.push({
      nodes: snap(head, { [head.id]: { isDeleted: true } }),
      action: "delete",
      message: `Only one node in list — deleting it makes list empty.`,
      line: { cpp: 4, c: 4, java: 5 },
    });
    steps.push({
      nodes: [],
      action: "done",
      message: `✅ Deleted node(${val}). List is now empty.`,
      line: { cpp: 6, c: 6, java: 7 },
    });
    return steps;
  }

  // Traverse to second-to-last
  let cur = head;
  while (cur.next && cur.next.next) {
    steps.push({
      nodes: snap(head, { [cur.id]: { isCurrent: true } }),
      action: "traverse",
      message: `curr = node(${cur.value}) — next→next exists, keep moving…`,
      line: { cpp: 5, c: 5, java: 6 },
    });
    cur = cur.next;
  }

  const tailNode = cur.next;
  steps.push({
    nodes: snap(head, { [cur.id]: { isCurrent: true }, [tailNode.id]: { isDeleted: true } }),
    action: "delete",
    message: `Found second-to-last node(${cur.value}). Setting its next = NULL, freeing tail node(${tailNode.value}).`,
    line: { cpp: 7, c: 7, java: 8 },
  });

  cur.next = null;

  steps.push({
    nodes: snap(head),
    action: "done",
    message: `✅ Tail node(${tailNode.value}) deleted. New TAIL is node(${cur.value}).`,
    line: { cpp: 9, c: 9, java: 10 },
  });

  return steps;
}

// ─── SEARCH / FIND ───────────────────────────────────────────────────────────
export function parseLinkedListSearch(inputArray, target) {
  if (!inputArray || inputArray.length === 0) return [];

  const values = inputArray.map((item) => (typeof item === "object" ? item.value : item));
  const steps = [];
  const head = buildListFromValues(values);

  // If no target, default to first value
  const searchVal = target != null ? target : values[0];

  steps.push({
    nodes: snap(head),
    action: "start",
    message: `Searching for value ${searchVal} in linked list. Starting at HEAD.`,
    line: { cpp: 2, c: 2, java: 3 },
  });

  let cur = head;
  let pos = 0;
  let found = false;

  while (cur) {
    steps.push({
      nodes: snap(head, { [cur.id]: { isCurrent: true } }),
      action: "compare",
      message: `Position ${pos}: checking node(${cur.value}) — is it ${searchVal}?`,
      line: { cpp: 5, c: 5, java: 6 },
    });

    if (cur.value === searchVal) {
      steps.push({
        nodes: snap(head, { [cur.id]: { isTarget: true } }),
        action: "found",
        message: `🎉 Found ${searchVal} at position ${pos}!`,
        line: { cpp: 6, c: 6, java: 7 },
      });
      found = true;
      break;
    }

    steps.push({
      nodes: snap(head, { [cur.id]: { isVisited: true } }),
      action: "move",
      message: `node(${cur.value}) ≠ ${searchVal}. Moving to next node…`,
      line: { cpp: 8, c: 8, java: 9 },
    });

    cur = cur.next;
    pos++;
  }

  if (!found) {
    steps.push({
      nodes: snap(head),
      action: "not_found",
      message: `❌ Reached NULL — value ${searchVal} not found in the list.`,
      line: { cpp: 10, c: 10, java: 11 },
    });
  }

  steps.push({
    nodes: snap(head, found ? {} : {}),
    action: "done",
    message: found
      ? `✅ Search complete: ${searchVal} found at position ${pos}.`
      : `✅ Search complete: ${searchVal} not found.`,
    line: { cpp: 12, c: 12, java: 13 },
  });

  return steps;
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
