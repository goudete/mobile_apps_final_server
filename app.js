const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const create_db = require('./routes/create_db/db');
app.get('/create_db', create_db);

const auth = require('./routes/auth/auth');
app.post('/auth', auth);

const createLocation = require('./routes/locations/createLocation');
app.get('/location', createLocation);

app.listen(port, () => {
  console.log(`chillin at http://localhost:${port}`)
})
