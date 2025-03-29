// Compare execution time: Set vs Array
// From LeetCode: 2441. Largest Positive Integer That Exists With Its Negative, Easy

// Set
const findMaxKSet = function (nums: number[]): number {
  const set = new Set(nums)
  let maxPositiveInt = -1
  for (let i = 0; i < nums.length; i++) {
    let positiveInt = Math.abs(nums[i])
    if (nums[i] < 0 && set.has(positiveInt)) {
      if (maxPositiveInt < positiveInt) maxPositiveInt = positiveInt
    }
  }
  return maxPositiveInt
}

// Array
const findMaxKArray = function (nums: number[]): number {
  let maxPositiveInt = -1
  for (let i = 0; i < nums.length; i++) {
    let positiveInt = Math.abs(nums[i])
    if (nums[i] < 0 && nums.includes(positiveInt)) {
      if (maxPositiveInt < positiveInt) maxPositiveInt = positiveInt
    }
  }
  return maxPositiveInt
}

// Test array generation
// generate random array of numbers between -1000 and 1000
// prettier-ignore
const testArr1: number[] = Array.from({ length: 100_000 }, (_, i) => Math.floor(Math.random() * 2000) - 1000)

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'findMaxKSet',
  baseline: true,
  fn: () => {
    findMaxKSet(testArr1)
  },
})
// @ts-ignore
Deno.bench({
  name: 'findMaxKArray',
  fn: () => {
    findMaxKArray(testArr1)
  },
})

/*
29.03.2025

❯ deno bench _benchmarks/benchmark-set-vs-array.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-set-vs-array.ts
    CPU | Apple M1 Max
Runtime | Deno 2.2.5 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-set-vs-array.ts

benchmark       time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------- ----------------------------- --------------------- --------------------------
findMaxKSet              3.7 ms         273.3 (  3.6 ms …   3.9 ms)   3.7 ms   3.9 ms   3.9 ms
findMaxKArray           21.1 ms          47.3 ( 21.0 ms …  21.6 ms)  21.2 ms  21.6 ms  21.6 ms

summary
  findMaxKSet
     5.77x faster than findMaxKArray
*/

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.
