import path from 'path'
import express from 'express'
import api from './api'

const app = express()

api(app).then(_=>{
  app.use(express.static(path.join(__dirname, '../../dist', 'client')))
  const PORT = process.env.PORT || 8080
  app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log(`Press Ctrl+C to quit.`)
  })
}).catch(err => console.log(err))