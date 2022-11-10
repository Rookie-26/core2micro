const { Router } = require('express');

const Proyecto = require('../models/Proyecto');

const {validarProyecto} = require('../helpers/validar-proyecto');

const router = Router();

router.post('/', async function(req,res){ //async: Función asíncrona
    try {
        const validaciones = validarProyecto(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        console.log('Obj recibido',req.body);

        const existeProyecto = await Proyecto.findOne({ numero: req.body.numero });
        if (existeProyecto){
            return res.status(400).send('Número de Proyecto ya existente en la base de datos');
        }

        let proyecto = new Proyecto(); 
        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaInicio = req.body.fechaInicio;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.fechaCreacion = new Date();
        proyecto.fechaActualizacion = new Date();
        proyecto.cliente = req.body.cliente._id;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.etapaProyecto = req.body.etapaProyecto._id;


        proyecto = await proyecto.save(); //await: Siempre debe usarase en una función asíncrona (async)

        res.send(proyecto);

    } catch (error) {
        console.log(error);
        res.status(400).send('Ocurrió un error al Crear el Proyecto');
    }
});

/* router.get('/', async function(req,res){
    try {
        const proyectos = await Proyecto.find().populate([//Populate es un arreglo de objs
            {
                path:'cliente', //Dice cuáles son las referencias q tiene mi Esquema para que haga el join. Path lleva el nombre de cada elemento creado en el Schema > model respectivo
                select:'nombre email' //Selecciona cuáles son los campos que queremos mostrar al realizar el Get en Postman
            },

            {
                path:'tipoProyecto', select:'nombre' 
            },

            {
                path:'universidad', select:'nombre direccion telefono'
            },

            {
                path:'etapaProyecto', select:'nombre' 
            }
        ]);
        res.send(proyectos);
    } catch (error) {
        res.status(500).send('Ocurrió un error al Consultar los Proyectos');
    }
}); */

/* router.get('/:proyectoId', async function (req,res){
    try {
        const proyecto = await Proyecto.findById(req.params.proyectoId);
        if (!proyecto){
            return res.status(404).send('El Proyecto no existe');
        }
        res.send(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Consultar la base de datos de Proyectos');
    }
}); */

router.put('/:proyectoId', async function(req,res){
    try {
        console.log('Obj recibido',req.body, req.params); //req.params: Son los parámetros del proyecto ID que viajan en la url

        let proyecto = await Proyecto.findById(req.params.proyectoId); 
        if (!proyecto){ //Si el proyecto no existe, entonces:
            return res.status(400).send('El proyecto no existe en la base de datos');
        }

        
        const existeProyecto = await Proyecto.findOne({numero: req.body.numero, _id: { $ne: proyecto._id}}); //ne: No Equals
        if (existeProyecto){
            return res.status(400).send('Número de Proyecto ya existente en la base de datos');
        }

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaInicio = req.body.fechaInicio;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.fechaActualizacion = new Date();
        proyecto.cliente = req.body.cliente;
        proyecto.tipoProyecto = req.body.tipoProyecto;
        proyecto.universidad = req.body.universidad;
        proyecto.etapaProyecto = req.body.etapaProyecto;

        proyecto = await proyecto.save(); //Al crear la instancia de proyecto, se puede acceder a sus métodos, como  .save();

        res.send(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al Actualizar el Proyecto');
    }
});

module.exports = router;