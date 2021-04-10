const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);


module.exports = async (req, res) => {

    const {
        follower_id
    } = req.params;

    if (!follower_id) {
        return res.send('Invalid id, try again');
    }

    
}