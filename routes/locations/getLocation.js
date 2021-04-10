const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


module.exports = async (req, res) => {

    const {
        id
    } = req.params;

   if (!id) {
       return res.send('Invalid id, try again');
   }

   try {
       const location = await knex.select().from('locations').where('id', id);
       return res.json({ location })
   } catch (e) {
        console.log('error:', e)
        return res.status(500).json({
            "db_error": e
        })
   }

}