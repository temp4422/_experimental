// Compare execution time: forof loop vs map method
// From LeetCode: 2114. Maximum Number of Words Found in Sentences, Easy

var forLoop = function (arr: number[]): void {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
}

var forOfEntriesLoop = function (arr: number[]): void {
  let sum = 0
  for (const [index, value] of arr.entries()) {
    sum += value
  }
}

// Test array generation
const testArr: number[] = Array.from({ length: 100_000 }, (_, i) => i++)

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'forLoop',
  baseline: true,
  fn: () => {
    forLoop(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'forOfEntriesLoop',
  fn: () => {
    forOfEntriesLoop(testArr)
  },
})

/*
02.02.2025

deno bench _benchmarks/benchmark-forof-vs-for.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-forof-vs-for.ts
    CPU | Apple M1 Max
Runtime | Deno 2.1.9 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-forof-vs-for.ts

benchmark          time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------ ----------------------------- --------------------- --------------------------
forLoop                   152.8 µs         6,545 ( 93.1 µs … 270.7 µs) 157.9 µs 190.1 µs 204.3 µs
forOfEntriesLoop          802.3 µs         1,246 (313.4 µs …   2.1 ms)   1.1 ms   1.4 ms   1.7 ms

summary
  forLoop
     5.25x faster than forOfEntriesLoop
*/
