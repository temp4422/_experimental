function cipher(text, shift) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  let cipherText = ''
  for (let i = 0; i < text.length; i++) {
    let char = text[i]
    if (char === ' ') {
      cipherText += ' '
      continue
    }

    char = char.toLowerCase()
    let index = alphabet.indexOf(char)
    if (index === -1) {
      cipherText += char // Non-alphabetic characters remain unchanged
      continue
    }

    charIndex = (index + shift) % alphabet.length
    let cipherChar = alphabet[charIndex]
    cipherText += cipherChar
  }

  console.log(`Text to cipher: ${text}, shift: ${shift}`)
  console.log(`Ciphered text: ${cipherText}\n`)

  return cipherText
}
cipher('hello world', 3) // Output: khoor zruog
cipher('hello world', 29) // Output: khoor zruog

function decipher(cipherText) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const textArr = []
  for (let alphabetIndex = 0; alphabetIndex < 26; alphabetIndex++) {
    let text = ''
    for (let i = 0; i < cipherText.length; i++) {
      let char = cipherText[i]
      if (char === ' ') {
        text += ' '
        continue
      }

      char = char.toLowerCase()
      let index = alphabet.indexOf(char)
      if (index === -1) {
        text += char // Non-alphabetic characters remain unchanged
        continue
      }

      charIndex = (index - alphabetIndex + alphabet.length) % alphabet.length
      let textChar = alphabet[charIndex]
      text += textChar
    }
    textArr.push(text)
  }

  console.log(`Ciphered text: ${cipherText}`)
  console.log(`Deciphered text:`)
  console.log(textArr)

  return textArr
}
decipher('khoor zruog')
