const express = require('express');
const app = express();

const routes = require('./app/routes/mqq.route');

app.use('/', routes);


  const port = 3000; // Puerto en el que se ejecutará el servidor
  app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
  });
  