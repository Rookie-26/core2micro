const {Schema, model} = require('mongoose');

const EtapaProyectoSchema = Schema ({
    nombre:{ 
        type:String,
        required:true,
        enum:[  'Anteproyecto',
                'Entrega Parcial 1',
                'Entrega Parcial 2',
                'Entrega Final',
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

module.exports = model('EtapaProyecto', EtapaProyectoSchema);