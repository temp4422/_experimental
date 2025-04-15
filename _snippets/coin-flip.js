const runs = 100
const flips = 1_000_000

function flipCoin(quantity) {
  if (typeof quantity != 'number' || quantity < 1) {
    return console.log(`Wrong input`)
  }

  // // Alternative with crypto module
  // function getRandomCrypto(length) {
  //   let randomBuffer = crypto.getRandomValues(new Uint32Array(1))
  //   return randomBuffer[0] % length
  // }

  let streak = 0
  let currentStreak = 0
  let lastHead = false

  let heads = 0
  let tails = 0

  for (let i = 0; i < quantity; i++) {
    // if (getRandomCrypto(2)) heads++
    if (Math.random() > 0.5 ? 1 : 0) {
      heads++

      if (!lastHead) {
        currentStreak = 0
        lastHead = true
      }

      currentStreak++
      streak = Math.max(streak, currentStreak)
    } else {
      tails++

      if (lastHead) {
        currentStreak = 0
        lastHead = false
      }

      currentStreak++
      streak = Math.max(streak, currentStreak)
    }
  }

  let headsRatio = (heads / (heads + tails)) * 100
  let tailsRatio = (tails / (heads + tails)) * 100
  let diff = Math.abs(headsRatio - tailsRatio)

  let output = `
  Ratio: ${headsRatio.toFixed(2)}:${tailsRatio.toFixed(2)}
  Differ: ${diff.toFixed(2)}%
  Heads: ${heads}
  Tails: ${tails}
  Longest Streak: ${streak}
  `
  // console.log(output)
  return [diff, streak]
}
// flipCoin(flips)

function runDiff(quantity) {
  if (typeof quantity != 'number' || quantity < 1) {
    return console.log(`Wrong input`)
  }

  let sumDiff = 0
  let maxDiff = 0
  let minDiff = Infinity

  let sumStreak = 0
  let maxStreak = 0
  let minStreak = Infinity

  for (let i = 0; i < quantity; i++) {
    let [diff, streak] = flipCoin(flips)

    sumDiff += diff
    maxDiff = Math.max(maxDiff, diff)
    minDiff = Math.min(minDiff, diff)

    sumStreak += streak
    maxStreak = Math.max(maxStreak, streak)
    minStreak = Math.min(minStreak, streak)
  }

  let avgDiff = sumDiff / quantity
  let avgStreak = sumStreak / quantity

  let output = `
  Runs: ${quantity}x
  Flips: ${flips}

  Difference:
  - max: ${maxDiff.toFixed(2)}%
  - avg:  ${avgDiff.toFixed(2)}%
  - min: ${minDiff.toFixed(2)}%

  Streak:
  - max: ${maxStreak}
  - avg:  ${avgStreak.toFixed(2)}
  - min: ${minStreak}
  `
  console.log(output)
}
runDiff(runs)

/*
  11.04.2025 Test results
  What quantity of flips is enough to output difference no more than 0.5%, no matter what?
  -----------
  Math.random()
  My result is 1_000_000 flips need to be made, to be sure, that difference will not exceed 0.5%.
  Tested on 100_000 runs x 4 times, max difference was 0.48%.

  Gemini suggest 433_228 and 780_396 flips to not exceed 0.5%,
  Tested on 100_000 runs x 4 times, max difference was 0.55%

  -----------
  Math.random() vs crypto.getRandomValues(new Uint32Array(1))

  Tested on 1000 runs x 4 times difference:
    random:
      - max 0.41%
      - avg 0.08%
    crypto:
      - max 0.41%
      - avg 0.08%

    Results: same!

  Explanation
  -----------

  Discrete floating-point: the distribution is perfectly symmetrical around 0.5.
  JavaScript's Math.random() doesn't generate infinite possibilities.
  It gives ~2⁵³ different values (due to double-precision limits).
  So, in practice:
  There are exactly 2⁵² possible values less than 0.5
  And 2⁵² possible values from 0.5 to just below 1
  https://chatgpt.com/share/67f8ce04-5b68-8010-a079-3e2268e3ed07

  -----------

  Convergence to Expected Value: The Law of Large Numbers states that as you perform more and more trials (coin flips), the average result (the proportion of heads, heads / total_flips) gets closer and closer to the theoretical expected value. For a fair coin, the expected value (probability) of heads is exactly 0.5.
  https://g.co/gemini/share/09087b9d307f
*/
