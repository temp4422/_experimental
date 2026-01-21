// Compare performance if...else implementations
// From LeetCode: Q3. Max Consecutive Ones, Easy

var findMaxConsecutiveOnes1 = function (nums) {
  let maxConsecutive = 0
  let consecutive = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      consecutive++
      maxConsecutive = Math.max(maxConsecutive, consecutive)
    } else {
      consecutive = 0
    }
  }
  return maxConsecutive
}

var findMaxConsecutiveOnes2 = function (nums) {
  let maxConsecutive = 0
  let consecutive = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      consecutive++
    } else {
      consecutive = 0
      maxConsecutive = Math.max(maxConsecutive, consecutive)
    }
  }
  return Math.max(maxConsecutive, consecutive)
}

var findMaxConsecutiveOnes3 = function (nums) {
  let maxConsecutive = 0
  let consecutive = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      consecutive++
    } else {
      consecutive = 0
    }
    if (consecutive > maxConsecutive) maxConsecutive = consecutive
  }
  return Math.max(maxConsecutive, consecutive)
}

// Test array generation
const testArr = Array.from({ length: 100_000_000 }, () => (Math.random() < 0.5 ? 0 : 1))

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'findMaxConsecutiveOnes1',
  baseline: true,
  fn: () => {
    findMaxConsecutiveOnes1(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'findMaxConsecutiveOnes2',
  fn: () => {
    findMaxConsecutiveOnes2(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'findMaxConsecutiveOnes3',
  fn: () => {
    findMaxConsecutiveOnes3(testArr)
  },
})

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.

/*
21.01.2026

Basically no difference in performance between the three implementations.

❯ deno bench _benchmarks/benchmark-if-implementations.ts
Check _benchmarks/benchmark-if-implementations.ts
    CPU | Apple M1 Max
Runtime | Deno 2.6.3 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-if-implementations.ts

| benchmark                 | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ------------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| findMaxConsecutiveOnes1   |        461.2 ms |           2.2 | (453.0 ms … 486.3 ms) | 460.2 ms | 486.3 ms | 486.3 ms |
| findMaxConsecutiveOnes2   |        469.2 ms |           2.1 | (454.3 ms … 494.9 ms) | 474.5 ms | 494.9 ms | 494.9 ms |
| findMaxConsecutiveOnes3   |        450.1 ms |           2.2 | (445.7 ms … 464.3 ms) | 452.1 ms | 464.3 ms | 464.3 ms |

summary
  findMaxConsecutiveOnes1
     1.02x slower than findMaxConsecutiveOnes3
     1.02x faster than findMaxConsecutiveOnes2


_experimental git:main  25s
*/
