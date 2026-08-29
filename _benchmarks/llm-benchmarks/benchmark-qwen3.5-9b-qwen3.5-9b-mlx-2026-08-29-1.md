# Local LLM Benchmark

Generated: 2026-08-29T08:56:48.749Z

Models: qwen3.5:9b, qwen3.5:9b-mlx
Prompts: 10
Runs per prompt: 3
Temperature: 0
Seed: 42
Thinking: disabled

## Overall Results

| Model | TTFT | tok/s | Total latency | Avg Quality |
|---|---:|---:|---:|---:|
qwen3.5:9b | 108 ms | 39.27 tok/s | 9479 ms | 0.0/10
qwen3.5:9b-mlx | 177 ms | 39.93 tok/s | 7492 ms | 0.0/10

## By Category

| Model | Category | TTFT | tok/s | Total latency | Avg Quality |
|---|---|---:|---:|---:|---:|
qwen3.5:9b | simple | 118 ms | 39.27 tok/s | 6634 ms | 0.0/10
qwen3.5:9b | reasoning | 109 ms | 36.67 tok/s | 9795 ms | 0.0/10
qwen3.5:9b | coding | 105 ms | 40.01 tok/s | 1171 ms | 0.0/10
qwen3.5:9b | systems | 105 ms | 37.38 tok/s | 22883 ms | 0.0/10
qwen3.5:9b | technical | 123 ms | 31.72 tok/s | 23010 ms | 0.0/10
qwen3.5:9b-mlx | simple | 173 ms | 38.32 tok/s | 4095 ms | 0.0/10
qwen3.5:9b-mlx | reasoning | 239 ms | 39.48 tok/s | 9231 ms | 0.0/10
qwen3.5:9b-mlx | coding | 124 ms | 39.91 tok/s | 1325 ms | 0.0/10
qwen3.5:9b-mlx | systems | 179 ms | 39.98 tok/s | 19985 ms | 0.0/10
qwen3.5:9b-mlx | technical | 165 ms | 40.51 tok/s | 20173 ms | 0.0/10

## Individual Tests

| # | Category | qwen3.5:9b TTFT | qwen3.5:9b tok/s | qwen3.5:9b Quality | qwen3.5:9b-mlx TTFT | qwen3.5:9b-mlx tok/s | qwen3.5:9b-mlx Quality |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | simple | 119 ms | 39.26 | 0.0/10 | 176 ms | 38.42 | 0.0/10 |
| 2 | simple | 116 ms | 39.27 | 0.0/10 | 171 ms | 38.22 | 0.0/10 |
| 3 | reasoning | 107 ms | 39.37 | 0.0/10 | 190 ms | 38.67 | 0.0/10 |
| 4 | coding | 82 ms | 40.99 | 0.0/10 | 92 ms | 40.77 | 0.0/10 |
| 5 | coding | 105 ms | 39.27 | 0.0/10 | 124 ms | 39.07 | 0.0/10 |
| 6 | coding | 108 ms | 40.01 | 0.0/10 | 180 ms | 39.91 | 0.0/10 |
| 7 | systems | 103 ms | 38.09 | 0.0/10 | 180 ms | 39.95 | 0.0/10 |
| 8 | systems | 107 ms | 36.67 | 0.0/10 | 178 ms | 40.00 | 0.0/10 |
| 9 | reasoning | 112 ms | 33.97 | 0.0/10 | 288 ms | 40.28 | 0.0/10 |
| 10 | technical | 123 ms | 31.72 | 0.0/10 | 165 ms | 40.51 | 0.0/10 |

## Quality Score

Each run is scored independently using a prompt-specific rubric.
The reported quality score is the arithmetic average across all runs.

- 0–2: incorrect
- 3–5: partially correct
- 6–8: correct but incomplete
- 9–10: correct and sufficiently complete

## Methodology

- Each model is warmed up before benchmarking.
- Each prompt is executed multiple times.
- Median timing is used to reduce performance noise.
- Quality is averaged across all runs.
- Temperature is fixed at 0.
- Seed is fixed at 42.
- Thinking is disabled.
- Models are kept loaded for 10m.
- TTFT is measured until the first generated content chunk.
- Generation tok/s comes from Ollama eval_count / eval_duration.
- Quality is scored independently from performance metrics.
