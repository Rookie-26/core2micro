const {Schema, model} = require('mongoose');

const UniversidadSchema = Schema ({
    nombre:{
        type:String,
        required:true,
        unique:true,
    },

    direccion:{
        type:String,
        required:true,        
    },

    telefono:{
        type:Number,
        required:true,        
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

module.exports = model('Universidad', UniversidadSchema);