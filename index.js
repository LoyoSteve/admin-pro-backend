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
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

//Inico
app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en puerto: '+process.env.PORT)
})