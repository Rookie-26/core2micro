const validarUniversidad = (req) =>{
    const validaciones = [];

    if(!req.body.nombre){
        validaciones.push('Nombre es requerido');
    }

    if(!req.body.direccion){
        validaciones.push('Dirección es requerida');
    }

    if(!req.body.telefono){
        validaciones.push('Teléfono es requerido');
    }

    
    return validaciones;
}
    
module.exports = {
    validarUniversidad,
}