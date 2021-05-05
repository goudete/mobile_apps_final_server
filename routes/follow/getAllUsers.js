const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


module.exports = async (req, res) => {

    const {
        user_id
    } = req.params;

    if (!user_id) {
        return res.status(400).json({'message': 'Invalid user id, try again'});
    }

    try {
        const users = await knex.select().from('cluster_users');
        const followeesDb = await knex.select('followee').from('friend_connections').where('follower', user_id);

        users.map((u) => {
            return u.followee = followeesDb.find((f) => f.followee === u.id) ? true : false;
        })

        return res.status(200).json({ users });
    } catch (e) {
        console.log('error:', e)
        return res.status(500).json({
            "db_error": e
        })
    }
}