const codeTemplates = {
  bubble: {
    c: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
  for(int i = 0; i < n-1; i++) {
    for(int j = 0; j < n-i-1; j++) {
      if(arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}`,
    cpp: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
  for(int i = 0; i < n-1; i++) {
    for(int j = 0; j < n-i-1; j++) {
      if(arr[j] > arr[j+1]) {
        swap(arr[j], arr[j+1]);
      }
    }
  }
}`,
    java: `public class Main {
  public static void bubbleSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
      for (int j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }

  public static void main(String[] args) {
    int[] arr = {5, 3, 8, 4, 2};
    bubbleSort(arr);
  }
}`,
  },
  selection: {
    c: `#include <stdio.h>

void selectionSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    int minIdx = i;
    for (int j = i+1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx != i) {
      int temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
}`,
    cpp: `#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx != i) {
      swap(arr[i], arr[minIdx]);
    }
  }
}`,
    java: `public class Main {
  public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
      int minIdx = i;
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx != i) {
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
      }
    }
  }

  public static void main(String[] args) {
    int[] arr = {5, 3, 8, 4, 2};
    selectionSort(arr);
  }
}`,
  },
  merge: {
    c: `#include <stdio.h>

void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];

  for (int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];

  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j])
      arr[k++] = L[i++];
    else
      arr[k++] = R[j++];
  }

  while (i < n1)
    arr[k++] = L[i++];

  while (j < n2)
    arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,

    cpp: `#include <iostream>
using namespace std;

void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];

  for (int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];

  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j])
      arr[k++] = L[i++];
    else
      arr[k++] = R[j++];
  }

  while (i < n1)
    arr[k++] = L[i++];

  while (j < n2)
    arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

int main() {
  int arr[] = {5, 3, 8, 4, 2};
  int n = sizeof(arr) / sizeof(arr[0]);

  mergeSort(arr, 0, n - 1);

  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  return 0;
}`,

    java: `public class Main {
  public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
      int m = l + (r - l) / 2;
      mergeSort(arr, l, m);
      mergeSort(arr, m + 1, r);
      merge(arr, l, m, r);
    }
  }

  public static void merge(int[] arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    int[] L = new int[n1];
    int[] R = new int[n2];

    for (int i = 0; i < n1; i++)
      L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
      R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j])
        arr[k++] = L[i++];
      else
        arr[k++] = R[j++];
    }

    while (i < n1)
      arr[k++] = L[i++];

    while (j < n2)
      arr[k++] = R[j++];
  }

  public static void main(String[] args) {
    int[] arr = {5, 3, 8, 4, 2};
    mergeSort(arr, 0, arr.length - 1);

    for (int i = 0; i < arr.length; i++)
      System.out.print(arr[i] + " ");
  }
}`,
  },
  insertion: {
    c: `#include <stdio.h>

void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    cpp: `#include <iostream>
using namespace std;

void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    java: `public class Main {
  public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      int key = arr[i];
      int j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }

  public static void main(String[] args) {
    int[] arr = {5, 3, 8, 4, 2};
    insertionSort(arr);
  }
}`,
  },
  quick: {
    c: `#include <stdio.h>

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    int pi = i + 1;
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
    cpp: `#include <iostream>
using namespace std;

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        swap(arr[i], arr[j]);
      }
    }
    swap(arr[i + 1], arr[high]);
    int pi = i + 1;
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
    java: `public class Main {
  public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
      int pivot = arr[high];
      int i = (low - 1);
      for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          int temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
      int temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      int pi = i + 1;
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  public static void main(String[] args) {
    int[] arr = {5, 3, 8, 4, 2};
    quickSort(arr, 0, arr.length - 1);
  }
}`,
  },
  linear_search: {
    c: `#include <stdio.h>

int linearSearch(int arr[], int n, int key) {
  for (int i = 0; i < n; i++) {
    if (arr[i] == key)
      return i;
  }
  return -1;
}

int main() {
  int arr[] = {4, 2, 7, 1, 9};
  int key = 7;
  int n = sizeof(arr) / sizeof(arr[0]);

  int index = linearSearch(arr, n, key);
  if (index != -1)
    printf("Element found at index %d\\n", index);
  else
    printf("Element not found\\n");
  return 0;
}`,

    cpp: `#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int key) {
  for (int i = 0; i < n; i++) {
    if (arr[i] == key)
      return i;
  }
  return -1;
}

