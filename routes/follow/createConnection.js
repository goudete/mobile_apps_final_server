const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


module.exports = async (req, res) => {
    const {
        follower,
        followee
    } = req.body;

    // Validate payload
    if (!followee || !follower) {
        return res.send('Invalid payload, try again');
    }

    // check if connection alreay exists
    try {
        const connection = await knex.select().from('friend_connections').where('follower', follower);
        console.log('connection:', connection)
        const existing = connection.find((c) => c.followee == followee);
        if (existing) return res.send('connection already exists');
    } catch (e) {
            console.log('error:', e)
            return res.status(500).json({
                "db_error": e
            })
    }

    // Connection doesn't exist, insert to db
    try {
            await knex('friend_connections').insert({
                follower: follower,
                followee: followee,
            })
            res.status(201).json({'success': 'connection created successfuly'})
    } catch (e) {
            console.log('error:', e)
            return res.status(500).json({ "db_error": e })
    }
}