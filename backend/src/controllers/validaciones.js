const validaciones = {}

validaciones.regexMonto = (monto) => {
    const regex = /^[0-9]+$/
    return regex.test(monto)
}

validaciones.regexConcepto = (concepto) => {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
    return regex.test(concepto)
}

validaciones.regexEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}

validaciones.regexUsuario = (user) => {
    const regex = /^[a-zA-Z0-9\-_\.]+$/
    return regex.test(user)
}

module.exports = validaciones