const { Router } = require('express');

const Cliente = require('../models/Cliente');

const {validarCliente} = require('../helpers/validar-cliente');

const router = Router();

router.post('/', async function(req,res){

    try {
        const validaciones = validarCliente(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        console.log('Obj recibido',req.body);

        const existeCliente = await Cliente.findOne({email: req.body.email});
        if (existeCliente){
            return res.status(400).send('Email ya existente en la base de datos');
        }

        //Asociación de lo enviado en el req.body a un nuevo cliente
        let cliente = new Cliente(); //Creación de nueva instancia del modelo Cliente
        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fechaCreacion = new Date();
        cliente.fechaActualizacion = new Date();

        cliente = await cliente.save(); //Al crear la instancia de cliente, se puede acceder a sus métodos, como  .save();

        res.send(cliente);

    } catch (error) {
        console.log(error);
        res.status(400).send('Ocurrió un error al Crear el Cliente');
    }
   

});

router.get('/', async function(req,res){ //No recibe parámetros
    try {
        const clientes = await Cliente.find();
        res.send(clientes);
    } catch (error) {
        res.status(500).send('Ocurrió un error al Consultar los Clientes');
    }
});

router.put('/:clienteId', async function(req,res){

    try {
        console.log('Obj recibido',req.body, req.params); //req.params: Son los parámetros del cliente ID que viajan en la url

        let cliente = await Cliente.findById(req.params.clienteId);
        if (!cliente){ //Si el cliente no existe, entonces:
            return res.status(400).send('El cliente no existe en la base de datos');
        }

        
        const existeCliente = await Cliente.findOne({email: req.body.email, _id: { $ne: cliente._id}});
        if (existeCliente){
            return res.status(400).send('Email ya existente en la base de datos');
        }

        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fechaActualizacion = new Date();

        cliente = await cliente.save(); //Al crear la instancia de cliente, se puede acceder a sus métodos, como  .save();

        res.send(cliente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el Cliente');
    }
   

});

module.exports = router; //Se exporta router porq es el q va a tener todas las rutas de la plicación
