const button = document.querySelector('.arrow.next')
button.addEventListener('click', () =>
  fetch('http://127.0.0.1:3000/src/js/simple-analitics-back.js')
)
