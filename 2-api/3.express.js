const ditto = require('./pokemon/ditto.json')
const express = require('express')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

// express.json() hace lo mismo que el codigo de abajo
app.use(express.json())

// app.use((req, res, next) => { // .use se executa siempre
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''

//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data
//     next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // req.body guardar en base de datos
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('Not Found 404')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
