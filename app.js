// Inits
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Endpoints Begin
app.get('/', (req, res) => {
  res.send('Sup g!')
})

const createDb = require('./routes/createDb/db');
app.get('/create_db', createDb);

const auth = require('./routes/auth/auth');
app.post('/auth', auth);

const createLocation = require('./routes/locations/createLocation');
app.get('/location', createLocation);

app.listen(port, () => {
  console.log(`chillin at http://localhost:${port}`)
})