int main() {
  int arr[] = {4, 2, 7, 1, 9};
  int key = 7;
  int n = sizeof(arr) / sizeof(arr[0]);

  int index = linearSearch(arr, n, key);
  if (index != -1)
    cout << "Element found at index " << index << endl;
  else
    cout << "Element not found" << endl;
  return 0;
}`,

    java: `public class LinearSearch {
  public static int linearSearch(int[] arr, int key) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == key)
        return i;
    }
    return -1;
  }

  public static void main(String[] args) {
    int[] arr = {4, 2, 7, 1, 9};
    int key = 7;
    int index = linearSearch(arr, key);

    if (index != -1)
      System.out.println("Element found at index " + index);
    else
      System.out.println("Element not found");
  }
}`,
  },

  binary_search: {
    c: `#include <stdio.h>

int binarySearch(int arr[], int n, int key) {
  int low = 0, high = n - 1;
  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == key)
      return mid;
    else if (arr[mid] < key)
      low = mid + 1;
    else
      high = mid - 1;
  }
  return -1;
}

int main() {
  int arr[] = {1, 2, 4, 7, 9};
  int key = 7;
  int n = sizeof(arr) / sizeof(arr[0]);

  int index = binarySearch(arr, n, key);
  if (index != -1)
    printf("Element found at index %d\\n", index);
  else
    printf("Element not found\\n");
  return 0;
}`,

    cpp: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int key) {
  int low = 0, high = n - 1;
  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == key)
      return mid;
    else if (arr[mid] < key)
      low = mid + 1;
    else
      high = mid - 1;
  }
  return -1;
}

int main() {
  int arr[] = {1, 2, 4, 7, 9};
  int key = 7;
  int n = sizeof(arr) / sizeof(arr[0]);

  int index = binarySearch(arr, n, key);
  if (index != -1)
    cout << "Element found at index " << index << endl;
  else
    cout << "Element not found" << endl;
  return 0;
}`,

    java: `public class BinarySearch {
  public static int binarySearch(int[] arr, int key) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
      int mid = (low + high) / 2;
      if (arr[mid] == key)
        return mid;
      else if (arr[mid] < key)
        low = mid + 1;
      else
        high = mid - 1;
    }
    return -1;
  }

  public static void main(String[] args) {
    int[] arr = {1, 2, 4, 7, 9};
    int key = 7;
    int index = binarySearch(arr, key);

    if (index != -1)
      System.out.println("Element found at index " + index);
    else
      System.out.println("Element not found");
  }
}`,
  },

  singly_insert_head: {
    c: `#include <stdio.h>
#include <stdlib.h>

struct Node {
  int data;
  struct Node* next;
};

struct Node* insertAtHead(struct Node* head, int data) {
  struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
  newNode->data = data;
  newNode->next = head;
  return newNode;
}

void printList(struct Node* head) {
  struct Node* temp = head;
  while (temp != NULL) {
    printf("%d -> ", temp->data);
    temp = temp->next;
  }
  printf("NULL\\n");
}

int main() {
  struct Node* head = NULL;
  head = insertAtHead(head, 3);
  head = insertAtHead(head, 5);
  head = insertAtHead(head, 7);

  printList(head);
  return 0;
}`,

    cpp: `#include <iostream>
using namespace std;

struct Node {
  int data;
  Node* next;
};

Node* insertAtHead(Node* head, int data) {
  Node* newNode = new Node();
  newNode->data = data;
  newNode->next = head;
  return newNode;
}

void printList(Node* head) {
  Node* temp = head;
  while (temp != nullptr) {
    cout << temp->data << " -> ";
    temp = temp->next;
  }
  cout << "NULL" << endl;
}

int main() {
  Node* head = nullptr;
  head = insertAtHead(head, 3);
  head = insertAtHead(head, 5);
  head = insertAtHead(head, 7);

  printList(head);
  return 0;
}`,

    java: `class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

public class SinglyLinkedList {
    
    public static Node insertAtHead(Node head, int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        return newNode;
    }
    
    public static void printList(Node head) {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("NULL");
    }
    
    public static void main(String[] args) {
        Node head = null;
        head = insertAtHead(head, 3);
        head = insertAtHead(head, 5);
        head = insertAtHead(head, 7);
        
        printList(head);
    }
}`,
  },
  singly_traversal: {
    c: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

void traverse(struct Node* head) {
  struct Node* curr = head;   /* curr points to head */
  while (curr != NULL) {      /* loop until end */
    printf("%d -> ", curr->data);
    curr = curr->next;        /* move to next node */
  }
  printf("NULL\\n");
}

int main() {
  struct Node* head = NULL;
  /* build list: 3 -> 5 -> 7 -> NULL */
  struct Node* n3 = malloc(sizeof(struct Node));
  n3->data = 3; n3->next = NULL;
  struct Node* n2 = malloc(sizeof(struct Node));
  n2->data = 5; n2->next = n3;
  struct Node* n1 = malloc(sizeof(struct Node));
  n1->data = 7; n1->next = n2;
  head = n1;
  traverse(head);
  return 0;
}`,

    cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

void traverse(Node* head) {
  Node* curr = head;          // curr points to head
  while (curr != nullptr) {   // loop until end
    cout << curr->data << " -> ";
    curr = curr->next;        // move to next node
  }
  cout << "NULL" << endl;
}

int main() {
  Node* head = nullptr;
  /* build list: 7 -> 5 -> 3 -> NULL */
  Node* n3 = new Node{3, nullptr};
  Node* n2 = new Node{5, n3};
  Node* n1 = new Node{7, n2};
  head = n1;
  traverse(head);
  return 0;
}`,

    java: `class Node {
  int data;
  Node next;
  Node(int d) { data = d; next = null; }
}

public class TraverseList {
  static void traverse(Node head) {
    Node curr = head;          // curr points to head
    while (curr != null) {     // loop until end
      System.out.print(curr.data + " -> ");
      curr = curr.next;        // move to next node
    }
    System.out.println("NULL");
  }

  public static void main(String[] args) {
    Node head = new Node(7);
    head.next = new Node(5);
    head.next.next = new Node(3);
    traverse(head);
  }
}`,
  },
  singly_insert_tail: {
    c: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

struct Node* insertAtTail(struct Node* head, int data) {
  struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
  newNode->data = data;
  newNode->next = NULL;
  if (head == NULL) return newNode;
  struct Node* temp = head;
  while (temp->next != NULL)
    temp = temp->next;
  temp->next = newNode;
  return head;
}

int main() {
  struct Node* head = NULL;
  head = insertAtTail(head, 3);
  head = insertAtTail(head, 5);
  head = insertAtTail(head, 7);
  return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

Node* insertAtTail(Node* head, int data) {
  Node* newNode = new Node{data, nullptr};
  if (!head) return newNode;
  Node* temp = head;
  while (temp->next)
    temp = temp->next;
  temp->next = newNode;
  return head;
}

int main() {
  Node* head = nullptr;
  head = insertAtTail(head, 3);
  head = insertAtTail(head, 5);
  head = insertAtTail(head, 7);
  return 0;
}`,
    java: `class Node {
  int data;
  Node next;
  Node(int d) { data = d; next = null; }
}

public class InsertAtTail {
  static Node insertAtTail(Node head, int data) {
    Node newNode = new Node(data);
    if (head == null) return newNode;
    Node temp = head;
    while (temp.next != null)
      temp = temp.next;
    temp.next = newNode;
    return head;
  }

  public static void main(String[] args) {
    Node head = null;
    head = insertAtTail(head, 3);
    head = insertAtTail(head, 5);
    head = insertAtTail(head, 7);
  }
}`,
  },
  singly_insert_pos: {
    c: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

struct Node* insertAtPos(struct Node* head, int data, int pos) {
  struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
  newNode->data = data;
  if (pos == 0) { newNode->next = head; return newNode; }
  struct Node* temp = head;
  for (int i = 0; i < pos - 1 && temp->next; i++)
    temp = temp->next;
  newNode->next = temp->next;
  temp->next = newNode;
  return head;
}

int main() {
  struct Node* head = NULL;
  /* build 1->2->3 then insert 9 at pos 2 */
  return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

Node* insertAtPos(Node* head, int data, int pos) {
  Node* newNode = new Node{data, nullptr};
  if (pos == 0) { newNode->next = head; return newNode; }
  Node* temp = head;
  for (int i = 0; i < pos - 1 && temp->next; i++)
    temp = temp->next;
  newNode->next = temp->next;
  temp->next = newNode;
  return head;
}

int main() {
  Node* head = nullptr;
  /* build list then insert */
  return 0;
}`,
    java: `class Node {
  int data;
  Node next;
  Node(int d) { data = d; next = null; }
}

public class InsertAtPos {
  static Node insertAtPos(Node head, int data, int pos) {
    Node newNode = new Node(data);
    if (pos == 0) { newNode.next = head; return newNode; }
    Node temp = head;
    for (int i = 0; i < pos - 1 && temp.next != null; i++)
      temp = temp.next;
    newNode.next = temp.next;
    temp.next = newNode;
    return head;
  }

  public static void main(String[] args) {
    // build list and call insertAtPos
  }
}`,
  },
  singly_delete_head: {
    c: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

struct Node* deleteHead(struct Node* head) {
  if (head == NULL) return NULL;
  struct Node* temp = head;
  head = head->next;
  free(temp);
  return head;
}

int main() {
  struct Node* head = NULL;
  /* build list then call deleteHead */
  head = deleteHead(head);
  return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

Node* deleteHead(Node* head) {
  if (!head) return nullptr;
  Node* temp = head;
  head = head->next;
  delete temp;
  return head;
}

int main() {
  Node* head = nullptr;
  /* build list then call deleteHead */
  head = deleteHead(head);
  return 0;
}`,
    java: `class Node {
  int data;
  Node next;
  Node(int d) { data = d; next = null; }
}

public class DeleteHead {
  static Node deleteHead(Node head) {
    if (head == null) return null;
    return head.next;  // GC handles old head
  }

  public static void main(String[] args) {
    Node head = new Node(7);
    head.next = new Node(5);
    head.next.next = new Node(3);
    head = deleteHead(head);
  }
}`,
  },
  singly_delete_tail: {
    c: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

struct Node* deleteTail(struct Node* head) {
  if (!head || !head->next) { free(head); return NULL; }
  struct Node* temp = head;
  while (temp->next->next)
    temp = temp->next;
  free(temp->next);
  temp->next = NULL;
  return head;
}

int main() {
  struct Node* head = NULL;
  /* build list then call deleteTail */
  head = deleteTail(head);
  return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

Node* deleteTail(Node* head) {
  if (!head || !head->next) { delete head; return nullptr; }
  Node* temp = head;
  while (temp->next->next)
    temp = temp->next;
  delete temp->next;
  temp->next = nullptr;
  return head;
}

int main() {
  Node* head = nullptr;
  /* build list then call deleteTail */
  head = deleteTail(head);
  return 0;
}`,
    java: `class Node {
  int data;
  Node next;
  Node(int d) { data = d; next = null; }
}

public class DeleteTail {
  static Node deleteTail(Node head) {
    if (head == null || head.next == null) return null;
    Node temp = head;
    while (temp.next.next != null)
      temp = temp.next;
    temp.next = null;
    return head;
  }

  public static void main(String[] args) {
    Node head = new Node(3);
    head.next = new Node(5);
    head.next.next = new Node(7);
    head = deleteTail(head);
  }
}`,
  },
  singly_search: {
    c: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

int searchList(struct Node* head, int key) {
  struct Node* curr = head;
  int pos = 0;
  while (curr != NULL) {
    if (curr->data == key)
      return pos;          /* found at pos */
    curr = curr->next;
    pos++;
  }
  return -1;               /* not found */
}

int main() {
  /* build list and search */
  return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

struct Node { int data; Node* next; };

int searchList(Node* head, int key) {
  Node* curr = head;
  int pos = 0;
  while (curr) {
    if (curr->data == key)
      return pos;        // found
    curr = curr->next;
    pos++;
  }
  return -1;             // not found
}

int main() {
  /* build list and search */
  return 0;
}`,
    java: `class Node {
  int data;
  Node next;
  Node(int d) { data = d; next = null; }
}

public class SearchList {
  static int searchList(Node head, int key) {
    Node curr = head;
    int pos = 0;
    while (curr != null) {
      if (curr.data == key)
        return pos;        // found
      curr = curr.next;
      pos++;
    }
    return -1;             // not found
  }

  public static void main(String[] args) {
    Node head = new Node(3);
    head.next = new Node(5);
    head.next.next = new Node(7);
    System.out.println(searchList(head, 5));
  }
}`,
  },
};
export default codeTemplates;
