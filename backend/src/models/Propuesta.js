const mongoose = require('mongoose');

// Define el esquema de la propuesta
const propuestaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fechaPublicacion: {
    type: Date,
    required: true,
  },
});

const Propuesta = mongoose.model('Propuesta', propuestaSchema);

module.exports = Propuesta;
