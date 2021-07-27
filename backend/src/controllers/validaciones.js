const validaciones = {}

validaciones.regexMonto = (monto) => {
    const regex = /^[0-9]+$/
    return regex.test(monto)
}

validaciones.regexConcepto = (concepto) => {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
    return regex.test(concepto)
}

module.exports = validaciones