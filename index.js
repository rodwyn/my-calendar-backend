const express = require('express');
require('dotenv').config();

// crear el servidor de express
const app = express();

// directorio público
app.use( express.static('public'));

// lectura y parseo del body
app.use( express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));
//TODO: auth // crear,login, renew


// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});
