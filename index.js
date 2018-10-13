//npm start para q inicie todo con nodemon
// C:\Archivos de programa\mongoDB\Server\4.0\bin>mongod // run mongodb
'use strict'
const mongoose= require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { useNewUrlParser: true } ,(err, res)=> {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión establecida a la base de datos! ')
  app.listen(config.port, () => {
    console.log(`API REST corriendo en http:// localhost:${config.port}`)
  })
})//localhost:puerto/nombre de la base de datos
