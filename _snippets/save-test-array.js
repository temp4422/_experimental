// saveTestArray.js
import { writeFile } from 'fs/promises'

const TEST_ARRAY_SIZE = 1_000_000

async function saveTestArrayToFile(path = './testArray.json') {
  const arr = Array.from({ length: TEST_ARRAY_SIZE }, (_, i) => i + 1)
  await writeFile(path, JSON.stringify(arr))
  console.log(`Saved test array (${TEST_ARRAY_SIZE}) to ${path}`)
}

// Run only if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  saveTestArrayToFile().catch(console.error)
}
