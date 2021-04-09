
const knex = require('knex')({
    client: 'pg',
    // connection: process.env.DATABASE_URL
    connection: {
      host : process.env.DB_HOST || '127.0.0.1',
      user : process.env.DB_USER || 'enriquegoudet',
      password : process.env.DB_PASSWORD || '',
      database : process.env.DATABASE || 'MobileAppsCluster'
    }
})

module.exports = async (req, res) => {

      const {
        name,
        email,
        google_id,
    }  = req.body;

    // validate payload
    if (!name || !email || !google_id) {
      return res.send("empty payload");
    }

    // see if user exists
    try {
      const exists = await knex.select('id').from('user').where('email', email);
      console.log(exists)
      if (exists.length > 0) return res.send('user exists')
    } catch (e) {
      return res.status(500).json({
        error: "db connection invalid"
      })
    }

    // user doesn't exist, enter into db
    try {
      await knex('user').insert({
        username: name,
        email: email,
        google_auth_id: google_id
      })
      res.status(200).json({'success': 'new user successfuly registered'});

    } catch (e) {
      console.log(e)
      res.status(500).json({error: e})
    }
}