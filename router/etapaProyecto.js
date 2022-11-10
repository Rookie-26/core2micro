const { Router } = require('express');

const EtapaProyecto = require('../models/EtapaProyecto');

const {validarEtapaProyecto} = require('../helpers/validar-etapaProyecto');

const router = Router();

router.post('/', async function(req,res){

    try {
        const validaciones = validarEtapaProyecto(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }


        console.log('Obj recibido',req.body);
    
        const existeEtapaProyecto = await EtapaProyecto.findOne({nombre: req.body.nombre});
        if (existeEtapaProyecto){
            return res.status(400).send('Etapa de Proyecto ya existente en la base de datos');
        }

        let etapaproyecto = new EtapaProyecto(); 
        etapaproyecto.nombre = req.body.nombre;
        etapaproyecto.fechaCreacion = new Date();
        etapaproyecto.fechaActualizacion = new Date();

        etapaproyecto = await etapaproyecto.save(); 

        res.send(etapaproyecto);

    } catch (error) {
        console.log(error);
        res.status(400).send('Ocurrió un error al Crear la Etapa de Proyecto');
    }
   

});


router.get('/', async function(req,res){
    try {
        const etapasproyecto = await EtapaProyecto.find();
        res.send(etapasproyecto);
    } catch (error) {
        res.status(500).send('Ocurrió un error al Consultar las Etapas de Proyecto');
    }
});

router.put('/:etapaProyectoId', async function(req,res){

    try {
        let etapaproyecto = await EtapaProyecto.findById(req.params.etapaProyectoId);
        if(!etapaproyecto){
            return res.status(400).send('La Etapa de Proyecto no existe');
        }

        const existeEtapaProyecto = await EtapaProyecto.findOne({nombre: req.body.nombre, _id: { $ne: etapaproyecto._id}});
        if (existeEtapaProyecto){
            return res.status(400).send('Etapa de Proyecto ya existente en la base de datos');
        }

                etapaproyecto.nombre = req.body.nombre;
        etapaproyecto.fechaActualizacion = new Date();


    } catch (error) {
        res.status(500).send('Ocurrió un error al Actualizar la Etapa de Proyecto');
    }

    
});

module.exports = router; //Se exporta router porq es el q va a tener todas las rutas de la plicación
