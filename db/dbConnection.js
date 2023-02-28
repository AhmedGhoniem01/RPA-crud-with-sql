const dbConfig = require('./dbConfig');
const {Pool} = require('pg');

//Create new connection pool
const pool = new Pool(dbConfig);

//Database query method
exports.dbQuery = async(queryText, queryParams) => {
    try{
        const res = await pool.query(queryText, queryParams);
        console.log('\nExecuted query successfully.....', {query:queryText, result: res.rows});
        return res.rows;
    }catch(err){
        console.log('Failed to execute query.....', {query:queryText, result: err.message});
        throw err;
    }
}


