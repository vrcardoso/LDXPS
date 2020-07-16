 const {Client}= require('pg')

module.exports = new Client({
    user: 'DBA',
    host: 'localhost',
    database: 'LDXPS',
    password: '',
    port: 5432,
  })




