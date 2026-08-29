#!/usr/bin/env node

/**
 * Local LLM benchmark for Ollama
 *
 * Measures:
 *   - TTFT
 *   - generation tok/s
 *   - total latency
 *   - average quality score (0-10)
 *
 * Produces:
 *   - benchmark-<models>-<date>.md
 *
 * Requirements:
 *   - Node.js 18+
 *   - Ollama running on localhost:11434
 */

import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const OLLAMA_URL = 'http://localhost:11434/api/chat'

/**
 * Models to benchmark.
 *
 * Change only this list to test different models.
 */
const MODELS = ['qwen3.5:9b', 'qwen3.5:9b-mlx']
const RUNS_PER_PROMPT = 1
const KEEP_ALIVE = '10m'
const OPTIONS = {
  temperature: 0,
  seed: 42,
  think: false,
}

/**
 * Each prompt has a deterministic quality rubric.
 *
 * score():
 *   Returns 0..10
 */
const PROMPTS = [
  {
    id: 1,
    category: 'simple',
    prompt: 'Linux terminal command to show hidden files.',
    score(answer) {
      return exactOrContains(answer, ['ls -a', 'ls -la', 'ls -lA']) ? 10 : 0
    },
  },
  {
    id: 2,
    category: 'simple',
    prompt: 'JavaScript: convert a string to lowercase.',
    score(answer) {
      return contains(answer, '.toLowerCase()') ? 10 : 0
    },
  },
  {
    id: 3,
    category: 'reasoning',
    prompt: 'What is 17 * 23?',
    score(answer) {
      return contains(answer, '391') ? 10 : 0
    },
  },
  {
    id: 4,
    category: 'coding',
    prompt: `
Write a JavaScript function that returns the unique values of an array.
Return only the function.
`.trim(),
    score(answer) {
      let score = 0

      if (containsAny(answer, ['new Set', 'Set('])) score += 5
      if (containsAny(answer, ['Array.from', '[...'])) score += 3
      if (containsAny(answer, ['function', '=>'])) score += 2

      return Math.min(score, 10)
    },
  },
  {
    id: 5,
    category: 'coding',
    prompt: `
What is wrong with this JavaScript?

const rows = Array(3).fill([])
rows[0].push(1)

Explain the problem and show the correct version.
`.trim(),
    score(answer) {
      let score = 0

      if (
        containsAny(answer, [
          'same array',
          'same reference',
          'same object',
          'references the same',
          'shared reference',
        ])
      ) {
        score += 5
      }

      if (containsAny(answer, ['Array.from', 'map('])) {
        score += 3
      }

      if (containsAny(answer, ['rows[0]', 'rows[1]', 'rows[2]'])) {
        score += 2
      }

      return Math.min(score, 10)
    },
  },
  {
    id: 6,
    category: 'coding',
    prompt: `
What is the time complexity of binary search?
Give the answer and a one-sentence explanation.
`.trim(),
    score(answer) {
      let score = 0

      if (containsAny(answer, ['O(log n)', 'O(logn)', 'log n'])) {
        score += 7
      }

      if (containsAny(answer, ['halves', 'half', 'divide'])) {
        score += 3
      }

      return Math.min(score, 10)
    },
  },
  {
    id: 7,
    category: 'systems',
    prompt: `
What is the difference between Docker CMD and ENTRYPOINT?
Give a practical example.
`.trim(),
    score(answer) {
      let score = 0

      if (contains(answer, 'CMD')) score += 2
      if (contains(answer, 'ENTRYPOINT')) score += 2

      if (containsAny(answer, ['override', 'overridden', 'default command', 'arguments'])) {
        score += 3
      }

      if (containsAny(answer, ['example', 'docker run'])) {
        score += 3
      }

      return Math.min(score, 10)
    },
  },
  {
    id: 8,
    category: 'systems',
    prompt: `
What does chmod 755 mean?
Explain each permission group.
`.trim(),
    score(answer) {
      let score = 0

      if (contains(answer, '755')) score += 2
      if (containsAny(answer, ['owner', 'user'])) score += 2
      if (contains(answer, 'group')) score += 2
      if (containsAny(answer, ['others', 'other'])) score += 2

      if (containsAny(answer, ['rwx', 'read', 'write', 'execute'])) {
        score += 2
      }

      return Math.min(score, 10)
    },
  },
  {
    id: 9,
    category: 'reasoning',
    prompt: `
A farmer has chickens and cows.
There are 35 heads and 94 legs.
How many chickens and cows are there?
Show the reasoning.
`.trim(),
    score(answer) {
      let score = 0

      if (contains(answer, '23')) score += 4
      if (contains(answer, '12')) score += 4

      if (containsAny(answer, ['heads', 'legs', 'equation'])) {
        score += 2
      }

      return Math.min(score, 10)
    },
  },
  {
    id: 10,
    category: 'technical',
    prompt: `
A JavaScript function is slow because it repeatedly searches an array
inside a loop.

Explain how replacing the array with a Set can improve performance.
Include time-complexity reasoning.
`.trim(),
    score(answer) {
      let score = 0

      if (contains(answer, 'Set')) score += 2

      if (containsAny(answer, ['O(1)', 'constant time'])) {
        score += 3
      }

      if (containsAny(answer, ['O(n)', 'linear'])) {
        score += 2
      }

      if (containsAny(answer, ['includes', 'search', 'lookup'])) {
        score += 3
      }

      return Math.min(score, 10)
    },
  },
]

