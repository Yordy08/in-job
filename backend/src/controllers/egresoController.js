const Egreso = require('../models/Egreso');

// Crear un nuevo egreso
exports.createEgreso = async (req, res) => {
    try {
        const { descripcion, valor } = req.body;
        
        const nuevoEgreso = new Egreso({ descripcion, valor });
        const resultado = await nuevoEgreso.save();
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear egreso', error: error.message });
    }
};

// Obtener todos los egresos
exports.getEgresos = async (req, res) => {
    try {
        const egresos = await Egreso.find();
        res.status(200).json(egresos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener egresos', error: error.message });
    }
};

// Obtener un egreso por ID
exports.getEgresoById = async (req, res) => {
    try {
        const { id } = req.params;
        const egreso = await Egreso.findById(id);
        if (!egreso) {
            return res.status(404).json({ message: 'Egreso no encontrado' });
        }
        res.status(200).json(egreso);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener egreso', error: error.message });
    }
};

// Actualizar un egreso por ID
exports.updateEgreso = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const egreso = await Egreso.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!egreso) {
            return res.status(404).json({ message: 'Egreso no encontrado' });
        }
        res.status(200).json(egreso);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar egreso', error: error.message });
    }
};

// Eliminar un egreso por ID
exports.deleteEgreso = async (req, res) => {
    try {
        const { id } = req.params;
        const egreso = await Egreso.findByIdAndDelete(id);
        if (!egreso) {
            return res.status(404).json({ message: 'Egreso no encontrado' });
        }
        res.status(200).json({ message: 'Egreso eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar egreso', error: error.message });
    }
};
