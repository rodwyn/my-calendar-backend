const express = require('express');
require('dotenv').config();

// crear el servidor de express
const app = express();

// directorio público
app.use( express.static('public'));

// rutas
// app.get('/', (request, response) => {
//   response.json({
//     ok: true
//   });
// })

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});
