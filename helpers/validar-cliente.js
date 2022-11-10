const validarCliente = (req) =>{
    const validaciones = [];

    if(!req.body.nombre){
        validaciones.push('Nombre es requerido');
    }

    if(!req.body.email){
        validaciones.push('Email es requerido');
    }

    
    return validaciones;
}
    
module.exports = {
    validarCliente,
}