// Compare performancer of iterative vs recursive approaches
// From LeetCode: 94. Binary Tree Inorder Traversal, Easy

var inorderTraversalIteration = function (root) {
  const traversedNodes = []
  const stack = []
  let currentNode = root

  while (currentNode || stack.length) {
    if (currentNode) {
      stack.push(currentNode)
      currentNode = currentNode.left
    } else {
      currentNode = stack.pop()
      traversedNodes.push(currentNode.val)
      currentNode = currentNode.right
    }
  }
  return traversedNodes
}

var inorderTraversalRecursion = function (root) {
  const traversedNodes = []

  function inorder(node) {
    if (!node) return
    inorder(node.left)
    traversedNodes.push(node.val)
    inorder(node.right)
  }

  inorder(root)
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
const testArray = arrayToBinaryTree(Array.from({ length: 100 }, (_, i) => i + 1))

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'inorderTraversalIteration',
  baseline: true,
  fn: () => {
    inorderTraversalIteration(testArray)
  },
})
// @ts-ignore
Deno.bench({
  name: 'inorderTraversalRecursion',
  fn: () => {
    inorderTraversalRecursion(testArray)
  },
})

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.

/*
23.10.2025

❯ deno bench _benchmarks/benchmark-recursion-vs-iteration.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-recursion-vs-iteration.ts
    CPU | Apple M1 Max
Runtime | Deno 2.5.4 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-recursion-vs-iteration.ts

| benchmark                   | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| --------------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| inorderTraversalIteration   |        563.1 ns |     1,776,000 | (543.3 ns … 763.0 ns) | 570.9 ns | 763.0 ns | 763.0 ns |
| inorderTraversalRecursion   |          1.1 µs |       924,100 | (  1.1 µs …   1.1 µs) |   1.1 µs |   1.1 µs |   1.1 µs |

summary
  inorderTraversalIteration
     1.92x faster than inorderTraversalRecursion
*/
