// Compare performance of binary tree postorder traversal implementations
// From LeetCode 145. Binary Tree Postorder Traversal, Easy

var postorderTraversalMixedType = function (root) {
  // Uses a heterogeneous stack (nodes + values) to simulate postorder traversal
  // https://leetcode.com/problems/binary-tree-postorder-traversal/solutions/1038517/javascript-2-solutions-stack-recursive-e-h6rj/comments/2590766/?parent=1613820

  if (!root) return []

  const stack = [root]
  const postorderStack = []

  while (stack.length) {
    let node = stack.pop()

    if (typeof node === 'number') {
      postorderStack.push(node)
    } else if (node) {
      stack.push(node.val, node.right, node.left)
    }
  }
  return postorderStack
}

var postorderTraversalUnshift = function (root) {
  if (!root) return []

  const stack = [root]
  const postorderStack = []

  while (stack.length) {
    let node = stack.pop()

    postorderStack.unshift(node.val)

    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }

  return postorderStack
}

var postorderTraversalReverse = function (root) {
  if (!root) return []

  const stack = [root]
  const postorderStack = []

  while (stack.length) {
    let node = stack.pop()

    postorderStack.push(node.val)

    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }
  postorderStack.reverse()
  return postorderStack
}

var postorderTraversalTwoPass = function (root) {
  // Time Limit Exceeded
  if (!root) return []

  const stack = [root]
  const traversedNodes = []
  const viewed = new Map()

  while (stack.length) {
    let node = stack.pop()

    if (!node.left && !node.right) {
      traversedNodes.push(node.val)
    } else {
      if (viewed.has(node.val)) {
        viewed.delete(node.val)
        traversedNodes.push(node.val)
      } else {
        viewed.set(node.val, null)
        stack.push(node)
        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)
      }
    }
  }

  return traversedNodes
}

// Test array generation
function TreeNode(val, left?, right?) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
function arrayToBinaryTree(array) {
  if (!array.length) return null

  const root = new TreeNode(array[0])
  const queue = [root]
  let i = 1

  while (queue.length > 0 && i < array.length) {
    const current = queue.shift()

    // Create left child if it exists
    if (array[i] !== null) {
      current.left = new TreeNode(array[i])
      queue.push(current.left)
    }
    i++

    // Create right child if it exists
    if (i < array.length && array[i] !== null) {
      current.right = new TreeNode(array[i])
      queue.push(current.right)
    }
    i++
  }

  return root
}
const testArray = arrayToBinaryTree(Array.from({ length: 100_000 }, (_, i) => i + 1))

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'postorderTraversalMixedType',
  baseline: true,
  fn: () => {
    postorderTraversalMixedType(testArray)
  },
})
// @ts-ignore
Deno.bench({
  name: 'postorderTraversalUnshift',
  fn: () => {
    postorderTraversalUnshift(testArray)
  },
})
// @ts-ignore
Deno.bench({
  name: 'postorderTraversalReverse',
  fn: () => {
    postorderTraversalReverse(testArray)
  },
})
// @ts-ignore
Deno.bench({
  name: 'postorderTraversalTwoPass',
  fn: () => {
    postorderTraversalTwoPass(testArray)
  },
})

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArrary'.

/*
15.12.2025

UNEXPECTED results:

Although postorderTraversalReverse traverses data twice, it outperforms postorderTraversalMixedType because it aligns far better with how the V8 engine optimizes code and memory: it uses monomorphic arrays with stable element types, enabling highly optimized machine code, while the mixed-type approach forces polymorphic arrays, frequent type checks, and prevents effective JIT optimization; additionally, the reverse-based method keeps its hot loop simple with fewer stack operations and delegates the reversal to Array.prototype.reverse(), a highly optimized native C++ routine, whereas the mixed-type version simulates ordering in JavaScript with more branching and stack churn, ultimately paying a significant “dynamic typing tax” on every node.

❯ deno bench _benchmarks/benchmark-binary-tree-traversal-implementations.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-binary-tree-traversal-implementations.ts
    CPU | Apple M1 Max
Runtime | Deno 2.5.4 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-binary-tree-traversal-implementations.ts

| benchmark                     | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ----------------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| postorderTraversalMixedType   |          1.2 ms |         863.5 | (972.3 µs …   2.3 ms) |   1.1 ms |   2.3 ms |   2.3 ms |
| postorderTraversalUnshift     |        763.8 ms |           1.3 | (760.1 ms … 775.9 ms) | 765.0 ms | 775.9 ms | 775.9 ms |
| postorderTraversalReverse     |        847.4 µs |         1,180 | (718.0 µs …   3.9 ms) | 840.2 µs |   1.4 ms |   1.5 ms |
| postorderTraversalTwoPass     |          3.8 ms |         265.5 | (  3.6 ms …   4.4 ms) |   3.8 ms |   4.4 ms |   4.4 ms |

summary
  postorderTraversalMixedType
     1.37x slower than postorderTraversalReverse
     3.25x faster than postorderTraversalTwoPass
   659.50x faster than postorderTraversalUnshift


_experimental git:main  12s
*/
