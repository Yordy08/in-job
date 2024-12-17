const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true,
  },
  producto: {
    type: String,
    required: true,
  },
  precio: {
    type: String,
    required: true,
  },
  cantidad: {
    type: String,
    required: true,
  },
});

const Factura = mongoose.model('Factura', facturaSchema);

module.exports = Factura;
