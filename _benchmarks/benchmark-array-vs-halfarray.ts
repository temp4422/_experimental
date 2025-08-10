// Compare performance of array vs half array
// From LeetCode: 1304. Find N Unique Integers Sum up to Zero, Easy

var sumZero = function (n: number): number[] {
  const uniqueArr = []
  let half = Math.floor(n / 2)
  for (let i = 0; i < n; i++) {
    if (half === 0 && n % 2 === 0) half--
    uniqueArr.push(half--)
  }
  return uniqueArr
}

var sumZeroHalf = function (n: number): number[] {
  const res = []
  for (let i = 1; i <= Math.floor(n / 2); i++) {
    res.push(i, -i)
  }
  if (n % 2 !== 0) res.push(0)
  return res
}

// Test array generation
// prettier-ignore
const testNumber: number = 1_000_000

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'sumZero',
  baseline: true,
  fn: () => {
    sumZero(testNumber)
  },
})
// @ts-ignore
Deno.bench({
  name: 'sumZeroHalf',
  fn: () => {
    sumZeroHalf(testNumber)
  },
})

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.

/*
10.08.2025

UNEXPECTED results:
when testNumber === 1_000, sumZero 1.13x >SLOWER< than sumZeroHalf
when testNumber === 10_000, sumZero 1.62x FASTER than sumZeroHalf
when testNumber === 100_000, sumZero 1.28x FASTER than sumZeroHalf
when testNumber === 1_000_000, sumZero 1.05x FASTER than sumZeroHalf
when testNumber === 10_000_000, sumZero 1.42x >SLOWER< than sumZeroHalf
when testNumber === 100_000_000, sumZero 1.01x FASTER than sumZeroHalf
when testNumber === 1_000_000_000, error: RangeError: Invalid array lengths

// testNumber = 1_000_000
❯ deno bench _benchmarks/benchmark-array-vs-halfarray.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-array-vs-halfarray.ts
    CPU | Apple M1 Max
Runtime | Deno 2.2.12 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-array-vs-halfarray.ts

benchmark     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------- ----------------------------- --------------------- --------------------------
sumZero                5.3 ms         189.5 (  4.4 ms …  12.4 ms)   5.7 ms   6.5 ms  12.4 ms
sumZeroHalf            5.5 ms         182.4 (  4.7 ms …   6.6 ms)   5.9 ms   6.5 ms   6.6 ms

summary
  sumZero
     1.04x faster than sumZeroHalf
*/
