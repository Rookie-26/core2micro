const {Schema, model} = require('mongoose');

const ClienteSchema = Schema ({
    nombre:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    fechaCreacion:{
        type:Date,
        required:true,
    },

    fechaActualizacion:{
        type:Date,
        required:true,
    }

});

module.exports = model('Cliente', ClienteSchema); //Aquí se le dice a MongoDB, que se va a crear un nuevo Cliente (una nueva tabla) usando el Esquema de ClienteSchema
//El modelo se llamó 'CLiente', pero Mongo DB lo cambia a: clientes, a minúsc y a plural