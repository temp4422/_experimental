// Compare execution time: let vs const in forof loop

var letLoop = function (arr: number[]): void {
  let sum = 0
  for (let num of arr) {
    sum += num
  }
}

var constLoop = function (arr: number[]): void {
  let sum = 0
  for (const num of arr) {
    sum += num
  }
}

// Test array generation
const testArr: number[] = Array.from({ length: 100_000_000 }, (_, i) => i++)

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'letLoop',
  baseline: true,
  fn: () => {
    letLoop(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'constLoop',
  fn: () => {
    constLoop(testArr)
  },
})

/*
06.02.2025

Result: no difference.

❯ deno bench _benchmarks/benchmark-let-vs-const.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-let-vs-const.ts
    CPU | Apple M1 Max
Runtime | Deno 2.1.9 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-let-vs-const.ts

benchmark   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------- ----------------------------- --------------------- --------------------------
letLoop            661.7 ms           1.5 (659.5 ms … 666.7 ms) 662.6 ms 666.7 ms 666.7 ms
constLoop          659.5 ms           1.5 (655.8 ms … 665.3 ms) 663.4 ms 665.3 ms 665.3 ms

summary
  letLoop
     1.00x slower than constLoop
*/
