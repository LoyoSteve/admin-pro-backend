require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

//crear servidor express
const app = express();

//Configurar cors
app.use(cors())

//base de datos
dbConection();

//console.log(process.env);

//mike
//hola123

//Ruta
app.get( '/', (req, res) => {
    res.json({
        "ok": true,
        "msg": "Hola we"
    })
} )

//Inico
app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en puerto: '+process.env.PORT)
})