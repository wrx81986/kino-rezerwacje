const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true'
    ? {
        ca: fs.readFileSync(path.join(__dirname, 'server-ca.pem'), 'utf8'),
        servername: 'dcb0253e690a.3142c0zz1t1o9.europe-central2.sql-psa.goog'
    }
    : false
});

module.exports = pool;