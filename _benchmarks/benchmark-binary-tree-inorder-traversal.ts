// Compare performance of binary tree inorder traversal implementations
// From LeetCode 173. Binary Search Tree Iterator, Medium

const inorderTraversalStandard = function (root) {
  // Standard Version
  const result = []
  const stack = []
  let node = root
  while (node || stack.length) {
    while (node) {
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    result.push(node.val)
    node = node.right
  }
  return result
}

const inorderTraversalAlternative = function (root) {
  // Alternative with double .pop() and internal break
  const result = []
  const stack = [root] // Initialize with root inside the array
  while (stack.length) {
    let node = stack.pop()
    if (node) {
      // 1. Go as far left as possible
      while (node) {
        stack.push(node)
        node = node.left
      }
    }
    // 2. If the stack is empty after the pop, we are done
    // Important as we can face null pop, we can have problem here, so we must check before proceed
    if (stack.length === 0) break
    // 3. Process the node (it's the leftmost available)
    // This is the most critical part. After skipping the left dive, the code hits the second pop(). This moves the pointer back up the tree to the next available ancestor.
    node = stack.pop()
    result.push(node.val)
    // 4. Move to the right subtree by pushing it onto the stack
    // This sets up the next iteration's "left-dive"
    stack.push(node.right)
  }
  return result
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
  name: 'inorderTraversalStandard',
  baseline: true,
  fn: () => {
    inorderTraversalStandard(testArray)
  },
})
// @ts-ignore
Deno.bench({
  name: 'inorderTraversalAlternative',
  fn: () => {
    inorderTraversalAlternative(testArray)
  },
})

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArrary'.

/*
10.01.2026

❯ deno bench _benchmarks/benchmark-binary-tree-inorder-traversal.ts
Check _benchmarks/benchmark-binary-tree-inorder-traversal.ts
    CPU | Apple M1 Max
Runtime | Deno 2.6.3 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-binary-tree-inorder-traversal.ts

| benchmark                     | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ----------------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| inorderTraversalStandard      |        974.5 µs |         1,026 | (769.8 µs …   1.7 ms) |   1.1 ms |   1.5 ms |   1.6 ms |
| inorderTraversalAlternative   |          1.0 ms |         965.2 | (873.2 µs …   1.7 ms) |   1.1 ms |   1.6 ms |   1.6 ms |

summary
  inorderTraversalStandard
     1.06x faster than inorderTraversalAlternative


_experimental git:main*  4s

*/
