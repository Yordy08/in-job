const express = require('express');
const propuestaController = require('../controllers/propuestaController');  // Asegúrate de que el controlador esté correcto

const router = express.Router();

// Ruta para crear una nueva propuesta (POST)
router.post('/', propuestaController.createPropuesta);

// Ruta para obtener todas las propuestas (GET)
router.get('/', propuestaController.getPropuestas);

// Ruta para obtener una propuesta por su ID (GET)
router.get('/:id', propuestaController.getPropuestaById);

// Ruta para actualizar una propuesta (PUT)
router.put('/:id', propuestaController.updatePropuesta);

// Ruta para eliminar una propuesta (DELETE)
router.delete('/:id', propuestaController.deletePropuesta);

module.exports = router;
