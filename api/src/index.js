import express from 'express'
import config from '../config.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('OK')
})

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))

process.on('SIGINT', () => {
  process.exit()
})
