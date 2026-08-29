# Local LLM Benchmark

Generated: 2026-08-29T08:27:47.625Z

Prompts: 10
Runs per prompt: 3
Temperature: 0
Seed: 42
Thinking: disabled

## Overall Results

| Model | TTFT | tok/s | Total latency | Avg Quality |
|---|---:|---:|---:|---:|
qwen3.5:9b | 82 ms | 38.84 tok/s | 9520 ms | 0.0/10
llama3.1:8b | 50 ms | 34.09 tok/s | 6850 ms | 0.0/10

## By Category

| Model | Category | TTFT | tok/s | Total latency | Avg Quality |
|---|---|---:|---:|---:|---:|
qwen3.5:9b | simple | 72 ms | 38.80 tok/s | 6660 ms | 0.0/10
qwen3.5:9b | reasoning | 84 ms | 35.76 tok/s | 10163 ms | 0.0/10
qwen3.5:9b | coding | 74 ms | 39.81 tok/s | 1116 ms | 0.0/10
qwen3.5:9b | systems | 100 ms | 37.37 tok/s | 22804 ms | 0.0/10
qwen3.5:9b | technical | 92 ms | 29.75 tok/s | 24496 ms | 0.0/10
llama3.1:8b | simple | 51 ms | 31.12 tok/s | 5399 ms | 0.0/10
llama3.1:8b | reasoning | 46 ms | 35.91 tok/s | 4524 ms | 0.0/10
llama3.1:8b | coding | 43 ms | 34.97 tok/s | 1502 ms | 0.0/10
llama3.1:8b | systems | 57 ms | 34.12 tok/s | 15269 ms | 0.0/10
llama3.1:8b | technical | 48 ms | 33.75 tok/s | 13312 ms | 0.0/10

## Individual Tests

| # | Category | Qwen TTFT | Qwen tok/s | Qwen Avg Quality | Llama TTFT | Llama tok/s | Llama Avg Quality |
|---:|---|---:|---:|---:|---:|---:|---:|
1 | simple | 77 ms | 38.84 | 0.0/10 | 49 ms | 30.43 | 0.0/10
2 | simple | 66 ms | 38.77 | 0.0/10 | 53 ms | 31.81 | 0.0/10
3 | reasoning | 80 ms | 39.29 | 0.0/10 | 42 ms | 37.76 | 0.0/10
4 | coding | 70 ms | 39.81 | 0.0/10 | 43 ms | 35.56 | 0.0/10
5 | coding | 74 ms | 39.05 | 0.0/10 | 57 ms | 32.89 | 0.0/10
6 | coding | 83 ms | 40.48 | 0.0/10 | 39 ms | 34.97 | 0.0/10
7 | systems | 98 ms | 38.85 | 0.0/10 | 56 ms | 34.12 | 0.0/10
8 | systems | 102 ms | 35.90 | 0.0/10 | 57 ms | 34.12 | 0.0/10
9 | reasoning | 89 ms | 32.23 | 0.0/10 | 51 ms | 34.07 | 0.0/10
10 | technical | 92 ms | 29.75 | 0.0/10 | 48 ms | 33.75 | 0.0/10

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
- Models are kept loaded for 10 minutes.
- TTFT is measured until the first generated content chunk.
- Generation tok/s comes from Ollama eval_count / eval_duration.
- Quality is scored independently from performance metrics.
