// Compare execution time: Math vs loop vs sort
// From LeetCode: 1913. Maximum Product Difference Between Two Pairs, Easy

const maxProductDifferenceMath = function (nums: number[]) {
  let maxNum = Math.max(...nums)
  let minNum = Math.min(...nums)

  if (nums.length > 2) {
    nums.splice(nums.indexOf(maxNum), 1)
    nums.splice(nums.indexOf(minNum), 1)
  }

  let nearMaxNum = Math.max(...nums)
  let nearMinNum = Math.min(...nums)

  return maxNum * nearMaxNum - minNum * nearMinNum
}

const maxProductDifferenceLoop = function (nums: number[]) {
  // prettier-ignore
  let min1 = 1e4, min2 = min1, max1 = 0, max2 = 0;
  for (const num of nums) {
    if (num > max1 || num > max2) {
      max2 = Math.max(max1, max2)
      max1 = num
    }
    if (num < min1 || num < min2) {
      min2 = Math.min(min1, min2)
      min1 = num
    }
  }
  return max1 * max2 - min1 * min2
}

const maxProductDifferenceSort = function (nums: number[]) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  return nums[n - 2] * nums[n - 1] - nums[0] * nums[1]
}

const maxProductDifferenceSortShort = function (nums: number[]) {
  nums.sort((a, b) => a - b)
  return nums[nums.length - 2] * nums[nums.length - 1] - nums[0] * nums[1]
}

// prettier-ignore
const testArr: number[] = Array.from({ length: 100_000 }, (_, i) => (i = Math.random() ))

Deno.bench({
  name: 'maxProductDifferenceMath',
  baseline: true,
  fn: () => {
    maxProductDifferenceMath(testArr)
  },
})

Deno.bench({
  name: 'maxProductDifferenceLoop',
  fn: () => {
    maxProductDifferenceLoop(testArr)
  },
})

Deno.bench({
  name: 'maxProductDifferenceSort',
  fn: () => {
    maxProductDifferenceSort(testArr)
  },
})

Deno.bench({
  name: 'maxProductDifferenceSortShort',
  fn: () => {
    maxProductDifferenceSortShort(testArr)
  },
})

/* 08.12.2024
IMPORTANT! If array contain 1_000_000 elements, got "error: RangeError: Maximum call stack size exceeded" for Math.max(). So use 100_000 elements instead

❯ deno bench _snippets/benchmark-math-loop-sort.ts
Check file:///Users/user/dev/_experimental/_snippets/benchmark-math-loop-sort.ts
    CPU | Apple M1 Max
Runtime | Deno 2.1.1 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_snippets/benchmark-math-loop-sort.ts

benchmark                       time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------- ----------------------------- --------------------- --------------------------
maxProductDifferenceMath                 2.3 ms         438.1 (  1.3 ms …  15.1 ms)   2.9 ms  13.2 ms  13.9 ms
maxProductDifferenceLoop               335.8 µs         2,978 (247.7 µs …   1.2 ms) 269.1 µs 971.7 µs 982.4 µs
maxProductDifferenceSort                 1.7 ms         586.4 (  1.3 ms …   8.7 ms)   1.5 ms   3.4 ms   7.3 ms
maxProductDifferenceSortShort            1.7 ms         578.9 (  1.3 ms …   9.2 ms)   1.5 ms   3.4 ms   8.0 ms

summary
  maxProductDifferenceMath
     6.80x slower than maxProductDifferenceLoop
     1.34x slower than maxProductDifferenceSort
     1.32x slower than maxProductDifferenceSortShort
*/
