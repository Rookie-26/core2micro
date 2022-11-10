const {Schema, model} = require('mongoose');

const TipoProyectoSchema = Schema ({
    nombre:{ 
        type:String,
        required:true,
        enum:[
            'Ensayo',
            'Artículo',
            'Monografía',
            'Trabajo Final Pregrado',
            'Trabajo Final Especialización',
        ]
        
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

module.exports = model('TipoProyecto', TipoProyectoSchema);