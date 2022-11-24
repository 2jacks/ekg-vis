const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const cors = require('cors')
const { parse } = require('csv-parse')

app.use(cors())

const patientData = {
  1: '100.csv',
  2: '101.csv',
  3: '102.csv',
  4: '103.csv',
  5: '104.csv'
}

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function readCSVFile() {}

app.get('/data', (req, res) => {
  let id = req.query.patient
  let data = []
  fs.createReadStream(`./archive/mitbih_database/${patientData[id]}`)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', function (row) {
      data.push(row[1])
    })
    .on('end', () => {
      res.send(data)
    })
})
