const { Pool } = require('pg');

const PG_URI = 'postgres://zwtkdwbq:3HwhYe8eDa74FMRlUdvtowRcJ2hym96V@jelani.db.elephantsql.com/zwtkdwbq';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};