const { Router } = require('express');

const TipoProyecto = require('../models/TipoProyecto');

const {validarTipoProyecto} = require('../helpers/validar-tipoProyecto');

const router = Router();

router.post('/', async function(req,res){
    try {
        const validaciones = validarTipoProyecto(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        console.log('Obj recibido',req.body);
    
        const existeTipoProyecto = await TipoProyecto.findOne({nombre: req.body.nombre});
        if (existeTipoProyecto){
            return res.status(400).send('Tipo de Proyecto ya existente en la base de datos');
        }

        let tipoproyecto = new TipoProyecto(); 
        tipoproyecto.nombre = req.body.nombre;
        tipoproyecto.fechaCreacion = new Date();
        tipoproyecto.fechaActualizacion = new Date();

        tipoproyecto = await tipoproyecto.save(); 

        res.send(tipoproyecto);

    } catch (error) {
        console.log(error);
        res.status(400).send('Ocurrió un error al Crear el Tipo de Proyecto');
    }
});

router.get('/', async function(req,res){
    try {
        const tiposproyecto = await TipoProyecto.find();
        res.send(tiposproyecto);
    } catch (error) {
        res.status(500).send('Ocurrió un error al Consultar lao Tipos de Proyecto');
    }
});

router.put('/:tipoProyectoId', async function(req,res){
    try {
        let tipoproyecto = await TipoProyecto.findById(req.params.tipoProyectoId);
        if(!tipoproyecto){
                return res.status(400).send('El Tipo de Proyecto no existe');
        }

        const existeTipoProyecto = await EtapaProyecto.findOne({nombre: req.body.nombre, _id: { $ne: tipoproyecto._id}});
        if (existeTipoProyecto){
            return res.status(400).send('Tipo de Proyecto ya existente en la base de datos');
        }

        tipoproyecto.nombre = req.body.nombre;
        tipoproyecto.fechaActualizacion = new Date();


    } catch (error) {
        res.status(500).send('Ocurrió un error al Actualizar el Tipo de Proyecto');
    }

    
});

module.exports = router; //Se exporta router porq es el q va a tener todas las rutas de la plicación
