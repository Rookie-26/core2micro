const express = require('express');

const {getConnection} = require('./db/db-connection-mongo');

const cors = require('cors');


const app = express();
const port = 5001; //http://localhost:5000/
//const port = process.env.PORT;

//CORS
app.use(cors());

getConnection();

//Parseo JSON
app.use(express.json()); //Middleware: Para que reciba datos

app.use('/cliente', require('./router/cliente'));
app.use('/universidad', require('./router/universidad'));
app.use('/etapa-proyecto', require('./router/etapaProyecto'));
app.use('/tipo-proyecto', require('./router/tipoProyecto'));
app.use('/proyecto', require('./router/proyecto'));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });