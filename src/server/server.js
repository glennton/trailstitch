import path from 'path'
import express from 'express'
import helmet from 'helmet'
import api from './api'

const app = express()

const PORT = process.env.PORT || 8080



api(app).then( () => {
  
  app.use(express.static(path.join(__dirname, '../../dist', 'client')))
  app.use(helmet())
  app.get('/*', async (req, res) => {
    try{
      await res.sendFile(path.join(__dirname, '../../dist/client/index.html'))
    }catch(err){
      console.log(err)
    }
  })

  app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log(`Press Ctrl+C to quit.`)
  })
}).catch(err => console.log(err))


