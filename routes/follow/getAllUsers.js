const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


module.exports = async (req, res) => {

    try {
        const users = await knex.select().from('user')
        return res.json({ users })
    } catch (e) {
        console.log('error:', e)
        return res.status(500).json({
            "db_error": e
        })
    }
}