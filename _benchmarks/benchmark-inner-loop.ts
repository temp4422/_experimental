// Compare execution time: inner loop in for loop vs inner loop in while loop
// From LeetCode: 2224. Minimum Number of Operations to Convert Time, Easy

function inForLoop(quantity: number) {
  const numberMinutes = [60, 15, 5, 1]

  for (let number of numberMinutes) {
    while (quantity >= number) {
      quantity -= number
    }
  }
}

function inWhileLoop(quantity: number) {
  const numberMinutes = [60, 15, 5, 1]

  while (quantity) {
    for (let number of numberMinutes) {
      if (quantity - number >= 0) {
        quantity -= number
        break
      }
    }
  }
}

// Test array generation
const testArr: number = 1_000_000_000

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'inForLoop',
  baseline: true,
  fn: () => {
    inForLoop(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'inWhileLoop',
  fn: () => {
    inWhileLoop(testArr)
  },
})

/*
27.01.2025, deno 2.1.7

IMPORTANT! The bigger quantity, the bigger difference in execution time

❯ deno bench _benchmarks/benchmark-inner-loop.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-inner-loop.ts
    CPU | Apple M1 Max
Runtime | Deno 2.1.7 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-inner-loop.ts

benchmark     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------- ----------------------------- --------------------- --------------------------
inForLoop              7.9 ms         126.1 (  7.7 ms …   8.4 ms)   8.0 ms   8.4 ms   8.4 ms
inWhileLoop           34.1 ms          29.3 ( 33.5 ms …  36.0 ms)  34.3 ms  36.0 ms  36.0 ms

summary
  inForLoop
     4.30x faster than inWhileLoop

*/
