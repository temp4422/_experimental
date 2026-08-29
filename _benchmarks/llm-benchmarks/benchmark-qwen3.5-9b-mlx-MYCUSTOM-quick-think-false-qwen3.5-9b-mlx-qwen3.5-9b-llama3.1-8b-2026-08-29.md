# Local LLM Benchmark

Generated: 2026-08-29T11:28:50.358Z

Models: qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false, qwen3.5:9b-mlx, qwen3.5:9b, llama3.1:8b
Prompts: 10
Runs per prompt: 1
Temperature: 0
Seed: 42
Thinking: disabled

## Overall Results

| Model | TTFT | tok/s | Total latency | Latency % Diff | Avg Quality |
|---|---:|---:|---:|---:|---:|
qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false | 0.206 s | 43.91 tok/s | 1.057 s | 0.0% | 0.0/10
qwen3.5:9b-mlx | 0.204 s | 43.77 tok/s | 7.952 s | +652.1% | 0.0/10
qwen3.5:9b | 0.237 s | 29.39 tok/s | 12.413 s | +1074.0% | 0.0/10
llama3.1:8b | 0.157 s | 33.73 tok/s | 6.082 s | +475.2% | 0.0/10

## By Category

| Model | Category | TTFT | tok/s | Total latency | Avg Quality |
|---|---|---:|---:|---:|---:|
qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false | simple | 0.302 s | 37.40 tok/s | 0.400 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false | coding | 0.194 s | 43.53 tok/s | 0.568 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false | systems | 0.199 s | 44.84 tok/s | 2.401 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false | reasoning | 0.229 s | 39.66 tok/s | 2.725 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false | technical | 0.279 s | 44.28 tok/s | 3.669 s | 0.0/10
qwen3.5:9b-mlx | coding | 0.214 s | 41.79 tok/s | 1.232 s | 0.0/10
qwen3.5:9b-mlx | simple | 0.178 s | 45.16 tok/s | 4.577 s | 0.0/10
qwen3.5:9b-mlx | reasoning | 0.290 s | 44.65 tok/s | 8.133 s | 0.0/10
qwen3.5:9b-mlx | systems | 0.238 s | 43.72 tok/s | 18.313 s | 0.0/10
qwen3.5:9b-mlx | technical | 0.365 s | 43.22 tok/s | 19.663 s | 0.0/10
qwen3.5:9b | coding | 0.254 s | 30.66 tok/s | 1.619 s | 0.0/10
qwen3.5:9b | simple | 0.178 s | 39.25 tok/s | 6.672 s | 0.0/10
qwen3.5:9b | reasoning | 0.277 s | 28.50 tok/s | 12.248 s | 0.0/10
qwen3.5:9b | technical | 0.327 s | 29.35 tok/s | 25.060 s | 0.0/10
qwen3.5:9b | systems | 0.237 s | 28.79 tok/s | 30.233 s | 0.0/10
llama3.1:8b | coding | 0.154 s | 39.33 tok/s | 1.402 s | 0.0/10
llama3.1:8b | simple | 0.116 s | 38.23 tok/s | 4.541 s | 0.0/10
llama3.1:8b | reasoning | 0.200 s | 33.95 tok/s | 5.000 s | 0.0/10
llama3.1:8b | technical | 0.217 s | 31.64 tok/s | 14.092 s | 0.0/10
llama3.1:8b | systems | 0.147 s | 33.38 tok/s | 15.690 s | 0.0/10

## Individual Tests

| # | Category | qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false TTFT | qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false tok/s | qwen3.5:9b-mlx-MYCUSTOM-quick ----think=false Quality | qwen3.5:9b-mlx TTFT | qwen3.5:9b-mlx tok/s | qwen3.5:9b-mlx Quality | qwen3.5:9b TTFT | qwen3.5:9b tok/s | qwen3.5:9b Quality | llama3.1:8b TTFT | llama3.1:8b tok/s | llama3.1:8b Quality |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | simple | 0.423 s | 38.12 | 0.0/10 | 0.184 s | 44.67 | 0.0/10 | 0.170 s | 40.04 | 0.0/10 | 0.106 s | 44.89 | 0.0/10 |
| 2 | simple | 0.182 s | 36.68 | 0.0/10 | 0.172 s | 45.64 | 0.0/10 | 0.185 s | 38.46 | 0.0/10 | 0.125 s | 31.57 | 0.0/10 |
| 3 | reasoning | 0.179 s | 34.28 | 0.0/10 | 0.193 s | 44.84 | 0.0/10 | 0.227 s | 28.26 | 0.0/10 | 0.168 s | 36.14 | 0.0/10 |
| 4 | coding | 0.178 s | 43.53 | 0.0/10 | 0.214 s | 41.63 | 0.0/10 | 0.222 s | 30.66 | 0.0/10 | 0.154 s | 39.95 | 0.0/10 |
| 5 | coding | 0.261 s | 45.40 | 0.0/10 | 0.277 s | 41.79 | 0.0/10 | 0.317 s | 29.22 | 0.0/10 | 0.190 s | 33.57 | 0.0/10 |
| 6 | coding | 0.194 s | 42.99 | 0.0/10 | 0.183 s | 42.95 | 0.0/10 | 0.254 s | 30.73 | 0.0/10 | 0.140 s | 39.33 | 0.0/10 |
| 7 | systems | 0.181 s | 44.52 | 0.0/10 | 0.175 s | 43.12 | 0.0/10 | 0.231 s | 28.14 | 0.0/10 | 0.135 s | 32.87 | 0.0/10 |
| 8 | systems | 0.218 s | 45.16 | 0.0/10 | 0.302 s | 44.31 | 0.0/10 | 0.242 s | 29.44 | 0.0/10 | 0.159 s | 33.90 | 0.0/10 |
| 9 | reasoning | 0.278 s | 45.05 | 0.0/10 | 0.387 s | 44.46 | 0.0/10 | 0.326 s | 28.75 | 0.0/10 | 0.231 s | 31.77 | 0.0/10 |
| 10 | technical | 0.279 s | 44.28 | 0.0/10 | 0.365 s | 43.22 | 0.0/10 | 0.327 s | 29.35 | 0.0/10 | 0.217 s | 31.64 | 0.0/10 |

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
