const express = require('express');
const router = express.Router();
const controller = require('../controllers/mqtt.controller'); // Ruta al archivo del controlador

// Ruta para obtener todos los usuarios
router.get('/api/getTemperatureEvents', controller.getTemperatureEvents);
router.get('/api/getHumidityEvents', controller.getHumidityEvents);
router.get('/api/getDistanceEvents', controller.getDistanceEvents);

module.exports = router;
