const express = require('express');

const descuentosController = require('./controllers/descuentosController');

const app = express();

const PORT = 3001;

app.use(express.json());

//Rutas
app.get('/descuentos', descuentosController.obtenerDescuentos);
app.get('/descuentos/:id', descuentosController.obtenerDescuentoPorId);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});