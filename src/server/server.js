import path from 'path'
import express from 'express'

const app = express()
app.use(express.static(path.join(__dirname, '../', '../', 'dist', 'client')))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
