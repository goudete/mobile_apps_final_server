
module.exports = {
    development: {
        client: 'pg',
        connection: {
            host : process.env.DB_HOST || '127.0.0.1',
            user : process.env.DB_USER || 'enriquegoudet',
            password : process.env.DB_PASSWORD || '',
            database : process.env.DATABASE || 'MobileAppsCluster'
        }
    },
    staging: {
        client: 'postgresql',
        connection: {
        database: 'my_db',
        user:     'username',
        password: 'password'
        },
        pool: {
        min: 2,
        max: 10
        },
        migrations: {
        tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds/production',
        },
    },
    // production: {
    //     client: 'pg',
    //     connection: {
    //         host : process.env.DB_HOST,
    //         user : process.env.DB_USER,
    //         password : process.env.DB_PASS,
    //         database: process.env.DATABASE_URL
    //     },
    //     ssl: {
    //         rejectUnauthorized: false
    //     },
    //     pool: {
    //         min: 2,
    //         max: 10
    //     },
    //     migrations: {
    //     tableName: 'knex_migrations'
    //     }
    // }
};