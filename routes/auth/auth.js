const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


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
        "db_error": e,
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
      console.log('error:', e)
      return res.status(500).json({ "db_error": e })
    }
}