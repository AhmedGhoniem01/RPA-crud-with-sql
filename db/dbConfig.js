require('dotenv').config();
const env = process.env;

//Database connection settings
exports.dbConfig = {
    host: env.PGHOST,
    user: env.PGUSER,
    port: env.PGPORT,
    password: env.PGPASSWORD,
    database: env.PGDATABASE 
}