/**
 * Case-insensitive helpers.
 */
function normalized(value) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

function contains(answer, value) {
  return normalized(answer).includes(normalized(value))
}

function containsAny(answer, values) {
  return values.some((value) => contains(answer, value))
}

function exactOrContains(answer, values) {
  return values.some((value) => contains(answer, value))
}

/**
 * Sleep.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Median.
 */
function median(values) {
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  }

  return sorted[middle]
}

/**
 * Average.
 */
function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

/**
 * Format.
 */
function formatMs(value) {
  return `${(value / 1000).toFixed(3)} s`
}

function formatTps(value) {
  return `${value.toFixed(2)} tok/s`
}

function formatQuality(value) {
  return `${value.toFixed(1)}/10`
}

/**
 * Run one model.
 */
async function runModel(model, prompt) {
  const startedAt = performance.now()

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,

      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],

      stream: true,

      think: OPTIONS.think,

      keep_alive: KEEP_ALIVE,

      options: {
        temperature: OPTIONS.temperature,
        seed: OPTIONS.seed,
      },
    }),
  })

  if (!response.ok) {
    const body = await response.text()

    throw new Error(`Ollama returned ${response.status}: ${body}`)
  }

  if (!response.body) {
    throw new Error('Ollama returned no response body')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  let buffer = ''
  let firstTokenAt = null
  let finalResponse = null

  while (true) {
    const { value, done } = await reader.read()

    if (done) break

    buffer += decoder.decode(value, {
      stream: true,
    })

    const lines = buffer.split('\n')

    buffer = lines.pop() ?? ''

    for (const line of lines) {
      if (!line.trim()) continue

      const chunk = JSON.parse(line)

      if (firstTokenAt === null && chunk.message?.content) {
        firstTokenAt = performance.now()
      }

      if (chunk.done) {
        finalResponse = chunk
      }
    }
  }

  const endedAt = performance.now()

  if (!finalResponse) {
    throw new Error('Ollama stream ended without a final response')
  }

  const totalLatency = endedAt - startedAt
  const ttft = firstTokenAt === null ? totalLatency : firstTokenAt - startedAt
  const outputTokens = finalResponse.eval_count ?? 0
  const evalDurationMs = (finalResponse.eval_duration ?? 0) / 1e6
  const generationTokPerSec = evalDurationMs > 0 ? outputTokens / (evalDurationMs / 1000) : 0
  const promptTokens = finalResponse.prompt_eval_count ?? 0
  const promptEvalDurationMs = (finalResponse.prompt_eval_duration ?? 0) / 1e6
  const loadDurationMs = (finalResponse.load_duration ?? 0) / 1e6

  return {
    model,
    promptTokens,
    outputTokens,
    ttft,
    totalLatency,
    generationTokPerSec,
    promptEvalDurationMs,
    loadDurationMs,
    answer: finalResponse.message?.content ?? '',
  }
}

/**
 * Warm up.
 */
async function warmup(model) {
  process.stdout.write(`  Warming up ${model}... `)

  await runModel(model, 'Reply with exactly one word: ready')

  console.log('done')
}

/**
 * Benchmark a model.
 */
