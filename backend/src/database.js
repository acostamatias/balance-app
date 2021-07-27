const mysql = require('mysql')
const database = require('./keys.js')
const {promisify} = require('util')

const pool = mysql.createPool(database)

pool.getConnection(function(err, connection) {
  if(err) throw err
  console.log('Base de datos conectada')

})

module.exports = pool
