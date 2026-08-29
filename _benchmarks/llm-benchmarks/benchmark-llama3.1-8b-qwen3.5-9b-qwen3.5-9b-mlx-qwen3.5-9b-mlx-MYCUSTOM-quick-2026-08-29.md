# Local LLM Benchmark

Generated: 2026-08-29T09:55:42.736Z

Models: llama3.1:8b, qwen3.5:9b, qwen3.5:9b-mlx, qwen3.5:9b-mlx-MYCUSTOM-quick
Prompts: 10
Runs per prompt: 1
Temperature: 0
Seed: 42
Thinking: disabled

## Overall Results

| Model | TTFT | tok/s | Total latency | Latency % Diff | Avg Quality |
|---|---:|---:|---:|---:|---:|
llama3.1:8b | 0.113 s | 46.15 tok/s | 4.577 s | 0.0% | 0.0/10
qwen3.5:9b | 0.201 s | 39.86 tok/s | 10.060 s | +119.8% | 0.0/10
qwen3.5:9b-mlx | 0.203 s | 45.22 tok/s | 7.467 s | +63.1% | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | 0.236 s | 42.40 tok/s | 1.188 s | -74.0% | 0.0/10

## By Category

| Model | Category | TTFT | tok/s | Total latency | Avg Quality |
|---|---|---:|---:|---:|---:|
llama3.1:8b | simple | 0.103 s | 46.13 tok/s | 3.702 s | 0.0/10
llama3.1:8b | reasoning | 0.142 s | 49.23 tok/s | 3.470 s | 0.0/10
llama3.1:8b | coding | 0.112 s | 47.07 tok/s | 1.174 s | 0.0/10
llama3.1:8b | systems | 0.117 s | 45.66 tok/s | 11.454 s | 0.0/10
llama3.1:8b | technical | 0.173 s | 46.01 tok/s | 9.715 s | 0.0/10
qwen3.5:9b | simple | 0.191 s | 39.63 tok/s | 6.639 s | 0.0/10
qwen3.5:9b | reasoning | 0.222 s | 39.90 tok/s | 8.815 s | 0.0/10
qwen3.5:9b | coding | 0.203 s | 40.31 tok/s | 1.243 s | 0.0/10
qwen3.5:9b | systems | 0.199 s | 39.56 tok/s | 21.888 s | 0.0/10
qwen3.5:9b | technical | 0.247 s | 40.05 tok/s | 18.374 s | 0.0/10
qwen3.5:9b-mlx | simple | 0.200 s | 45.43 tok/s | 4.573 s | 0.0/10
qwen3.5:9b-mlx | reasoning | 0.250 s | 45.38 tok/s | 7.972 s | 0.0/10
qwen3.5:9b-mlx | coding | 0.185 s | 44.49 tok/s | 1.176 s | 0.0/10
qwen3.5:9b-mlx | systems | 0.234 s | 45.25 tok/s | 17.652 s | 0.0/10
qwen3.5:9b-mlx | technical | 0.326 s | 45.26 tok/s | 18.750 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | simple | 0.309 s | 37.37 tok/s | 0.408 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | reasoning | 0.257 s | 39.03 tok/s | 2.827 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | coding | 0.197 s | 43.31 tok/s | 0.578 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | systems | 0.221 s | 40.90 tok/s | 2.595 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | technical | 0.298 s | 42.23 tok/s | 3.850 s | 0.0/10

## Individual Tests

| # | Category | llama3.1:8b TTFT | llama3.1:8b tok/s | llama3.1:8b Quality | qwen3.5:9b TTFT | qwen3.5:9b tok/s | qwen3.5:9b Quality | qwen3.5:9b-mlx TTFT | qwen3.5:9b-mlx tok/s | qwen3.5:9b-mlx Quality | qwen3.5:9b-mlx-MYCUSTOM-quick TTFT | qwen3.5:9b-mlx-MYCUSTOM-quick tok/s | qwen3.5:9b-mlx-MYCUSTOM-quick Quality |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | simple | 0.099 s | 45.89 | 0.0/10 | 0.184 s | 39.61 | 0.0/10 | 0.180 s | 45.18 | 0.0/10 | 0.435 s | 38.19 | 0.0/10 |
| 2 | simple | 0.107 s | 46.38 | 0.0/10 | 0.198 s | 39.65 | 0.0/10 | 0.220 s | 45.68 | 0.0/10 | 0.184 s | 36.54 | 0.0/10 |
| 3 | reasoning | 0.106 s | 52.66 | 0.0/10 | 0.192 s | 40.00 | 0.0/10 | 0.175 s | 45.65 | 0.0/10 | 0.201 s | 34.32 | 0.0/10 |
| 4 | coding | 0.112 s | 47.07 | 0.0/10 | 0.193 s | 40.77 | 0.0/10 | 0.185 s | 43.82 | 0.0/10 | 0.185 s | 43.31 | 0.0/10 |
| 5 | coding | 0.166 s | 46.29 | 0.0/10 | 0.261 s | 39.91 | 0.0/10 | 0.267 s | 45.65 | 0.0/10 | 0.348 s | 45.27 | 0.0/10 |
| 6 | coding | 0.112 s | 47.19 | 0.0/10 | 0.203 s | 40.31 | 0.0/10 | 0.166 s | 44.49 | 0.0/10 | 0.197 s | 42.90 | 0.0/10 |
| 7 | systems | 0.114 s | 45.95 | 0.0/10 | 0.187 s | 39.43 | 0.0/10 | 0.168 s | 45.37 | 0.0/10 | 0.172 s | 42.57 | 0.0/10 |
| 8 | systems | 0.120 s | 45.38 | 0.0/10 | 0.210 s | 39.69 | 0.0/10 | 0.299 s | 45.14 | 0.0/10 | 0.270 s | 39.22 | 0.0/10 |
| 9 | reasoning | 0.177 s | 45.80 | 0.0/10 | 0.253 s | 39.80 | 0.0/10 | 0.324 s | 45.12 | 0.0/10 | 0.313 s | 43.73 | 0.0/10 |
| 10 | technical | 0.173 s | 46.01 | 0.0/10 | 0.247 s | 40.05 | 0.0/10 | 0.326 s | 45.26 | 0.0/10 | 0.298 s | 42.23 | 0.0/10 |

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
