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

//conectar base de datos
dbConection();

/*directorio publico*/
//con express estatic declaramos el nombre de la carpeta y servimos un index.html
app.use(express.static('public'))

//mike
//hola123

//Ruta
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/uploads', require('./routes/uploads'));

//Inico
app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en puerto: '+process.env.PORT)
})