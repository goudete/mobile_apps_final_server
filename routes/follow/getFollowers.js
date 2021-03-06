const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


module.exports = async (req, res) => {

    const {
        followee_id
    } = req.params;

    if (!followee_id) {
        return res.status(400).json({'message': 'Invalid follower id, try again'});
    }

    try {
        let followers = {};

        const followersDb = await knex.select('follower').from('friend_connections').where('followee', followee_id);
        const users = await knex.select().from('cluster_users');

        const followerObjs = followersDb.map((f) => users.find((u) => u.id === f.follower))

        followers.followerObjects = followerObjs
        followers.followersCount = followerObjs.length

        return res.json({ followers })
    } catch (error) {
        console.log('error:', e)
        return res.status(500).json({
            "db_error": e
        })
    }


}