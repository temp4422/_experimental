# Local LLM Benchmark

Generated: 2026-08-29T17:15:29.429Z

Models: qwen3.5:9b-mlx-MYCUSTOM-quick, qwen3.5:9b-mlx, qwen3.5:4b-mlx, llama3.1:8b, granite4.2:8b, ornith-1.5:9b, phi4:14b
Prompts: 10
Runs per prompt: 3
Temperature: 0
Seed: 42
Thinking: disabled

## Overall Results

| Model | TTFT | tok/s | Total latency | Latency % Diff | Avg Quality |
|---|---:|---:|---:|---:|---:|
qwen3.5:9b-mlx-MYCUSTOM-quick | 0.119 s | 44.29 tok/s | 0.988 s | 0.0% | 0.0/10
qwen3.5:9b-mlx | 0.123 s | 45.61 tok/s | 7.493 s | +658.7% | 0.0/10
qwen3.5:4b-mlx | 0.114 s | 71.38 tok/s | 5.254 s | +432.0% | 0.0/10
llama3.1:8b | 0.057 s | 44.53 tok/s | 4.637 s | +369.5% | 0.0/10
granite4.2:8b | 0.076 s | 37.04 tok/s | 16.799 s | +1601.1% | 0.0/10
ornith-1.5:9b | 0.115 s | 32.31 tok/s | 12.401 s | +1155.7% | 0.0/10
phi4:14b | 0.108 s | 19.04 tok/s | 15.826 s | +1502.5% | 0.0/10

## By Category

| Model | Category | TTFT | tok/s | Total latency | Avg Quality |
|---|---|---:|---:|---:|---:|
qwen3.5:9b-mlx-MYCUSTOM-quick | simple | 0.117 s | 35.51 tok/s | 0.193 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | coding | 0.119 s | 43.43 tok/s | 0.508 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | systems | 0.136 s | 45.28 tok/s | 2.309 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | reasoning | 0.117 s | 40.01 tok/s | 2.583 s | 0.0/10
qwen3.5:9b-mlx-MYCUSTOM-quick | technical | 0.143 s | 45.29 tok/s | 3.090 s | 0.0/10
qwen3.5:9b-mlx | coding | 0.114 s | 44.97 tok/s | 1.111 s | 0.0/10
qwen3.5:9b-mlx | simple | 0.123 s | 45.62 tok/s | 3.334 s | 0.0/10
qwen3.5:9b-mlx | reasoning | 0.129 s | 45.66 tok/s | 7.995 s | 0.0/10
qwen3.5:9b-mlx | systems | 0.157 s | 45.59 tok/s | 17.469 s | 0.0/10
qwen3.5:9b-mlx | technical | 0.124 s | 45.57 tok/s | 17.927 s | 0.0/10
qwen3.5:4b-mlx | coding | 0.110 s | 71.36 tok/s | 0.842 s | 0.0/10
qwen3.5:4b-mlx | simple | 0.108 s | 72.17 tok/s | 2.243 s | 0.0/10
qwen3.5:4b-mlx | reasoning | 0.130 s | 71.78 tok/s | 6.475 s | 0.0/10
qwen3.5:4b-mlx | technical | 0.126 s | 71.39 tok/s | 11.641 s | 0.0/10
qwen3.5:4b-mlx | systems | 0.117 s | 69.92 tok/s | 13.173 s | 0.0/10
llama3.1:8b | coding | 0.053 s | 47.10 tok/s | 1.115 s | 0.0/10
llama3.1:8b | reasoning | 0.054 s | 48.27 tok/s | 3.577 s | 0.0/10
llama3.1:8b | simple | 0.056 s | 44.24 tok/s | 3.800 s | 0.0/10
llama3.1:8b | technical | 0.060 s | 43.09 tok/s | 10.260 s | 0.0/10
llama3.1:8b | systems | 0.060 s | 44.41 tok/s | 11.736 s | 0.0/10
granite4.2:8b | coding | 0.061 s | 41.59 tok/s | 0.922 s | 0.0/10
granite4.2:8b | reasoning | 0.069 s | 35.59 tok/s | 9.157 s | 0.0/10
granite4.2:8b | simple | 0.077 s | 37.57 tok/s | 29.387 s | 0.0/10
granite4.2:8b | systems | 0.105 s | 33.97 tok/s | 57.690 s | 0.0/10
granite4.2:8b | technical | 0.220 s | 31.37 tok/s | 105.391 s | 0.0/10
ornith-1.5:9b | coding | 0.115 s | 36.30 tok/s | 1.060 s | 0.0/10
ornith-1.5:9b | reasoning | 0.117 s | 33.50 tok/s | 7.087 s | 0.0/10
ornith-1.5:9b | simple | 0.110 s | 31.70 tok/s | 11.037 s | 0.0/10
ornith-1.5:9b | systems | 0.112 s | 32.23 tok/s | 16.039 s | 0.0/10
ornith-1.5:9b | technical | 0.120 s | 30.87 tok/s | 30.767 s | 0.0/10
phi4:14b | coding | 0.099 s | 19.77 tok/s | 2.438 s | 0.0/10
phi4:14b | simple | 0.105 s | 19.12 tok/s | 11.650 s | 0.0/10
phi4:14b | reasoning | 0.117 s | 18.82 tok/s | 13.752 s | 0.0/10
phi4:14b | systems | 0.133 s | 18.71 tok/s | 31.090 s | 0.0/10
phi4:14b | technical | 0.137 s | 17.73 tok/s | 36.130 s | 0.0/10

