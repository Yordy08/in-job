const express = require('express');
const domicilioController = require('../controllers/domicilioController'); // Asegúrate de que esta ruta sea correcta

const router = express.Router();

// Define las rutas y asocia cada una con una función del controlador
router.post('/', domicilioController.createDomicilio); // Crear un nuevo domicilio
router.get('/', domicilioController.getDomicilios); // Obtener todos los domicilios
router.get('/:id', domicilioController.getDomicilioById); // Obtener un domicilio por ID
router.put('/:id', domicilioController.updateDomicilio); // Actualizar un domicilio por ID
router.delete('/:id', domicilioController.deleteDomicilio); // Eliminar un domicilio por ID

module.exports = router;
