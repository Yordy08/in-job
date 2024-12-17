const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Asegúrate de que dotenv esté cargando correctamente
const propuestaRoutes = require('./routes/propuestaRoutes');  // Importa las rutas

const app = express();
const port = 5000;

app.use(express.json());  // Middleware para recibir datos JSON

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Usa las rutas de propuesta
app.use('/propuesta', propuestaRoutes);
