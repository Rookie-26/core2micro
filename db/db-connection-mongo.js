const mongoose = require('mongoose');

const getConnection = async () => {
    try{
    const url ='mongodb://admin_bd:admin_bd@ac-kh5bljs-shard-00-00.8uwybhn.mongodb.net:27017,ac-kh5bljs-shard-00-01.8uwybhn.mongodb.net:27017,ac-kh5bljs-shard-00-02.8uwybhn.mongodb.net:27017/proyecto-univ?ssl=true&replicaSet=atlas-4739to-shard-0&authSource=admin&retryWrites=true&w=majority';

    await mongoose.connect(url);

    console.log('Conexión exitosa');

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getConnection,
}