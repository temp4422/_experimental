# Local LLM Benchmark

Generated: 2026-08-29T10:05:13.009Z

Models: qwen3.5:9b-mlx-MYCUSTOM-quick --think=false, llama3.1:8b
Prompts: 10
Runs per prompt: 1
Temperature: 0
Seed: 42
Thinking: disabled

## Overall Results

| Model | TTFT | tok/s | Total latency | Latency % Diff | Avg Quality |
|---|---:|---:|---:|---:|---:|
qwen3.5:9b-mlx-MYCUSTOM-quick --think=false | 0.211 s | 44.04 tok/s | 1.047 s | 0.0% | 0.0/10
llama3.1:8b | 0.111 s | 45.54 tok/s | 4.697 s | +348.5% | 0.0/10

## By Category

| Model | Category | TTFT | tok/s | Total latency | Avg Quality |
|---|---|---:|---:|---:|---:|
qwen3.5:9b-mlx-MYCUSTOM-quick --think=false | simple | 0.304 s | 37.23 tok/s | 0.401 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick --think=false | coding | 0.223 s | 43.30 tok/s | 0.567 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick --think=false | systems | 0.193 s | 45.18 tok/s | 2.371 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick --think=false | reasoning | 0.236 s | 40.02 tok/s | 2.715 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick --think=false | technical | 0.362 s | 44.78 tok/s | 3.712 s | 0.0/10
llama3.1:8b | coding | 0.052 s | 44.59 tok/s | 1.144 s | 0.0/10
llama3.1:8b | reasoning | 0.136 s | 48.63 tok/s | 3.508 s | 0.0/10
llama3.1:8b | simple | 0.105 s | 45.60 tok/s | 3.747 s | 0.0/10
llama3.1:8b | technical | 0.156 s | 45.12 tok/s | 9.886 s | 0.0/10
llama3.1:8b | systems | 0.111 s | 45.87 tok/s | 11.406 s | 0.0/10

## Individual Tests

| # | Category | qwen3.5:9b-mlx-MYCUSTOM-quick --think=false TTFT | qwen3.5:9b-mlx-MYCUSTOM-quick --think=false tok/s | qwen3.5:9b-mlx-MYCUSTOM-quick --think=false Quality | llama3.1:8b TTFT | llama3.1:8b tok/s | llama3.1:8b Quality |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | simple | 0.437 s | 37.63 | 0.0/10 | 0.097 s | 45.27 | 0.0/10 |
| 2 | simple | 0.171 s | 36.83 | 0.0/10 | 0.113 s | 45.92 | 0.0/10 |
| 3 | reasoning | 0.182 s | 34.68 | 0.0/10 | 0.110 s | 52.05 | 0.0/10 |
| 4 | coding | 0.173 s | 43.30 | 0.0/10 | 0.050 s | 46.00 | 0.0/10 |
| 5 | coding | 0.265 s | 45.29 | 0.0/10 | 0.162 s | 44.59 | 0.0/10 |
| 6 | coding | 0.223 s | 42.93 | 0.0/10 | 0.052 s | 43.94 | 0.0/10 |
| 7 | systems | 0.188 s | 45.27 | 0.0/10 | 0.111 s | 45.80 | 0.0/10 |
| 8 | systems | 0.198 s | 45.09 | 0.0/10 | 0.111 s | 45.93 | 0.0/10 |
| 9 | reasoning | 0.290 s | 45.36 | 0.0/10 | 0.163 s | 45.22 | 0.0/10 |
| 10 | technical | 0.362 s | 44.78 | 0.0/10 | 0.156 s | 45.12 | 0.0/10 |

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