async function benchmarkModel(model) {
  console.log(`\n=== ${model} ===`)

  await warmup(model)

  const results = []

  for (const test of PROMPTS) {
    process.stdout.write(
      `  [${String(test.id).padStart(2, '0')}/${PROMPTS.length}] ` + `${test.category.padEnd(10)} `,
    )

    const runs = []

    for (let run = 0; run < RUNS_PER_PROMPT; run++) {
      const result = await runModel(model, test.prompt)

      runs.push(result)

      await sleep(100)
    }

    const ttftValues = runs.map((run) => run.ttft)
    const totalValues = runs.map((run) => run.totalLatency)
    const tpsValues = runs.map((run) => run.generationTokPerSec)

    /**
     * Score every run independently.
     */
    const qualityScores = runs.map((run) => test.score(run.answer))
    const quality = average(qualityScores)

    /**
     * Keep the last answer.
     */
    const answer = runs.at(-1).answer

    const result = {
      id: test.id,
      category: test.category,
      prompt: test.prompt,
      ttftMedian: median(ttftValues),
      totalLatencyMedian: median(totalValues),
      tokPerSecMedian: median(tpsValues),
      ttftAverage: average(ttftValues),
      totalLatencyAverage: average(totalValues),
      tokPerSecAverage: average(tpsValues),
      quality,
      promptTokens: runs.at(-1).promptTokens,
      outputTokens: runs.at(-1).outputTokens,
      loadDuration: median(runs.map((run) => run.loadDurationMs)),
      answer,
    }

    results.push(result)

    console.log(
      `${formatMs(result.ttftMedian).padStart(8)} | ` +
        `${formatTps(result.tokPerSecMedian).padStart(12)} | ` +
        `${formatMs(result.totalLatencyMedian).padStart(10)} | ` +
        `${formatQuality(result.quality).padStart(7)}`,
    )
  }

  return results
}

/**
 * Create Markdown report.
 */
function createMarkdown(allResults) {
  const models = Object.keys(allResults)

  const lines = []

  lines.push('# Local LLM Benchmark')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push(`Models: ${models.join(', ')}`)
  lines.push(`Prompts: ${PROMPTS.length}`)
  lines.push(`Runs per prompt: ${RUNS_PER_PROMPT}`)
  lines.push(`Temperature: ${OPTIONS.temperature}`)
  lines.push(`Seed: ${OPTIONS.seed}`)
  lines.push(`Thinking: ${OPTIONS.think ? 'enabled' : 'disabled'}`)
  lines.push('')

  /**
   * Overall results.
   */
  lines.push('## Overall Results')
  lines.push('')

  lines.push('| Model | TTFT | tok/s | Total latency | Latency % Diff | Avg Quality |')

  lines.push('|---|---:|---:|---:|---:|---:|')

  let firstModelLatency = null

  for (const model of models) {
    const results = allResults[model]

    const totalLatency = median(results.map((result) => result.totalLatencyMedian))

    if (firstModelLatency === null) {
      firstModelLatency = totalLatency
    }

    const percentDiff = ((totalLatency - firstModelLatency) / firstModelLatency) * 100

    lines.push(
      [
        model,

        formatMs(median(results.map((result) => result.ttftMedian))),
        formatTps(median(results.map((result) => result.tokPerSecMedian))),
        formatMs(totalLatency),
        `${percentDiff > 0 ? '+' : ''}${percentDiff.toFixed(1)}%`,
        formatQuality(average(results.map((result) => result.quality))),
      ].join(' | '),
    )
  }

  lines.push('')

  /**
   * Category results.
   */
  lines.push('## By Category')
  lines.push('')
  lines.push('| Model | Category | TTFT | tok/s | Total latency | Avg Quality |')
  lines.push('|---|---|---:|---:|---:|---:|')

  for (const model of models) {
    const categories = [...new Set(allResults[model].map((result) => result.category))]

    for (const category of categories) {
      const results = allResults[model].filter((result) => result.category === category)

      lines.push(
        [
          model,
          category,
          formatMs(median(results.map((result) => result.ttftMedian))),
          formatTps(median(results.map((result) => result.tokPerSecMedian))),
          formatMs(median(results.map((result) => result.totalLatencyMedian))),
          formatQuality(average(results.map((result) => result.quality))),
        ].join(' | '),
      )
    }
  }

  lines.push('')

  /**
   * Individual tests.
   *
   * Generates columns dynamically
   * for any number of models.
   */
  lines.push('## Individual Tests')
  lines.push('')

  const individualHeader = ['#', 'Category']

  for (const model of models) {
    individualHeader.push(`${model} TTFT`, `${model} tok/s`, `${model} Quality`)
  }

  lines.push(`| ${individualHeader.join(' | ')} |`)

  lines.push(
    `| ${individualHeader
      .map((_, index) => (index === 0 ? '---:' : index === 1 ? '---' : '---:'))
      .join(' | ')} |`,
  )

  const resultsByModel = new Map()

  for (const model of models) {
    resultsByModel.set(model, new Map(allResults[model].map((result) => [result.id, result])))
  }

  for (const test of PROMPTS) {
    const row = [test.id, test.category]

    for (const model of models) {
      const result = resultsByModel.get(model).get(test.id)

      row.push(
        formatMs(result.ttftMedian),
        result.tokPerSecMedian.toFixed(2),
        formatQuality(result.quality),
      )
    }

    lines.push(`| ${row.join(' | ')} |`)
  }

  lines.push('')

  /**
   * Quality score.
   */
  lines.push('## Quality Score')
  lines.push('')
  lines.push('Each run is scored independently using a prompt-specific rubric.')
  lines.push('The reported quality score is the arithmetic average across all runs.')
  lines.push('')
  lines.push('- 0–2: incorrect')
  lines.push('- 3–5: partially correct')
  lines.push('- 6–8: correct but incomplete')
  lines.push('- 9–10: correct and sufficiently complete')
  lines.push('')

  /**
   * Methodology.
   */
  lines.push('## Methodology')
  lines.push('')
  lines.push('- Each model is warmed up before benchmarking.')
  lines.push('- Each prompt is executed multiple times.')
  lines.push('- Median timing is used to reduce performance noise.')
  lines.push('- Quality is averaged across all runs.')
  lines.push('- Temperature is fixed at 0.')
  lines.push('- Seed is fixed at 42.')
  lines.push(`- Thinking is ${OPTIONS.think ? 'enabled' : 'disabled'}.`)
  lines.push(`- Models are kept loaded for ${KEEP_ALIVE}.`)
  lines.push('- TTFT is measured until the first generated content chunk.')
  lines.push('- Generation tok/s comes from Ollama eval_count / eval_duration.')
  lines.push('- Quality is scored independently from performance metrics.')
  lines.push('')

  return lines.join('\n')
}

