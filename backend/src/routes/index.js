const router = require('express').Router()
const db = require('../database')
router.get('/', (req, res) => {
  const test = db.query('SELECT * FROM OPERACIONES', (error, results, fields) => {
    if(error)
    throw error

    results.forEach(result => {
      res.send(result)
    })
  })
})

module.exports = router
