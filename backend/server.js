const mongoose = require('mongoose');
const { app } = require('./src/app');
require('dotenv').config(); 

const port = process.env.PORT ||3000;

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




