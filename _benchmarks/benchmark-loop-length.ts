// Compare execution time: of for shorter for loop
// From LeetCode: 2799. Count Complete Subarrays in an Array, Medium

var countCompleteSubarrays = function (nums: number[]): number {
  const distinctElementsSetSize = new Set(nums).size
  let completeSubarrays = 0
  for (let i = 0; i < nums.length; i++) {
    let subarraySet = new Set()
    for (let j = i; j < nums.length; j++) {
      subarraySet.add(nums[j])
      if (subarraySet.size === distinctElementsSetSize) {
        completeSubarrays += nums.length - j
        break
      }
    }
  }
  return completeSubarrays
}

var countCompleteSubarraysShort = function (nums: number[]): number {
  const distinctElementsSetSize = new Set(nums).size
  let completeSubarrays = 0
  for (let i = 0; i < nums.length - distinctElementsSetSize + 1; i++) {
    let subarraySet = new Set()
    for (let j = i; j < nums.length; j++) {
      subarraySet.add(nums[j])
      if (subarraySet.size === distinctElementsSetSize) {
        completeSubarrays += nums.length - j
        break
      }
    }
  }
  return completeSubarrays
}

// Test array generation
// prettier-ignore
const testArr1: number[] = Array.from({ length: 10_000 }, (_, i) => Math.floor(Math.random() * 1000))

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'countCompleteSubarrays',
  baseline: true,
  fn: () => {
    countCompleteSubarrays(testArr1)
  },
})
// @ts-ignore
Deno.bench({
  name: 'countCompleteSubarraysShort',
  fn: () => {
    countCompleteSubarraysShort(testArr1)
  },
})

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.

/*
24.04.2025

❯ deno bench _benchmarks/benchmark-loop-length.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-loop-length.ts
    CPU | Apple M1 Max
Runtime | Deno 2.2.5 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-loop-length.ts

benchmark                     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------- ----------------------------- --------------------- --------------------------
countCompleteSubarrays               998.5 ms           1.0 (982.2 ms …    1.0 s)    1.0 s    1.0 s    1.0 s
countCompleteSubarraysShort          981.7 ms           1.0 (971.9 ms … 994.3 ms) 987.9 ms 994.3 ms 994.3 ms

summary
  countCompleteSubarrays
     1.02x slower than countCompleteSubarraysShort
*/
