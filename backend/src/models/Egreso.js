const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definir el esquema para los egresos
const egresoSchema = new Schema({
    descripcion: { type: String, required: true },
    valor: { type: Number, required: true },
   
});

const Egreso = mongoose.model('Egreso', egresoSchema);
module.exports = Egreso;
