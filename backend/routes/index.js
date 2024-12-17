require('dotenv').config(); // Carga las variables del archivo .env
const mongoose = require('mongoose');

// Obtén la URI desde el archivo .env
const uri = process.env.MONGO_URI;

// Opciones para evitar advertencias
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conecta a MongoDB
mongoose.connect(uri, options)
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB Atlas:', error);
  });

// Manejo de eventos de desconexión/reconexión
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB desconectado');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconectado');
});
