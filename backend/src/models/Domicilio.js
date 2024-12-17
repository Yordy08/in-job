const mongoose = require('mongoose');
const { Schema } = mongoose;

const domicilioSchema = new Schema({
    fecha: { type: String, required: true },
    nombre: { type: String, required: true },
    precio: { type: String, required: true },
    cantidad: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    producto: { type: String, required: true },
    estadoPago: { type: String, required: true },
});

const Domicilio = mongoose.model('Domicilio', domicilioSchema);
module.exports = Domicilio;
