# Deterministic Reasoning Benchmark

You are solving a deterministic benchmark used to compare different language models.

Your goal is to solve each task correctly and return the **exact required answer**.

## Rules

1. Solve all tasks from 1 to 10.
2. Each task has exactly one correct answer.
3. Do not guess.
4. Do not add explanations unless the task explicitly asks for them.
5. Follow the requested output format exactly.
6. Use ordinary decimal arithmetic.
7. When a task involves strings, treat uppercase and lowercase letters as different unless stated otherwise.
8. When a task involves arrays, preserve the requested ordering exactly.
9. Do not use external information or assumptions.
10. Return only the final answers.

## Difficulty levels

The tasks are ordered from **Difficulty 1 (very easy)** to **Difficulty 10 (hardest)**.

Difficulty is based on the amount of reasoning required, not on the amount of text.

---

## Examples

### Example 1 — Arithmetic

Task:
Calculate:

`27 + 15`

Required answer:

`42`

### Example 2 — String

Task:
How many characters are in:

`hello`

Required answer:

`5`

### Example 3 — Array

Task:
Sort the following numbers in ascending order:

`[8, 3, 6, 1]`

Required answer:

`[1, 3, 6, 8]`

### Example 4 — Logic

Task:
All roses are flowers.
Some flowers are red.

Can we conclude that some roses are red?

Required answer:

`No`

The examples above demonstrate the required reasoning style and output format.

---

# Benchmark Tasks

## Task 1 — Difficulty 1

Calculate:

`37 + 48`

Return only the number.

---

## Task 2 — Difficulty 2

How many vowels are in the word:

`computer`

Count only:

`a, e, i, o, u`

Return only the number.

---

## Task 3 — Difficulty 3

Sort these integers in ascending order:

`[14, 3, 27, 9, 1, 18]`

Return the resulting array.

---

## Task 4 — Difficulty 4

Calculate the value of:

`8 × 7 - 12 ÷ 3`

Use normal mathematical operator precedence.

Return only the final number.

---

## Task 5 — Difficulty 5

Find the next number in the sequence:

`2, 6, 12, 20, 30, ?`

Return only the missing number.

---

## Task 6 — Difficulty 6

Consider the following set:

`A = {2, 4, 6, 8, 10}`

and

`B = {1, 2, 3, 4, 5, 6}`

Find the numbers that appear in **both** sets.

Return them in ascending order.

---

## Task 7 — Difficulty 7

A box contains only red, blue, and green balls.

There are:

- 7 red balls
- 5 blue balls
- 3 green balls

Two balls are removed.

The first removed ball is red.
The second removed ball is blue.

How many balls remain in the box?

Return only the number.

---

## Task 8 — Difficulty 8

A number is chosen.

First, multiply it by 4.

Then subtract 12.

The result is 28.

What was the original number?

Return only the number.

---

## Task 9 — Difficulty 9

There are five people:

`Alice, Bob, Carol, David, Eva`

They stand in a line from left to right.

The following statements are true:

1. Alice stands somewhere to the left of Bob.
2. Carol stands immediately to the right of Alice.
3. Eva stands somewhere to the right of Bob.
4. David is not at either end of the line.
5. Bob is immediately to the left of Eva.

Who is in the **middle position**?

Return only the person's name.

---

## Task 10 — Difficulty 10

You have three boxes:

- Box A is labeled `APPLES`
- Box B is labeled `ORANGES`
- Box C is labeled `APPLES AND ORANGES`

Every label is incorrect.

Each box contains either:

- only apples,
- only oranges,
- or both apples and oranges.

You may draw exactly **one fruit from one box**, without looking inside.

Which box should you draw from first to determine the contents of all three boxes?

Return only the box name.

---

# Required Output Format

Return exactly 10 lines.

Use this format:

`1: answer`
`2: answer`
`3: answer`
`4: answer`
`5: answer`
`6: answer`
`7: answer`
`8: answer`
`9: answer`
`10: answer`

Do not include explanations, commentary, reasoning, Markdown code blocks, or additional text.
