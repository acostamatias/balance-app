const router = require('express').Router()
const {login, register} = require("../controllers/usuarios.controllers")

router.get("/login", login)

router.post("/register", register)

module.exports = router