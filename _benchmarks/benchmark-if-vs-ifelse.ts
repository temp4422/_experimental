// Compare performance of if vs if-else
// From LeetCode: 2011. Final Value of Variable After Performing Operations

var finalValueAfterOperations = function (operations: string[]): number {
  let value: number = 0
  for (let operation of operations) {
    if (operation === 'X++' || operation === '++X') {
      value++
    }
    if (operation === 'X--' || operation === '--X') {
      value--
    }
  }
  return value
}

var finalValueAfterOperationsElse = function (operations: string[]): number {
  let value: number = 0
  for (let operation of operations) {
    if (operation === 'X++' || operation === '++X') {
      value++
    } else {
      value--
    }
  }
  return value
}

// Test array generation
const testArr1: string[] = Array.from({ length: 100_000 }, () => {
  const operations = ['X++', '++X', 'X--', '--X']
  return operations[Math.floor(Math.random() * operations.length)]
})

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'finalValueAfterOperations',
  baseline: true,
  fn: () => {
    finalValueAfterOperations(testArr1)
  },
})
// @ts-ignore
Deno.bench({
  name: 'finalValueAfterOperationsElse',
  fn: () => {
    finalValueAfterOperationsElse(testArr1)
  },
})

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.

/*
20.10.2025

UNEXPECTED results:
when testArr1 === 10_000, finalValueAfterOperationsElse 1.54x FASTER than finalValueAfterOperations
when testArr1 === 100_000, finalValueAfterOperationsElse 1.32x FASTER than finalValueAfterOperations
when testArr1 === 1_000_000, finalValueAfterOperationsElse 1.37x FASTER than finalValueAfterOperations
when testArr1 === 10_000_000, finalValueAfterOperationsElse 1.39x FASTER than finalValueAfterOperations
when testArr1 === 100_000_000, finalValueAfterOperationsElse 1.23x FASTER than finalValueAfterOperations
when testArr1 === 1_000_000_000, error: Fatal JavaScript out of memory: invalid table size

❯ deno bench _benchmarks/benchmark-if-vs-ifelse.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-if-vs-ifelse.ts
    CPU | Apple M1 Max
Runtime | Deno 2.5.4 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-if-vs-ifelse.ts

| benchmark                       | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ------------------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| finalValueAfterOperations       |          1.8 ms |         558.5 | (  1.7 ms …   3.1 ms) |   1.8 ms |   2.5 ms |   2.5 ms |
| finalValueAfterOperationsElse   |          1.4 ms |         736.9 | (  1.3 ms …   4.3 ms) |   1.3 ms |   2.4 ms |   3.5 ms |

summary
  finalValueAfterOperations
     1.32x slower than finalValueAfterOperationsElse
*/
