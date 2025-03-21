// Compare execution time: two pointers vs hash set vs binary search
// From LeetCode: 2540. Minimum Common Value, Easy
// https://leetcode.com/problems/minimum-common-value/editorial

// Time complexity: O(n+m); Space complexity: O(1)
const twoPointers = (nums1: number[], nums2: number[]): number => {
  let i: number = 0
  let j: number = 0
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) return nums1[i]
    else if (nums1[i] < nums2[j]) i++
    else if (nums2[j] < nums1[i]) j++
  }
  return -1
}

// Time complexity: O(n+m); Space complexity: O(n)
const hashSet = (nums1: number[], nums2: number[]): number => {
  const set = new Set<number>(nums1)
  for (const num of nums2) {
    if (set.has(num)) return num
  }
  return -1
}

// Time complexity: O(n log m); Space complexity: O(1)
const binarySearch = (nums1: number[], nums2: number[]): number => {
  function getBinarySearch(target: number, nums: number[]) {
    let left = 0
    let right = nums.length - 1
    while (left <= right) {
      // Alternative: `left + (right - left) / 2` is an equivalent formula, and never stores a value larger than left or right. Thus, if left and right are within the integer limits, we will never overflow.
      // let mid = left + (right - left) / 2
      let mid = Math.floor((left + right) / 2)
      if (nums[mid] === target) return nums[mid]
      else if (nums[mid] > target) right = mid - 1
      else if (nums[mid] < target) left = mid + 1
    }
  }

  for (const num of nums1) {
    if (getBinarySearch(num, nums2)) return num
  }
  return -1
}

// Test array generation
const testArr1: number[] = Array.from({ length: 100_000 }, (_, i) => (i = i++))
const testArr2: number[] = Array.from({ length: 100_000 }, (_, i) => (i = i + 80_000 + 1))

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'twoPointers',
  baseline: true,
  fn: () => {
    twoPointers(testArr1, testArr2)
  },
})
// @ts-ignore
Deno.bench({
  name: 'hashSet',
  fn: () => {
    hashSet(testArr1, testArr2)
  },
})
// @ts-ignore
Deno.bench({
  name: 'binarySearch',
  fn: () => {
    binarySearch(testArr1, testArr2)
  },
})

/*
21.03.2025

❯ deno bench _benchmarks/benchmark-twoPointers-hashSet-binarySearch.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-twoPointers-hashSet-binarySearch.ts
    CPU | Apple M1 Max
Runtime | Deno 2.2.3 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-twoPointers-hashSet-binarySearch.ts

benchmark      time/iter (avg)        iter/s      (min … max)           p75      p99     p995
-------------- ----------------------------- --------------------- --------------------------
twoPointers           101.2 µs         9,879 ( 99.1 µs … 360.8 µs)  99.8 µs 117.3 µs 129.2 µs
hashSet                 4.0 ms         247.4 (  3.7 ms …   6.9 ms)   4.0 ms   6.1 ms   6.9 ms
binarySearch            6.0 ms         168.0 (  5.7 ms …   6.4 ms)   6.0 ms   6.4 ms   6.4 ms

summary
  twoPointers
    39.93x faster than hashSet
    58.79x faster than binarySearch
*/

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.
