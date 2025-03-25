// Compare execution time: one loop vs two loops
// From LeetCode: 2578. Split With Minimum Sum, Easy

// One loop
var splitNumOne = function (num: bigint) {
  // prettier-ignore
  let splitNum = num.toString().split('').sort((a,b)=> Number(a) - Number(b))

  let num1 = ''
  let num2 = ''
  for (let i = 0; i < splitNum.length; i++) {
    if (i % 2 === 0) num1 += splitNum[i]
    if (i % 2 === 1) num2 += splitNum[i]
  }

  return Number(num1) + Number(num2)
}

// Two loops
var splitNumTwo = function (num: bigint) {
  // prettier-ignore
  let splitNum = num.toString().split('').sort((a,b)=> Number(a) - Number(b))

  let num1 = ''
  for (let i = 0; i < splitNum.length; i++) {
    if (i % 2 === 0) num1 += splitNum[i]
  }

  let num2 = ''
  for (let i = 0; i < splitNum.length; i++) {
    if (i % 2 === 1) num2 += splitNum[i]
  }

  return Number(num1) + Number(num2)
}

// Test array generation
// Generate random number with 1_000_000 different digits
const testArr1: bigint = (() => {
  let num = '1'
  for (let i = 1; i < 1_000_000; i++) {
    num += Math.floor(Math.random() * 10)
  }
  return BigInt(num)
})()

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'splitNumOne',
  baseline: true,
  fn: () => {
    splitNumOne(testArr1)
  },
})
// @ts-ignore
Deno.bench({
  name: 'splitNumTwo',
  fn: () => {
    splitNumTwo(testArr1)
  },
})

/*
25.03.2025

// Results is unexpected because there are no difference bwteen one loop and two loops

❯ deno bench _benchmarks/benchmark-oneLoop-vs-twoLoops.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-oneLoop-vs-twoLoops.ts
    CPU | Apple M1 Max
Runtime | Deno 2.2.5 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-oneLoop-vs-twoLoops.ts

benchmark     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------- ----------------------------- --------------------- --------------------------
splitNumOne          428.2 ms           2.3 (420.3 ms … 436.3 ms) 430.8 ms 436.3 ms 436.3 ms
splitNumTwo          423.3 ms           2.4 (416.5 ms … 436.1 ms) 424.1 ms 436.1 ms 436.1 ms

summary
  splitNumOne
     1.01x slower than splitNumTwo
*/

export {} // Prevent error: Cannot redeclare block-scoped variable 'testArr1'.
