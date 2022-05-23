require('dotenv').config()
const pgPromise = require('pg-promise');

const pgp = pgPromise({});
pgp.pg.defaults.ssl=true;

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
 };

const db = pgp(config);
exports.db = db;