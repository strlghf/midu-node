import { readFile } from 'node:fs/promises'

console.log('Cosas')

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('Leyendo el primer archivo...')
  console.log(text)
  console.log('Leyendo el segundo archivo...')
  console.log(secondText)
})
