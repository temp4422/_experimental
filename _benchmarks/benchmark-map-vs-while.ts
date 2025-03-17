// Compare execution time: map vs while
// From LeetCode: 2570. Merge Two 2D Arrays by Summing Values, Easy

var mergeArraysMap = function (nums1: number[][], nums2: number[][]): number[][] {
  const map = new Map()
  for (let [id, value] of [...nums1, ...nums2]) {
    map.set(id, (map.get(id) ?? 0) + value)
  }
  const sortedArr = [...map.entries()].sort((a, b) => a[0] - b[0])
  return sortedArr
}

var mergeArraysWhile1 = function (nums1: number[][], nums2: number[][]): number[][] {
  const mergedArr: number[][] = []
  while (nums1.length || nums2.length) {
    if (nums1.length && nums2.length) {
      if (nums1[0][0] === nums2[0][0]) {
        mergedArr.push([nums1[0][0], nums1[0][1] + nums2[0][1]])
        nums1.shift()
        nums2.shift()
      } else if (nums1[0][0] < nums2[0][0]) {
        mergedArr.push([nums1[0][0], nums1[0][1]])
        nums1.shift()
      } else {
        mergedArr.push([nums2[0][0], nums2[0][1]])
        nums2.shift()
      }
    } else if (nums1.length) {
      mergedArr.push([nums1[0][0], nums1[0][1]])
      nums1.shift()
    } else if (nums2.length) {
      mergedArr.push([nums2[0][0], nums2[0][1]])
      nums2.shift()
    }
  }
  return mergedArr
}

var mergeArraysWhile2 = function (nums1: number[][], nums2: number[][]): number[][] {
  const mergedArr: number[][] = []
  let i = 0
  let j = 0

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i][0] === nums2[j][0]) {
      mergedArr.push([nums1[i][0], nums1[i][1] + nums2[j][1]])
      i++
      j++
    } else if (nums1[i][0] < nums2[j][0]) {
      mergedArr.push(nums1[i++])
    } else {
      mergedArr.push(nums2[j++])
    }
  }

  while (i < nums1.length) mergedArr.push(nums1[i++])
  while (j < nums2.length) mergedArr.push(nums2[j++])

  return mergedArr
}

// Test array generation
// prettier-ignore
const testArr1: number[][] = Array.from({ length: 100_000 }, (_, i) => [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])
// prettier-ignore
const testArr2: number[][] = Array.from({ length: 100_000 }, (_, i) => [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'mergeArraysMap',
  baseline: true,
  fn: () => {
    mergeArraysMap(testArr1, testArr2)
  },
})
// @ts-ignore
Deno.bench({
  name: 'mergeArraysWhile1',
  fn: () => {
    mergeArraysWhile1(testArr1, testArr2)
  },
})
// @ts-ignore
Deno.bench({
  name: 'mergeArraysWhile2',
  fn: () => {
    mergeArraysWhile2(testArr1, testArr2)
  },
})

/*
17.03.2025

❯ deno bench _benchmarks/benchmark-map-vs-while.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-map-vs-while.ts
    CPU | Apple M1 Max
Runtime | Deno 2.2.3 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-map-vs-while.ts

benchmark           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------- ----------------------------- --------------------- --------------------------
mergeArraysMap               9.0 ms         111.4 (  7.9 ms …  11.1 ms)   9.3 ms  11.1 ms  11.1 ms
mergeArraysWhile1           50.0 ns    20,000,000 (  0.0 ps … 947.6 µs)  42.0 ns  84.0 ns  84.0 ns
mergeArraysWhile2            1.6 ns   626,600,000 (  1.5 ns …  38.5 ns)   1.6 ns   2.1 ns   3.0 ns

summary
  mergeArraysMap
  5623000x slower than mergeArraysWhile2
   179500x slower than mergeArraysWhile1
*/
