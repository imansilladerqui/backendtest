const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
radar = require('./radar.js')

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/radar', async (req, res) => {
  const radarResponse = await radar(req.body)
  res.send(radarResponse)
})

app.listen(port, () => console.log(`listening on port ${port}!`))
