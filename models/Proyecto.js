const {Schema, model} = require('mongoose');

const ProyectoSchema = Schema ({
    numero:{
        type:Number,
        required:true, 
        unique:true,
    },

    titulo:{
        type:String,
        required:true,
        },

    fechaInicio:{
        type:String,
        required:true,
    },

    fechaEntrega:{
        type:String,
        required:true,
    },

    valor:{
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
    },

    cliente:{
        type:Schema.Types.ObjectId,
        ref:'Cliente', 
        required:true,       
    },

    tipoProyecto:{
        type:Schema.Types.ObjectId,
        ref:'TipoProyecto', //Aquí en ref, se referencia el nombre del modelo (el cual se encuentra dentro de cada Archivo de models, en la parte final en donde se exporta el mismo)
        required:true,
    },

    universidad:{
        type:Schema.Types.ObjectId,
        ref:'Universidad',
        required:true,
    },

    etapaProyecto:{
        type:Schema.Types.ObjectId, //Esta es la Primary Key
        ref:'EtapaProyecto',
        required:true,
    }    

});

module.exports = model('Proyecto', ProyectoSchema);