const http = require('node:http')
const { findAvailablePort } = require('./10.free-port.js')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  res.end('<h1>Hola Midu</h1>')
})

findAvailablePort(desiredPort)
  .then(port => {
    server.listen(port, () => {
      console.log(`server listening on port http://localhost:${port}`)
    })
  })

// server.listen(0, () => {
//   console.log(`Server listening on port http://localhost:${server.address().port}`)
// })
