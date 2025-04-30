// Compare execution time: array vs math
// From LeetCode: 697. Degree of an Array, Easy

var findShortestSubArrayMath = function (nums: number[]): number {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) ?? 0) + 1)
  }
  const sortedEntries = [...map.entries()].sort((a, b) => b[1] - a[1])

  let smallestSubarray = Infinity
  let degree = sortedEntries[0][1]
  let i = 0
  while (sortedEntries[i] && sortedEntries[i][1] === degree) {
    let element = sortedEntries[i][0]
    let startIndex = nums.indexOf(element)
    let endIndex = nums.lastIndexOf(element)
    smallestSubarray = Math.min(smallestSubarray, endIndex - startIndex + 1)
    i++
  }
  return smallestSubarray
}

var findShortestSubArrayArray = function (nums: number[]): number {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) ?? 0) + 1)
  }
  const sortedEntries = [...map.entries()].sort((a, b) => b[1] - a[1])

  let smallestSubarray = Infinity
  let degree = sortedEntries[0][1]
  let i = 0
  while (sortedEntries[i] && sortedEntries[i][1] === degree) {
    let element = sortedEntries[i][0]
    let startIndex = nums.indexOf(element)
    let endIndex = nums.lastIndexOf(element)
    smallestSubarray = Math.min(smallestSubarray, nums.slice(startIndex, endIndex + 1).length)
    i++
  }
  return smallestSubarray
}

// Test array generation
// prettier-ignore
const testArr1: number[] = Array.from({ length: 100_000 }, (_, i) => Math.floor(Math.random() * 100) + 1)

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'findShortestSubArrayMath',
  baseline: true,
  fn: () => {
    findShortestSubArrayMath(testArr1)
  },
})
// @ts-ignore
Deno.bench({
  name: 'findShortestSubArrayArray',
  fn: () => {
    findShortestSubArrayArray(testArr1)
  },
})

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.

/*
30.04.2025

❯ deno bench _benchmarks/benchmark-array-vs-math.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-array-vs-math.ts
    CPU | Apple M1 Max
Runtime | Deno 2.2.12 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-array-vs-math.ts

benchmark                   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------------------- ----------------------------- --------------------- --------------------------
findShortestSubArrayMath             2.4 ms         416.9 (  2.3 ms …   2.7 ms)   2.4 ms   2.6 ms   2.6 ms
findShortestSubArrayArray            2.5 ms         399.8 (  2.3 ms …   2.9 ms)   2.6 ms   2.7 ms   2.8 ms

summary
  findShortestSubArrayMath
     1.04x faster than findShortestSubArrayArray
*/
