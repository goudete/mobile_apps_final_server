const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


module.exports = async (req, res) => {

    const {
        follower_id
    } = req.params;

    if (!follower_id) {
        return res.status(400).json({'message': 'Invalid follower id, try again'});
    }

    try {
        let followees = {};

        const followeesDb = await knex.select('followee').from('friend_connections').where('follower', follower_id);
        const users = await knex.select().from('cluster_users');

        const followeeObjects = followeesDb.map((f) => users.find((u) => u.id === f.followee))

        followees.followeeObjects = followeeObjects
        followees.followeeCount = followeeObjects.length

        return res.status(200).json({ followees })
    } catch (e) {
        console.log('error:', e)
        return res.status(500).json({
            "db_error": e
        })
    }


}