// Compare execution time: concat vs if
// From LeetCode: 2363. Merge Similar Items, Easy

var mergeSimilarItemsConcat = function (items1: number[][], items2: number[][]): void {
  const map = new Map()
  for (const [value, weight] of [...items1, ...items2]) {
    map.set(value, (map.get(value) ?? 0) + weight)
  }
}

var mergeSimilarItemsIf = function (items1: number[][], items2: number[][]): void {
  const maxArrayLength = Math.max(items1.length, items2.length)
  const map = new Map()
  for (let i = 0; i < maxArrayLength; i++) {
    if (items1[i]) {
      map.set(items1[i][0], (map.get(items1[i][0]) ?? 0) + items1[i][1])
    }
    if (items2[i]) {
      map.set(items2[i][0], (map.get(items2[i][0]) ?? 0) + items2[i][1])
    }
  }
}

// Test array generation
// prettier-ignore
const testArr1: number[][] = Array.from({ length: 100_000 }, (_, i) => [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])
// prettier-ignore
const testArr2: number[][] = Array.from({ length: 100_000 }, (_, i) => [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'mergeSimilarItemsConcat',
  baseline: true,
  fn: () => {
    mergeSimilarItemsConcat(testArr1, testArr2)
  },
})
// @ts-ignore
Deno.bench({
  name: 'mergeSimilarItemsIf',
  fn: () => {
    mergeSimilarItemsIf(testArr1, testArr2)
  },
})

/*
14.02.2025

❯ deno bench _benchmarks/benchmark-concat-vs-if.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-concat-vs-if.ts
    CPU | Apple M1 Max
Runtime | Deno 2.1.9 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-concat-vs-if.ts

benchmark                 time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------- ----------------------------- --------------------- --------------------------
mergeSimilarItemsConcat            8.7 ms         115.3 (  7.5 ms …  15.3 ms)   8.6 ms  15.3 ms  15.3 ms
mergeSimilarItemsIf                4.7 ms         211.8 (  4.6 ms …   5.2 ms)   4.7 ms   5.0 ms   5.2 ms

summary
  mergeSimilarItemsConcat
     1.84x slower than mergeSimilarItemsIf
*/
