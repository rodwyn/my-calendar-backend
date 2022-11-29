const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config');

// crear el servidor de express
const app = express();

// base de datos 
dbConnection();

app.use(cors())

// directorio público
app.use( express.static('public'));

// lectura y parseo del body
app.use( express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//TODO: auth // crear,login, renew


// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});
