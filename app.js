// Inits
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Endpoints Begin
app.get('/', (req, res) => {
  res.send('Sup g!')
})

const createDb = require('./routes/createDb/db')
app.get('/create_db', createDb)


// Auth routes
const auth = require('./routes/auth/auth')
app.post('/auth', auth)


// Location routes
const createLocation = require('./routes/locations/createLocation')
app.post('/createLocation', createLocation);

const getAllLocations = require('./routes/locations/getAllLocations')
app.get('/getAllLocations', getAllLocations)

const getLocationByUser = require('./routes/locations/getLocation')
app.get('/getLocationByUser/:id', getLocationByUser)


// Follower routes
const createConnection = require('./routes/follow/createConnection');
app.post('/createConnection', createConnection)

const getFollowers = require('./routes/follow/getFollowers');
app.get('/getFollowers/:followee_id', getFollowers);

const getFollowees = require('./routes/follow/getFollowees');
app.get('/getFollowees/:follower_id', getFollowees);

const getAllUsers = require('./routes/follow/getAllUsers');
app.get('/getAllUsers', getAllUsers)


app.listen(port, () => {
  console.log(`chillin at http://localhost:${port}`)
})
