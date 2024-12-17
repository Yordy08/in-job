const Factura = require('../models/Factura');

// Crear una nueva factura
exports.createFactura = async (req, res) => {
  const { fecha, producto, precio, cantidad } = req.body;

  // Validar que todos los campos estén presentes
  if (!fecha || !producto || !precio || !cantidad) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevaFactura = new Factura({
      fecha,
      producto,
      precio,
      cantidad,
    });

    // Guardar la factura en la base de datos
    const facturaGuardada = await nuevaFactura.save();
    res.status(201).json({ message: 'Factura creada con éxito', factura: facturaGuardada });
  } catch (error) {
    console.error('Error al crear la factura:', error);
    res.status(500).json({ message: 'Error al crear la factura', error: error.message });
  }
};

// Obtener todas las facturas
exports.getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find();
    res.status(200).json(facturas);
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
    res.status(500).json({ message: 'Error al obtener las facturas', error: error.message });
  }
};

// Obtener una factura por ID
exports.getFacturaById = async (req, res) => {
  const { id } = req.params;

  try {
    const factura = await Factura.findById(id);
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.status(200).json(factura);
  } catch (error) {
    console.error('Error al obtener la factura:', error);
    res.status(500).json({ message: 'Error al obtener la factura', error: error.message });
  }
};

// Actualizar una factura por ID
exports.updateFactura = async (req, res) => {
  const { id } = req.params;
  const { fecha, producto, precio, cantidad } = req.body;

  try {
    const factura = await Factura.findById(id);
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }

    // Actualizar los campos proporcionados
    factura.fecha = fecha || factura.fecha;
    factura.producto = producto || factura.producto;
    factura.precio = precio || factura.precio;
    factura.cantidad = cantidad || factura.cantidad;

    const facturaActualizada = await factura.save();
    res.status(200).json({ message: 'Factura actualizada con éxito', factura: facturaActualizada });
  } catch (error) {
    console.error('Error al actualizar la factura:', error);
    res.status(500).json({ message: 'Error al actualizar la factura', error: error.message });
  }
};

// Eliminar una factura por ID
exports.deleteFactura = async (req, res) => {
  const { id } = req.params;

  try {
    const factura = await Factura.findById(id);
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }

    await factura.deleteOne();
    res.status(200).json({ message: 'Factura eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la factura:', error);
    res.status(500).json({ message: 'Error al eliminar la factura', error: error.message });
  }
};
