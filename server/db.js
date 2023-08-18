const Pool = require('pg').Pool


const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: "localhost",
    port: 5432,
    database: "pern-todo"
});

module.exports = pool;

