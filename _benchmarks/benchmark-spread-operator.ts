// Compare execution time: spread operator vs statements
// From LeetCode: 2103. Rings and Rods, Easy

var statements = function (rings: string): void {
  const map = new Map()
  for (let i = 0; i < rings.length; i += 2) {
    let ring = rings[i + 1]
    let colors = map.get(rings[i + 1]) ?? []
    colors.push(rings[i])
    map.set(ring, colors)
  }
}

var statementsNoVars = function (rings: string): void {
  const map = new Map()
  for (let i = 0; i < rings.length; i += 2) {
    map.set(rings[i + 1], (map.get(rings[i + 1]) ?? []).concat(rings[i]))
  }
}

var spread = function (rings: string): void {
  const map = new Map()
  for (let i = 0; i < rings.length; i += 2) {
    let ring = rings[i + 1]
    let colors = [...(map.get(rings[i + 1]) ?? []), rings[i]]
    map.set(ring, colors)
  }
}

// Test array generation
const testArr: string = Array.from({ length: 100_000 }, () => {
  return ['R', 'G', 'B'][Math.floor(Math.random() * 3)] + Math.floor(Math.random() * 10)
}).join('')

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'statements',
  fn: () => statements(testArr),
  baseline: true,
})
// @ts-ignore
Deno.bench({
  name: 'statementsNoVars',
  fn: () => statementsNoVars(testArr),
})
// @ts-ignore
Deno.bench({
  name: 'spread',
  fn: () => spread(testArr),
})

/*
09.01.2025, deno 2.1.4

❯ deno bench _benchmarks/benchmark-spread-operator.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-spread-operator.ts
    CPU | Apple M1 Max
Runtime | Deno 2.1.4 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-spread-operator.ts

benchmark          time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------ ----------------------------- --------------------- --------------------------
statements                  2.0 ms         495.9 (  1.8 ms …   2.9 ms)   2.1 ms   2.5 ms   2.7 ms
statementsNoVars             1.6 s           0.6 (   1.6 s …    1.6 s)    1.6 s    1.6 s    1.6 s
spread                    538.6 ms           1.9 (530.3 ms … 562.4 ms) 542.9 ms 562.4 ms 562.4 ms

summary
  statements
   267.10x faster than spread
   808.50x faster than statementsNoVars
*/
