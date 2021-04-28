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
      return res.status(400).json({'message':'empty payload'});
    }

    // see if user exists
    try {
      const exists = await knex.select('id').from('cluster_users').where('email', email);
      if (exists.length > 0) return res.json({ body: exists[0]});
    } catch (e) {
      return res.status(500).json({
        error: e,
      })
    }

    // user doesn't exist, enter into db
    try {
      await knex('cluster_users').insert({
        username: name,
        email: email,
        google_auth_id: google_id
      })

      const user_id = await knex.select('id').from('cluster_users').where('email', email);
      res.status(200).json({ body: user_id[0]});

    } catch (e) {
      return res.status(500).json({ error: e })
    }
}