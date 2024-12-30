// Compare execution time: logical OR, nullish coalescing operator, ternary operator, if-else
// From LeetCode: 2068. Check Whether Two Strings are Almost Equivalent, Easy

const logicalOR1 = function (chars: string[]) {
  const map = new Map()
  for (const char of chars) {
    map.set(char, map.get(char) + 1 || 1)
  }
}

const logicalOR2 = function (chars: string[]) {
  const map = new Map()
  for (const char of chars) {
    map.set(char, (map.get(char) || 0) + 1)
  }
}

const nullishCoalescing = function (chars: string[]) {
  const map = new Map()
  for (const char of chars) {
    map.set(char, (map.get(char) ?? 0) + 1)
  }
}

const ternary = function (chars: string[]) {
  const map = new Map()
  for (const char of chars) {
    map.set(char, (map.get(char) ?? 0) + 1)
  }
}

const ifElse = function (chars: string[]) {
  const map = new Map()
  for (const char of chars) {
    if (map.get(char)) {
      map.set(char, map.get(char) + 1)
    } else {
      map.set(char, 1)
    }
  }
}

// Test array generation variants
const testArr: string[] = Array.from({ length: 100_000 }, () => {
  return String.fromCharCode(97 + Math.floor(Math.random() * 26))
})
// const testArr: string[] = Array.from({ length: 100_000 }, () =>
//   String.fromCharCode(97 + Math.floor(Math.random() * 26))
// )
// const testArr: string[] = Array(100_000).fill(0).map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'logicalOR1',
  baseline: true,
  fn: () => {
    logicalOR1(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'logicalOR2',
  fn: () => {
    logicalOR2(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'nullishCoalescing',
  fn: () => {
    nullishCoalescing(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'ternary',
  fn: () => {
    ternary(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'ifElse',
  fn: () => {
    ifElse(testArr)
  },
})

/* 30.12.2024
❯ deno bench _benchmarks/benchmark-map-operators.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-map-operators.ts
    CPU | Apple M1 Max
Runtime | Deno 2.1.4 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-map-operators.ts

benchmark           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------- ----------------------------- --------------------- --------------------------
logicalOR1                   4.3 ms         230.1 (  4.1 ms …   4.6 ms)   4.4 ms   4.6 ms   4.6 ms
logicalOR2                   4.2 ms         236.8 (  4.0 ms …   5.1 ms)   4.3 ms   4.5 ms   5.1 ms
nullishCoalescing            4.1 ms         241.8 (  4.0 ms …   4.6 ms)   4.1 ms   4.5 ms   4.6 ms
ternary                      4.2 ms         240.9 (  4.1 ms …   4.7 ms)   4.2 ms   4.6 ms   4.7 ms
ifElse                       5.3 ms         189.3 (  5.2 ms …   5.8 ms)   5.3 ms   5.5 ms   5.8 ms

summary
  logicalOR1
     1.05x slower than nullishCoalescing
     1.05x slower than ternary
     1.03x slower than logicalOR2
     1.22x faster than ifElse
*/
