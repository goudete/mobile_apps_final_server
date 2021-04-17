const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);

module.exports = async (req, res) => {

   const {
        user_id,
        name,
        google_place_id,
        description,
        rating
   } = req.body;

   // validate payload
   if (!user_id || !name || !google_place_id || !description || !rating ) {
       return res.status(400).json({'message':'Invalid payload, try again'});
    //    throw Error("invalid payload")
   }

   // check if row already exists
   try {
    const existingLocation = await knex.select('id').from('locations').where('user_id', user_id).where('google_place_id', google_place_id);
    if (existingLocation.length > 0) return res.json({'message':'location already exists'});
    } catch (e) {
        console.log('error:', e)
        return res.status(500).json({
            "db_error": e
        })
   }

   // location doesn't exist, enter to db
   try {
        await knex('locations').insert({
            user_id: user_id,
            name: name,
            google_place_id: google_place_id,
            description: description,
            rating: rating,
        })
        res.status(201).json({'success': 'new location successfuly created'});
   } catch (e) {
        console.log('error:', e)
        return res.status(500).json({ "db_error": e })
   }
}