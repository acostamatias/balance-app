const db = require('../database')
const bcrypt = require('bcrypt')
const { regexEmail, regexUsuario } = require('./validaciones')
const usuariosCtrl = {}

// Encriptar contraseña
const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
  
const matchPassword = (password, dbpassword) => {
    return bcrypt.compare(password, dbpassword)
}

usuariosCtrl.login = async (req,res) => {
    let sql = 'SELECT * from usuarios where usuariosNombre = ?'
    let data = req.query
    let usuariosPassword = data.usuariosPassword
    let usuariosNombre = data.usuariosNombre

    if(data.usuariosNombre !== 0 && data.usuariosPassword !== 0) {
        await db.query(sql, [usuariosNombre], async (err,results) => {
            if(err) throw err
            console.log(results.length)
            if(results.length > 0) {
                await matchPassword(data.usuariosPassword, results[0].usuariosPassword)
                .then(response => {
                    if(response) {
                        console.log(results[0])
                        res.send(results[0])
                    }else {
                        res.send(false)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }else {
                res.send(false)
            }
        })
    }
}

usuariosCtrl.register = async (req,res) => {
    let sqlUser = 'SELECT * FROM usuarios where usuariosNombre = ?'
    let sqlEmail = 'SELECT * FROM usuarios where usuariosEmail = ?'
    let sql = 'INSERT INTO usuarios set ?'
    let {usuariosNombre, usuariosEmail, password} = req.body
    let usuariosPassword = encryptPassword(password)
    let datos = {usuariosNombre, usuariosEmail, usuariosPassword}

    if(usuariosNombre !== 0 && usuariosPassword !== 0 && usuariosEmail !== 0) {

        if(regexEmail(usuariosEmail) && regexUsuario(usuariosNombre)){
            await db.query(sqlUser, [usuariosNombre], async (err, results) => {
                if(results.length < 1) {
                    await db.query(sqlEmail, [usuariosNombre], async (err, results) => {
                        if(results.length < 1) {
                            await db.query(sql, [datos], (err) => {
                                if(err) throw err
                                res.send('Cuenta creada correctamente.')
                            })
                        }else {
                            res.send('Ya existe una cuenta con el email ingresado.')
                        }
                    })
                }else {
                    res.send('Ya existe una cuenta con el nombre de usuario ingresado.')
                }
            })
        }
    }
}

module.exports = usuariosCtrl