const express = require('express');
const egresoController = require('../controllers/egresoController');

const router = express.Router();

// Rutas para los egresos
router.post('/', egresoController.createEgreso); // Crear un nuevo egreso
router.get('/', egresoController.getEgresos); // Obtener todos los egresos
router.get('/:id', egresoController.getEgresoById); // Obtener un egreso por ID
router.put('/:id', egresoController.updateEgreso); // Actualizar un egreso por ID
router.delete('/:id', egresoController.deleteEgreso); // Eliminar un egreso por ID

module.exports = router;
