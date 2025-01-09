// Compare execution time: forof loop vs map method
// From LeetCode: 2114. Maximum Number of Words Found in Sentences, Easy

var forOfWords = function (sentences: string[]): number {
  let maxNumberOfWords: number = 0
  for (const sentence of sentences) {
    const words: string[] = sentence.split(' ')
    if (words.length >= maxNumberOfWords) maxNumberOfWords = words.length
  }
  return maxNumberOfWords
}

var mapWords = function (sentences: string[]): number {
  // Alternative https://leetcode.com/problems/maximum-number-of-words-found-in-sentences/solutions/1896320/1-line
  return Math.max(...sentences.map((item) => item.split(' ').length))
}

// Test array generation
const testArr: string[] = Array.from({ length: 100_000 }, () => {
  return Array.from({ length: Math.floor(Math.random() * 20) + 1 }, () => {
    return Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => {
      return String.fromCharCode(97 + Math.floor(Math.random() * 26))
    }).join('')
  }).join(' ')
})

// Benchmarks
// @ts-ignore
Deno.bench({
  name: 'forOfWords',
  baseline: true,
  fn: () => {
    forOfWords(testArr)
  },
})
// @ts-ignore
Deno.bench({
  name: 'mapWords',
  fn: () => {
    mapWords(testArr)
  },
})

/*
08.07.2021, deno 2.1.4

IMPORTANT! If array contain 1_000_000 elements, got: "mapWords error: RangeError: Maximum call stack size exceeded"

❯ deno bench _benchmarks/benchmark-forof-vs-map.ts
Check file:///Users/user/dev/_experimental/_benchmarks/benchmark-forof-vs-map.ts
    CPU | Apple M1 Max
Runtime | Deno 2.1.4 (aarch64-apple-darwin)

file:///Users/user/dev/_experimental/_benchmarks/benchmark-forof-vs-map.ts

benchmark    time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------ ----------------------------- --------------------- --------------------------
forOfWords           39.4 ms          25.4 ( 39.1 ms …  40.1 ms)  39.6 ms  40.1 ms  40.1 ms
mapWords             40.0 ms          25.0 ( 39.4 ms …  40.9 ms)  40.3 ms  40.9 ms  40.9 ms

summary
  forOfWords
     1.02x faster than mapWords
*/
