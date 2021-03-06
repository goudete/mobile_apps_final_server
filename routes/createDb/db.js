const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../db/dbConfig')[environment];
const knex = require('knex')(config);

module.exports = (req, res) => {

  try {
    knex.schema.createTable('cluster_users', (table) => {
      table.increments('id')
      table.string('username')
      table.string('email')
      table.string('password')
      table.string('google_auth_id')
    })
    .then(() => res.json({'success': 'table'}))
  
    knex.schema.createTable('locations', (table) => {
      table.increments('id')
      table.integer('user_id').references('id').inTable('cluster_users').notNull().onDelete('cascade');
      table.string('name')
      table.string('google_place_id')
      table.string('description', 1000)
      table.integer('rating')
    })
    .then(() => res.json({'success': 'table'}))
  
    knex.schema.createTable('friend_connections', (table) => {
      table.increments('id')
      table.integer('follower').references('id').inTable('cluster_users').notNull().onDelete('cascade');
      table.integer('followee').references('id').inTable('cluster_users').notNull().onDelete('cascade');
    })
    .then(() => res.json({'success': 'table'}))
  } catch (error) {
    console.log(error);
  }
  
};