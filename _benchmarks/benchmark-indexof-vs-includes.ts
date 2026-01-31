// Compare performance of array vs half array
// From LeetCode: 448. Find All Numbers Disappeared in an Array, Easy

var findDisappearedNumbersSet = function (nums) {
  const set = new Set(nums)
  const missedNums = []
  for (let i = 1; i < nums.length + 1; i++) {
    if (!set.has(i)) missedNums.push(i)
  }
  return missedNums
}

var findDisappearedNumbersIndexof = function (nums) {
  const missedNums = []
  for (let i = 1; i < nums.length + 1; i++) {
    if (nums.indexOf(i) == -1) missedNums.push(i)
  }
  return missedNums
}

var findDisappearedNumbersIncludes = function (nums) {
  const missedNums = []
  for (let i = 1; i < nums.length + 1; i++) {
    if (nums.includes(i) == -1) missedNums.push(i)
  }
  return missedNums
}

// Test array generation
// prettier-ignore
const testArr1: number[] = Array.from({ length: 100_000 }, (_, i) => Math.floor(Math.random() * 100) + 1)

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'findDisappearedNumbersSet',
  baseline: true,
  fn: () => {
    findDisappearedNumbersSet(testArr1)
  },
})
// @ts-ignore
Deno.bench({
  name: 'findDisappearedNumbersIndexof',
  fn: () => {
    findDisappearedNumbersIndexof(testArr1)
  },
})
// @ts-ignore
Deno.bench({
  name: 'findDisappearedNumbersIncludes',
  fn: () => {
    findDisappearedNumbersIncludes(testArr1)
  },
})

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.

/*
❯ deno bench _benchmarks/benchmark-indexof-vs-includes.ts
Check _benchmarks/benchmark-indexof-vs-includes.ts
    CPU | Apple M1 Max
Runtime | Deno 2.6.3 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-indexof-vs-includes.ts

| benchmark                        | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| -------------------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| findDisappearedNumbersSet        |          3.9 ms |         258.0 | (  3.8 ms …   6.2 ms) |   3.9 ms |   4.2 ms |   6.2 ms |
| findDisappearedNumbersIndexof    |           2.1 s |           0.5 | (   2.1 s …    2.2 s) |    2.1 s |    2.2 s |    2.2 s |
| findDisappearedNumbersIncludes   |           2.1 s |           0.5 | (   2.1 s …    2.2 s) |    2.1 s |    2.2 s |    2.2 s |

summary
  findDisappearedNumbersSet
   542.20x faster than findDisappearedNumbersIndexof
   544.30x faster than findDisappearedNumbersIncludes


_experimental git:main*  52s
*/
