const { Router } = require('express');

const Universidad = require('../models/Universidad');

const {validarUniversidad} = require('../helpers/validar-universidad');

const router = Router();

router.post('/', async function(req,res){
    try {
        const validaciones = validarUniversidad(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        console.log('Obj recibido',req.body);

        const existeUniversidad = await Universidad.findOne({nombre: req.body.nombre});
        if (existeUniversidad){
            return res.status(400).send('Universidad ya existente en la base de datos');
        }

        //Asociación de lo enviado en el req.body a un nuevo universidad
        let universidad = new Universidad(); //Creación de nueva instancia del modelo Universidad
        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaCreacion = new Date();
        universidad.fechaActualizacion = new Date();

        universidad = await universidad.save(); //Al crear la instancia de universidad, se puede acceder a sus métodos, como  .save();

        res.send(universidad);

    } catch (error) {
        console.log(error);
        res.status(400).send('Ocurrió un error al Crear la Universidad');
    }
});

router.get('/', async function(req,res){
    try {
        const universidades = await Universidad.find();
        res.send(universidades);
    } catch (error) {
        res.status(500).send('Ocurrió un error al Consultar la Universidad');
    }
});

router.put('/:universidadId', async function(req,res){
    try {
        console.log('Obj recibido',req.body, req.params); 

        let universidad = await Universidad.findById(req.params.universidadId);
        if (!universidad){ 
            return res.status(400).send('La universidad no existe en la base de datos');
        }

        
        const existeUniversidad = await Universidad.findOne({nombre: req.body.nombre, _id: { $ne: universidad._id}});
        if (existeUniversidad){
            return res.status(400).send('Universidad ya existente en la base de datos');
        }

        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaActualizacion = new Date();

        universidad = await universidad.save(); //Al crear la instancia de universidad, se puede acceder a sus métodos, como  .save();

        res.send(universidad);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar la Univrsidad');
    }
});

module.exports = router; //Se exporta router porq es el q va a tener todas las rutas de la plicación
