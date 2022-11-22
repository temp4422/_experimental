// import { hi } from './script2.js'
// export { hi }

// ES6 Class
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement
    this.words = words
    this.txt = ''
    this.wordIndex = 0
    this.wait = parseInt(wait, 10)
    this.type()
    this.isDeleting = false
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length
    // Get full text of current word
    const fullTxt = this.words[current]

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    // Initial Type Speed
    let typeSpeed = 200

    if (this.isDeleting) {
      typeSpeed /= 2.5
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait
      // Set delete to true
      this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false
      // Move to next word
      this.wordIndex++
      // Pause before start typing
      typeSpeed = 500
    }
    setTimeout(() => this.type(), typeSpeed)
  }
}
// Init App
function init() {
  const txtElement = document.querySelector('.typewriter')
  const preWords = txtElement.getAttribute('data-words').replace(/'/gi, '"')
  const words = JSON.parse(preWords)
  const wait = txtElement.getAttribute('data-wait')
  // Add cursor
  const cursor = document.createElement('style')
  cursor.type = 'text/css'
  cursor.innerHTML =
    '.typewriter > .txt {border-right: 0.05em solid; animation: caret 1s steps(1) infinite;} @keyframes caret {50% {border-color: transparent;}} '
  document.body.appendChild(cursor)
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait)
}
init()
// Init On DOM Load
// document.addEventListener('DOMContentLoaded', init)

// Navigation menu
const menu = document.querySelector('.menu')
const navLinks = document.querySelector('.nav-links')
function showMenu() {
  menu.classList.toggle('show-menu')
  navLinks.classList.toggle('show-nav-links')
}
menu.addEventListener('click', showMenu, false)
