import express, { json } from 'express'
import { moviesRouter } from './routes/movies'
import { corsMiddleware } from './middlewares/cors'
// import fs from 'node:fs' // leer un json en ESModules
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// REST API - REPRESENTATIONAL STATE TRANSFER -> ARQUITECTURA DE SOFTWARE
const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 3000

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

// const origin = req.header('origin')
// if (origin.ACCEPTED_ORIGINS.includes(origin) || !origin) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
// }
// res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
