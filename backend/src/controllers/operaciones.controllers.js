const db = require('../database')
const {regexMonto, regexConcepto} = require('./validaciones')
const operacionesCtrl = {}

// GET operacion por id
operacionesCtrl.getOperacion = (req,res) => {
  const id = req.params.id
  let sql = 'SELECT * from operaciones where operacionesId = ? order by operacionesFecha asc'
  db.query(sql, [id], (err, results) => {
    if(err) throw err

    if(results.length > 0){
      res.send(results)
    }else {
      res.send('not found')
    }
  })
}

// GET operaciones según el tipo
operacionesCtrl.operacionesTipo = (req,res) => {
  const tipo = req.query
  
  let sql = 'SELECT *, DATE_FORMAT(operacionesFecha, "%d/%m/%Y") as fecha FROM operaciones WHERE relaTipo = ? and relaUsuario = ? order by operacionesFecha desc'
  if(tipo.id == 0) {
    sql = 'SELECT *, DATE_FORMAT(operacionesFecha, "%d/%m/%Y") as fecha FROM operaciones WHERE relaUsuario = ? order by operacionesFecha desc'
    db.query(sql, [tipo.idUsuario], (err, results) => {
      if(err) throw err
  
      if(results.length > 0){
        res.send(results)
  
      }else {
        return
      }
    })
  }else {
    db.query(sql, [tipo.id, tipo.idUsuario], (err, results) => {
      if(err) throw err
  
      if(results.length > 0){
        res.send(results)
      }else {
        return
      }
    })
  }

  
}

// GET balance 
operacionesCtrl.getBalance = (req,res) => {
  let id = req.params.id
  let sql = 'SELECT (ingreso - egreso) as balance FROM (select sum(operacionesMonto) as ingreso from operaciones where relaTipo = 1 and relaUsuario = ?) as v1, (select sum(operacionesMonto) as egreso from operaciones where relaTipo = 2 and relaUsuario = ?) as v2'

  db.query(sql,[id, id], (err, results) => {
    if(err) throw err
    if(results.length > 0){
      res.send(results)
    }else {
      return
    }
  })
}

operacionesCtrl.getUltimasOperaciones = (req,res) => {
  let id = req.params.id
  let sql = 'SELECT *, DATE_FORMAT(operacionesFecha, "%d/%m/%Y") as fecha FROM `operaciones` WHERE relaUsuario = ? order by operacionesFecha desc limit 10'

  db.query(sql, [id], (err, results) => {
    if(err) throw err
    if(results.length > 0){
      res.send(results)
    }else {
      return
    }
  })
  
}

// POST nueva operación
operacionesCtrl.nuevaOperacion = async (req,res) => {
  const {operacionesConcepto, operacionesMonto, relaTipo, relaUsuario} = req.body
  const sql = "INSERT INTO operaciones SET ?"

  const operacionesFecha = new Date()

  const nuevaOperacion = {
    operacionesConcepto,
    operacionesMonto,
    operacionesFecha,
    relaTipo,
    relaUsuario
  }
  
  if(regexMonto(nuevaOperacion.operacionesConcepto)){
    res.send('Solo letras en el concepto.')
    return
  }
  if(regexConcepto(nuevaOperacion.operacionesMonto)) {
    res.send('Solo numeros en el monto.')
    return
  }
  if(!nuevaOperacion.operacionesConcepto.trim()) {
    res.send('Complete todos los campos.')
    return
  }
  db.query(sql, [nuevaOperacion], (err, result) => {
    if (err) throw err
     res.send("Registros cargados: " + result.affectedRows)
  })
}

//DELETE eliminar operación
operacionesCtrl.eliminarOperacion = async (req,res) => {
  const eliminar = req.params.id
  const sql = "DELETE FROM operaciones WHERE operacionesId = ?"

  await db.query(sql, [eliminar], (err, result) => {
    if(err) throw err
    res.send("Registros eliminados: " + result.affectedRows)
  })
}

//PUT actualizar operación
operacionesCtrl.actualizarOperacion = async (req,res) => {
  const operacionesId = req.params.id
  const {operacionesConcepto, operacionesMonto, operacionesFecha, relaTipo} = req.body
  const sql = "UPDATE operaciones SET ? WHERE operacionesId = ?"

  const actualizar = {
    operacionesConcepto,
    operacionesMonto,
    operacionesFecha,
    relaTipo
  }
  console.log(actualizar)

  if(actualizar.operacionesMonto !== 0 || actualizar.operacionesConcepto !== '' || actualizar.relaTipo !== 0) {
    await db.query(sql, [actualizar, operacionesId], (err, result) => {
      if(err) throw err
      res.send("Registros actualiados: " + result.affectedRows)
    })
  }
}

module.exports = operacionesCtrl
