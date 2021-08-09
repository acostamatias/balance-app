const router = require('express').Router()
const {
  getOperacion, operacionesTipo, getBalance, getUltimasOperaciones,
  nuevaOperacion, eliminarOperacion, actualizarOperacion,
} = require('../controllers/operaciones.controllers')

router.get('/operaciones/:id', getOperacion)

router.get('/operaciones-tipo', operacionesTipo)

router.get('/balance/:id', getBalance)

router.get('/ultimas-operaciones/:id', getUltimasOperaciones)

router.post('/nueva-operacion', nuevaOperacion)

router.delete('/eliminar-operacion/:id', eliminarOperacion)

router.put('/actualizar-operacion/:id', actualizarOperacion)

module.exports = router
