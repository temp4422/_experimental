// One line
console.log(new Set(document.body.innerHTML.match(/thread_[A-Za-z0-9]+/g) || []))
threadList.forEach(async (thread) => await openai.beta.threads.del(thread))

// Full
const html = document.body.innerHTML
const threadIdRegex = /thread_[A-Za-z0-9]+/g // Regular expression to match thread IDs
const threadIds = html.match(threadIdRegex) || []
const threadIdsSet = new Set(threadIds)

console.log(threadIdsSet)

// Delete threads if needed
const threadList = []
for (const thread of threadList) {
  await openai.beta.threads.del(thread)
}
