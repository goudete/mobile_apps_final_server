const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


module.exports = async (req, res) => {

    try {
        const users = await knex.select().from('cluster_users');
        console.log(users);
        return res.status(200).json({ users });
    } catch (e) {
        console.log('error:', e)
        return res.status(500).json({
            "db_error": e
        })
    }
}