## Individual Tests

| # | Category | qwen3.5:9b-mlx-MYCUSTOM-quick TTFT | qwen3.5:9b-mlx-MYCUSTOM-quick tok/s | qwen3.5:9b-mlx-MYCUSTOM-quick Quality | qwen3.5:9b-mlx TTFT | qwen3.5:9b-mlx tok/s | qwen3.5:9b-mlx Quality | qwen3.5:4b-mlx TTFT | qwen3.5:4b-mlx tok/s | qwen3.5:4b-mlx Quality | llama3.1:8b TTFT | llama3.1:8b tok/s | llama3.1:8b Quality | granite4.2:8b TTFT | granite4.2:8b tok/s | granite4.2:8b Quality | ornith-1.5:9b TTFT | ornith-1.5:9b tok/s | ornith-1.5:9b Quality | phi4:14b TTFT | phi4:14b tok/s | phi4:14b Quality |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | simple | 0.118 s | 34.32 | 0.0/10 | 0.121 s | 45.65 | 0.0/10 | 0.113 s | 72.16 | 0.0/10 | 0.057 s | 44.49 | 0.0/10 | 0.076 s | 38.14 | 0.0/10 | 0.116 s | 31.51 | 0.0/10 | 0.105 s | 19.15 | 0.0/10 |
| 2 | simple | 0.115 s | 36.70 | 0.0/10 | 0.126 s | 45.60 | 0.0/10 | 0.104 s | 72.17 | 0.0/10 | 0.054 s | 44.00 | 0.0/10 | 0.078 s | 37.00 | 0.0/10 | 0.105 s | 31.90 | 0.0/10 | 0.104 s | 19.10 | 0.0/10 |
| 3 | reasoning | 0.118 s | 34.39 | 0.0/10 | 0.136 s | 45.66 | 0.0/10 | 0.102 s | 72.22 | 0.0/10 | 0.052 s | 52.60 | 0.0/10 | 0.058 s | 38.54 | 0.0/10 | 0.115 s | 34.69 | 0.0/10 | 0.107 s | 19.70 | 0.0/10 |
| 4 | coding | 0.115 s | 43.43 | 0.0/10 | 0.114 s | 43.94 | 0.0/10 | 0.115 s | 68.70 | 0.0/10 | 0.053 s | 47.10 | 0.0/10 | 0.054 s | 42.90 | 0.0/10 | 0.101 s | 36.30 | 0.0/10 | 0.093 s | 21.85 | 0.0/10 |
| 5 | coding | 0.130 s | 45.40 | 0.0/10 | 0.154 s | 45.64 | 0.0/10 | 0.110 s | 72.01 | 0.0/10 | 0.059 s | 44.85 | 0.0/10 | 0.076 s | 37.07 | 0.0/10 | 0.119 s | 32.45 | 0.0/10 | 0.109 s | 18.98 | 0.0/10 |
| 6 | coding | 0.119 s | 42.93 | 0.0/10 | 0.111 s | 44.97 | 0.0/10 | 0.085 s | 71.36 | 0.0/10 | 0.053 s | 47.21 | 0.0/10 | 0.061 s | 41.59 | 0.0/10 | 0.115 s | 37.02 | 0.0/10 | 0.099 s | 19.77 | 0.0/10 |
| 7 | systems | 0.134 s | 45.41 | 0.0/10 | 0.117 s | 45.57 | 0.0/10 | 0.114 s | 69.29 | 0.0/10 | 0.060 s | 44.57 | 0.0/10 | 0.133 s | 33.69 | 0.0/10 | 0.107 s | 32.17 | 0.0/10 | 0.129 s | 18.62 | 0.0/10 |
| 8 | systems | 0.137 s | 45.15 | 0.0/10 | 0.198 s | 45.62 | 0.0/10 | 0.120 s | 70.55 | 0.0/10 | 0.059 s | 44.24 | 0.0/10 | 0.076 s | 34.26 | 0.0/10 | 0.117 s | 32.30 | 0.0/10 | 0.137 s | 18.81 | 0.0/10 |
| 9 | reasoning | 0.115 s | 45.62 | 0.0/10 | 0.122 s | 45.66 | 0.0/10 | 0.159 s | 71.33 | 0.0/10 | 0.056 s | 43.95 | 0.0/10 | 0.079 s | 32.65 | 0.0/10 | 0.119 s | 32.31 | 0.0/10 | 0.127 s | 17.94 | 0.0/10 |
| 10 | technical | 0.143 s | 45.29 | 0.0/10 | 0.124 s | 45.57 | 0.0/10 | 0.126 s | 71.39 | 0.0/10 | 0.060 s | 43.09 | 0.0/10 | 0.220 s | 31.37 | 0.0/10 | 0.120 s | 30.87 | 0.0/10 | 0.137 s | 17.73 | 0.0/10 |

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
