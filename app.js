const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const createLocation = require('./routes/locations/createLocation');
app.get('/location', createLocation);

app.listen(port, () => {
  console.log(`chillin at http://localhost:${port}`)
})
