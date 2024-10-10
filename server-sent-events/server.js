import http from 'node:http'

const server = http.createServer(async (req, res) => {
  // Enable CORS to run locally
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // Response with SSE headers
  res.writeHead(200, {
    // SSE 'text/event-stream' - is mandatory
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })
  // SSE body special response field - required
  // res.write('data: ' + 'ok' + '\n\n')
  // Continuous data transfer connection example
  setInterval(() => res.write('data: ' + new Date().getSeconds() + '\n\n'), 1000)
})

// Default
const hostname = '127.0.0.1'
const port = 8000
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// Test with curl
// curl -H Accept:text/event-stream http://localhost:8000
