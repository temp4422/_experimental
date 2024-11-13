// Compare js object vs js hashmap
// From LeetCode: 1748. Sum of Unique Elements, Easy

const sumOfUnique = function (nums) {
  const map = {}
  for (const num of nums) {
    map[num] = map[num] + 1 || 1
  }

  let sumOfUnique = 0
  for (const num in map) {
    if (map[num] === 1) {
      sumOfUnique += Number(num)
    }
  }
  return sumOfUnique
}

const sumOfUniqueHashmap = function (nums) {
  const map = new Map()
  for (const num of nums) {
    map.set(num, map.get(num) + 1 || 1)
  }

  let sumOfUnique = 0
  for (const num of map) {
    if (num[1] === 1) {
      sumOfUnique += num[0]
    }
  }
  return sumOfUnique
}

const testArr = Array.from({ length: 100_000 }, (_, i) => i + 1)

Deno.bench({
  name: 'sumOfUnique',
  baseline: true,
  fn: () => {
    sumOfUnique(testArr)
  },
})

Deno.bench({
  name: 'sumOfUniqueHashmap',
  fn: () => {
    sumOfUniqueHashmap(testArr)
  },
})

/* 10.11.2024
❯ deno bench benchmark-test.js
    CPU | Apple M1 Max
Runtime | Deno 2.0.3 (aarch64-apple-darwin)

file:///Users/user/dev/benchmark-test.js

benchmark            time/iter (avg)        iter/s      (min … max)           p75      p99     p995
-------------------- ----------------------------- --------------------- --------------------------
sumOfUnique                   4.2 ms         237.8 (  3.9 ms …   8.8 ms)   4.2 ms   8.8 ms   8.8 ms
sumOfUniqueHashmap            5.5 ms         181.3 (  4.9 ms …   8.5 ms)   5.6 ms   8.3 ms   8.5 ms

summary
  sumOfUnique
     1.31x faster than sumOfUniqueHashmap
*/
