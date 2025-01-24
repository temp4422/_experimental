// #region Adapter Pattern

/*
  Adapter Pattern: convert the interface of a class into another interface clients expect.
  Adaptee: class to be adapted
  Adapter: class that adapts the adaptee class
  TODO: composition, aggregation, inheritance, boxing, closure
*/

// Adapter: extend adaptee class
class ArrayToQueueAdapter1 extends Array {
  enqueue(data) {
    this.push(data)
  }
  dequeue() {
    return this.pop()
  }
  get count() {
    return this.length
  }
}
// Usage
const queue1 = new ArrayToQueueAdapter1()
queue1.enqueue('uno')
queue1.enqueue('due')
queue1.enqueue('tre')
while (queue1.count) {
  console.log(queue1.dequeue())
}

// Adapter: boxing of adaptee class
class ArrayToQueueAdapter2 {
  constructor(arr) {
    this.array = arr
  }
  enqueue(data) {
    this.array.push(data)
  }
  dequeue() {
    return this.array.pop()
  }
  get count() {
    return this.array.length
  }
}
// Usage
const queue2 = new ArrayToQueueAdapter2([])
queue2.enqueue('uno')
queue2.enqueue('due')
queue2.enqueue('tre')
while (queue2.count) {
  console.log(queue2.dequeue())
}

// Adapter: wrap adatpee to closure
const arrayToQueueAdapter3 = (arr) => ({
  enqueue(data) {
    arr.push(data)
  },
  dequeue() {
    return arr.pop()
  },
  get count() {
    return arr.length
  },
})
// Usage
const queue3 = arrayToQueueAdapter3([])
queue3.enqueue('uno')
queue3.enqueue('due')
queue3.enqueue('tre')
while (queue3.count) {
  console.log(queue3.dequeue())
}
// #endregion
