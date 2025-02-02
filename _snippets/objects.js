// # Snippet
// Object creation exapmles
const obj = {
  a: 1,
  b: 2,
}
const obj2 = `{
  "a": "1",
  "b": 2
}`
// const valid = JSON.stringify(obj)
// console.log(JSON.parse(obj2))

// # Snippet
// Chaining in objects https://javascript.info/object-methods#chaining
function sum(a) {
  return (b) => a + b
}
// console.log(sum(1)(2))

// Example
let ladder1 = {
  step: 0,
  up() {
    this.step++
    return this
  },
  down() {
    this.step--
    return this
  },
  showStep: function () {
    // alert(this.step)
    console.log(this.step)
    return this
  },
}
// ladder1.up().up().down().showStep()

// Without chaining
let ladder2 = {
  step: 0,
  up() {
    this.step++
  },
  down() {
    this.step--
  },
  showStep: function () {
    // alert(this.step)
    return this.step
  },
}
// ladder2.up()
// ladder2.up()
// ladder2.down()
// ladder2.showStep()

// # Snippet
// Using "this" in object literal
function makeUser1() {
  return {
    name: 'John',
    ref: this,
  }
}
// const user1 = makeUser1()
// console.log(user1)
// console.log(user1.ref.name) // What's the result? // Error: Cannot read property 'name' of undefined

function makeUser2() {
  return {
    name: 'John',
    ref() {
      return this
    },
  }
}
// const user2 = makeUser2()
// console.log(user2)
// console.log(user2.ref().name) // John

function sayHi() {
  console.log(this.name)
}
// sayHi() // Undefined
