const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./api/api')
const port = 3001 || process.env.port
const app = express()

app.use(cors());
app.use(bodyParser.text())
app.use(bodyParser.json())

app.use('/', api)

require('./db/connectToDb')

app.listen(port, () => {
    console.log(`Serwer working on port: ${port}`)
})