/**
 * Generate benchmark filename with models and date.
 */
function generateBenchmarkFilename(models) {
  const date = new Date().toISOString().split('T')[0]
  const modelNames = models.map((model) => model.replace(/[:/]/g, '-')).join('-')
  return `benchmark-${modelNames}-${date}.md`
}

/**
 * Check Ollama.
 */
async function checkOllama() {
  try {
    const response = await fetch('http://localhost:11434/api/tags')

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    throw new Error(
      `Cannot connect to Ollama at http://localhost:11434.\n` +
        `Make sure Ollama is running.\n\n` +
        `Original error: ${error.message}`,
    )
  }
}

/**
 * Main.
 */
async function main() {
  console.log('Local LLM benchmark')
  console.log('===================')

  await checkOllama()
  console.log(`Models: ${MODELS.join(', ')}`)
  console.log(`Prompts: ${PROMPTS.length}`)
  console.log(`Runs per prompt: ${RUNS_PER_PROMPT}`)
  console.log(`Temperature: ${OPTIONS.temperature}`)
  console.log(`Seed: ${OPTIONS.seed}`)
  console.log(`Thinking: ${OPTIONS.think ? 'enabled' : 'disabled'}`)
  console.log()

  const allResults = {}

  /**
   * Run one model completely
   * before the next.
   */
  for (const model of MODELS) {
    allResults[model] = await benchmarkModel(model)
  }

  const markdown = createMarkdown(allResults)
  const filename = generateBenchmarkFilename(MODELS)
  const filepath = join(__dirname, filename)

  await writeFile(filepath, markdown, 'utf8')
  console.log('\n========================================')
  console.log('Benchmark complete')
  console.log('========================================')
  console.log(markdown)
  console.log('\nFile:')
  console.log(`  ${filepath}`)
}

main().catch((error) => {
  console.error('\nBenchmark failed:')
  console.error(error.message)
  process.exit(1)
})
