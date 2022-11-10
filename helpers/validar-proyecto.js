const validarProyecto = (req) => {
    const validaciones = [];

    if(!req.body.numero){
        validaciones.push('El Número del Proyecto es requerido');
    }

    if(!req.body.titulo){
        validaciones.push('El Título del Proyecto es requerido');
    }

    if(!req.body.fechaInicio){
        validaciones.push('La Fecha de Inicio del Proyecto es requerida');
    }

    if(!req.body.fechaEntrega){
        validaciones.push('La Fecha de Entrega del Proyecto es requerida');
    }

    if(!req.body.valor){
        validaciones.push('El Valor del Proyecto es requerido');
    }

    if(!req.body.cliente){
        validaciones.push('El Cliente del Proyecto es requerido');
    }

    if(!req.body.tipoProyecto){
        validaciones.push('El Tipo Proyecto es requerido');
    }

    if(!req.body.universidad){
        validaciones.push('La Universidad es requerida');
    }

    if(!req.body.etapaProyecto){
        validaciones.push('La Etapa del Proyecto es requerida');
    }

    return validaciones;
}

module.exports = {
    validarProyecto,
}