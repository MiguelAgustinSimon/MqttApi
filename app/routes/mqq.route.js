const express = require('express');
const router = express.Router();
const controller = require('../controllers/mqtt.controller'); // Ruta al archivo del controlador

// Ruta para obtener todos los usuarios
router.get('/api/mqtt', controller.getMqtt);
router.get('/api/getTemperatureEvents', controller.getTemperatureEvents);
router.get('/api/getHumidityEvents', controller.getHumidityEvents);


module.exports = router;
