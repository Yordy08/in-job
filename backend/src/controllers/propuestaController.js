const Propuesta = require('../models/Propuesta');

// Crear una nueva propuesta
exports.createPropuesta = async (req, res) => {
  const { titulo, contenido, fechaPublicacion } = req.body;

  if (!titulo || !contenido || !fechaPublicacion) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  try {
    const nuevaPropuesta = new Propuesta({
      titulo,
      contenido,
      fechaPublicacion,
    });

    // Guardar la propuesta en la base de datos
    await nuevaPropuesta.save();
    res.status(201).json({ message: 'Propuesta creada con éxito', propuesta: nuevaPropuesta });
  } catch (error) {
    console.error('Error al guardar la propuesta:', error);
    res.status(500).json({ message: 'Error al guardar la propuesta', error: error.message });
  }
};

// Obtener todas las propuestas
exports.getPropuestas = async (req, res) => {
  try {
    const propuestas = await Propuesta.find();
    res.status(200).json(propuestas);
  } catch (error) {
    console.error('Error al obtener las propuestas:', error);
    res.status(500).json({ message: 'Error al obtener las propuestas' });
  }
};

// Obtener una propuesta por ID
exports.getPropuestaById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const propuesta = await Propuesta.findById(id);
    if (!propuesta) {
      return res.status(404).json({ message: 'Propuesta no encontrada' });
    }
    res.status(200).json(propuesta);
  } catch (error) {
    console.error('Error al obtener la propuesta:', error);
    res.status(500).json({ message: 'Error al obtener la propuesta' });
  }
};

// Actualizar una propuesta por ID
exports.updatePropuesta = async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido, fechaPublicacion } = req.body;

  try {
    const propuesta = await Propuesta.findById(id);
    if (!propuesta) {
      return res.status(404).json({ message: 'Propuesta no encontrada' });
    }

    propuesta.titulo = titulo || propuesta.titulo;
    propuesta.contenido = contenido || propuesta.contenido;
    propuesta.fechaPublicacion = fechaPublicacion || propuesta.fechaPublicacion;

    await propuesta.save();
    res.status(200).json({ message: 'Propuesta actualizada con éxito', propuesta });
  } catch (error) {
    console.error('Error al actualizar la propuesta:', error);
    res.status(500).json({ message: 'Error al actualizar la propuesta' });
  }
};

// Eliminar una propuesta por ID
exports.deletePropuesta = async (req, res) => {
  const { id } = req.params;

  try {
    const propuesta = await Propuesta.findById(id);
    if (!propuesta) {
      return res.status(404).json({ message: 'Propuesta no encontrada' });
    }

    await propuesta.remove();
    res.status(200).json({ message: 'Propuesta eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la propuesta:', error);
    res.status(500).json({ message: 'Error al eliminar la propuesta' });
  }
};
