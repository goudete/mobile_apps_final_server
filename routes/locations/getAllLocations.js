const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);

module.exports = async (req, res) => {
    
    try {
        const locations = await knex.select().from('locations')
        return res.json({ locations })
    } catch (e) {
        console.log('error:', e)
        return res.status(500).json({
            "db_error": e
        })
    }

}