// Gemini 2.5 Pro https://g.co/gemini/share/09087b9d307f
// Function to simulate flips and return detailed results
function simulateFlips(quantity) {
  // Handle edge case, although not in our list
  if (quantity <= 0) {
    return { heads: 0, tails: 0, headsRatio: 0, tailsRatio: 0, differ: 0, quantity: 0 }
  }

  let heads = 0
  // Using >= 0.5 assigns one outcome to exactly half the possibilities (2^52)
  // in the common k/2^53 model for Math.random(), ensuring theoretical fairness.
  for (let i = 0; i < quantity; i++) {
    if (Math.random() >= 0.5) {
      heads++
    }
  }
  const tails = quantity - heads

  const headsRatio = (heads / quantity) * 100
  const tailsRatio = (tails / quantity) * 100 // Or simply 100 - headsRatio
  // The absolute difference between the two percentages
  const differ = Math.abs(headsRatio - tailsRatio)

  return {
    heads: heads,
    tails: tails,
    headsRatio: headsRatio,
    tailsRatio: tailsRatio,
    differ: differ,
    quantity: quantity, // Include quantity in result object
  }
}

// Function to generate a single line of the ASCII histogram
function generateHistogramLine(result, maxBarWidth, maxDifferValue) {
  const { quantity, differ } = result
  const barValue = Math.max(0, differ) // Ensure difference isn't negative

  // Calculate the number of characters for the bar based on the scale
  let barWidth = 0
  if (maxDifferValue > 0.00001) {
    // Avoid division by zero or near-zero
    // Scale: barWidth / maxBarWidth = barValue / maxDifferValue
    barWidth = Math.round((barValue / maxDifferValue) * maxBarWidth)
  }
  // Ensure bar width doesn't exceed maximum, even if differ > maxDifferValue somehow
  barWidth = Math.min(barWidth, maxBarWidth)

  const bar = '#'.repeat(barWidth) // The histogram bar itself
  const qStr = quantity.toString().padStart(8, ' ') // Pad quantity for alignment
  const diffStr = differ.toFixed(4).padStart(8, ' ') // Pad difference percentage for alignment

  // Format: Flips: QUANTITY | Diff: DIFFER% | BAR
  return `Flips: ${qStr} | Diff: ${diffStr}% | ${bar}`
}

// --- Main Execution ---

const quantities = [100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000]
const results = []
const maxBarWidth = 60 // Adjust desired width of the longest bar

console.log('Running coin flip simulations...')

// Run simulation for each quantity
quantities.forEach((q) => {
  const result = simulateFlips(q)
  results.push(result)
  // Provide feedback for long runs
  if (q >= 10000) {
    console.log(` - Completed ${q} flips (Difference: ${result.differ.toFixed(4)}%)...`)
  }
})
console.log('Simulations complete.\n')

// Determine histogram scale dynamically
let maxObservedDiffer = 0
results.forEach((r) => {
  if (r.differ > maxObservedDiffer) {
    maxObservedDiffer = r.differ
  }
})

// Set the scale ceiling: Use the largest observed difference,
// but ensure it's at least a minimum value (e.g., 1%) to avoid overly large bars if all differences are tiny.
// Add a small margin (e.g., 10%) to the max observed difference for better visualization.
const maxDifferForScale = Math.max(1.0, maxObservedDiffer * 1.1)

// --- Generate and Print Histogram ---

console.log(`Coin Flip Difference Histogram`)
console.log(
  `(Scale: Full bar width of ${maxBarWidth} chars represents approx. ${maxDifferForScale.toFixed(
    2
  )}% difference)`
)
const separator = '-'.repeat(maxBarWidth + 30) // Adjust separator length based on text + maxBarWidth
console.log(separator)

results.forEach((r) => {
  const line = generateHistogramLine(r, maxBarWidth, maxDifferForScale)
  console.log(line)
})

console.log(separator)
console.log(
  '\nNote: Results depend on pseudo-random numbers and will vary slightly on each execution.'
)
console.log(
  'Observe how the difference percentage and the histogram bar tend to decrease as the number of flips increases.'
)

// Optional: Print raw results summary
// console.log('\nRaw Results Summary:')
// results.forEach((r) => {
//   console.log(
//     ` Flips: ${r.quantity.toString().padStart(8)} | Heads: ${r.heads
//       .toString()
//       .padStart(8)} | Tails: ${r.tails.toString().padStart(8)} | Diff: ${r.differ.toFixed(4)}%`
//   )
// })
