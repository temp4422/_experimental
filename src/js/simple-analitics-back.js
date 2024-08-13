// Create new logger to save to file
const { Console } = require('console') // get the Console class
const fs = require('fs') // get fs module for creating write streams
const fconsole = new Console({ stdout: fs.createWriteStream('./src/js/stdout.txt') })

// Basic web server
const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

// Log with client-side
// const server = http.createServer((req, res) => {
//   fconsole.log('click +1')
//   console.log('User click!')
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.end('Hello World')
// })

// Log with server-side,
let count = 0
const server = http.createServer((req, res) => {
  fs.readFile('./_snippets/carousel.html', (err, data) => {
    fconsole.log(count)
    count++
    res.write(data), res.end()
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
