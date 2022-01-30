require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

//crear servidor express
const app = express();

/*MIDDLEWARES*/
//Configurar cors
app.use(cors());
//Parse de body
app.use( express.json() );

//base de datos
dbConection();

//console.log(process.env);

//mike
//hola123

//Ruta
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

//Inico
app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en puerto: '+process.env.PORT)
})