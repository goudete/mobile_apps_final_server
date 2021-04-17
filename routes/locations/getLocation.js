const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


module.exports = async (req, res) => {

    const {
        id
    } = req.params;

   if (!id) {
       return res.status(400).json({'message':'Invalid id, try again'});
   }

   try {
       const location = await knex.select().from('locations').where('id', id);
       return res.status(200).json({ location })
   } catch (e) {
        console.log('error:', e)
        return res.status(500).json({
            "db_error": e
        })
   }

}