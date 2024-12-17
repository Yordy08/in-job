const Domicilio = require('../models/Domicilio');

// Crear un nuevo domicilio
exports.createDomicilio = async (req, res) => {
    try {
        const { fecha, nombre, direccion, telefono, producto, estadoPago, precio, cantidad } = req.body;
        const nuevoDomicilio = new Domicilio({ fecha, nombre, direccion, telefono, producto, estadoPago, precio, cantidad });
        const resultado = await nuevoDomicilio.save(); 
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear domicilio', error: error.message });
    }
};
  
// Obtener todos los domicilios
exports.getDomicilios = async (req, res) => {
    try {
        const domicilios = await Domicilio.find();
        res.status(200).json(domicilios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener domicilios', error: error.message });
    }
};

// Obtener un domicilio por ID
exports.getDomicilioById = async (req, res) => {
    try {
        const { id } = req.params;
        const domicilio = await Domicilio.findById(id);
        if (!domicilio) {
            return res.status(404).json({ message: 'Domicilio no encontrado' });
        }
        res.status(200).json(domicilio);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener domicilio', error: error.message });
    }
};

// Actualizar un domicilio por ID
exports.updateDomicilio = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const domicilio = await Domicilio.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!domicilio) {
            return res.status(404).json({ message: 'Domicilio no encontrado' });
        }
        res.status(200).json(domicilio);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar domicilio', error: error.message });
    }
};

// Eliminar un domicilio por ID
exports.deleteDomicilio = async (req, res) => {
    try {
        const { id } = req.params;
        const domicilio = await Domicilio.findByIdAndDelete(id);
        if (!domicilio) {
            return res.status(404).json({ message: 'Domicilio no encontrado' });
        }
        res.status(200).json({ message: 'Domicilio eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar domicilio', error: error.message });
    }
};
