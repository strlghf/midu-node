const fs = require('node:fs/promises')

// fs.readdir(".", (err, files) => { // without fs/promises
//   if (err) {
//     console.error("Error al leer el directorio: ", err)
//     return;
//   }

//   files.forEach(file => {
//     console.log(file)
//   })
// })

fs.readdir('.') // with fs/promises
  .then(files => {
    files.forEach(file => console.log(file))
  })
  .catch(err => {
    console.error(`Error al leer el directorio ${err}`)
  })
