// Compare time of execution of 2 loops with single logic or 1 loop with double logic
// From LeetCode: 1758. Minimum Changes To Make Alternating Binary String

/*
  10010100 - Original string

  10101010 - If count as is: 5 alterations
    ^^^^^
  01010101 - If count with first bit flipped: 3 alterations
  ^^     ^
*/

const minOperationsWithIteration = function (s) {
  const splitS = s.split('')
  let countS = 0
  for (let i = 1; i < splitS.length; i++) {
    if (splitS[i] === splitS[i - 1]) {
      countS++
      splitS[i] = splitS[i] === '1' ? '0' : '1'
    }
  }

  const splitSMod = s.split('')
  splitSMod[0] = splitSMod[0] === '1' ? '0' : '1'
  let countSMod = 1
  for (let i = 1; i < splitSMod.length; i++) {
    if (splitSMod[i] === splitSMod[i - 1]) {
      countSMod++
      splitSMod[i] = splitSMod[i] === '1' ? '0' : '1'
    }
  }
  return Math.min(countS, countSMod)
}

const minOperationsWithSelection = function (s) {
  const splitS = s.split('')
  let countS = 0

  const splitSMod = s.split('')
  splitSMod[0] = splitSMod[0] === '1' ? '0' : '1'
  let countSMod = 1

  for (let i = 1; i < splitS.length; i++) {
    if (splitS[i] === splitS[i - 1]) {
      countS++
      splitS[i] = splitS[i] === '1' ? '0' : '1'
    }
    if (splitSMod[i] === splitSMod[i - 1]) {
      countSMod++
      splitSMod[i] = splitSMod[i] === '1' ? '0' : '1'
    }
  }
  return Math.min(countS, countSMod)
}

// prettier-ignore
const testString = Array.from({ length: 100_000_000 }, (_, i) => (i = Math.random() > 0.5 ? '0' : '1')).join('')

Deno.bench({
  name: 'minOperationsWithIteration',
  baseline: true,
  fn: () => {
    minOperationsWithIteration(testString)
  },
})

Deno.bench({
  name: 'minOperationsWithSelection',
  fn: () => {
    minOperationsWithSelection(testString)
  },
})

/* 13.11.2024
❯ deno bench benchmark-iteration-vs-selection-time.js
Check file:///Users/user/dev/_experimental/_snippets/benchmark-iteration-vs-selection-time.js
    CPU | Apple M1 Max
Runtime | Deno 2.0.6 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_snippets/benchmark-iteration-vs-selection-time.js

benchmark                    time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------------------- ----------------------------- --------------------- --------------------------
minOperationsWithIteration            1.3 ms         757.7 (  1.2 ms …   1.6 ms)   1.4 ms   1.6 ms   1.6 ms
minOperationsWithSelection          920.8 µs         1,086 (786.5 µs …   3.2 ms) 958.4 µs   2.0 ms   2.2 ms

summary
  minOperationsWithIteration
     1.43x slower than minOperationsWithSelection
*/
