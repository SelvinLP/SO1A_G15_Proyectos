const { Router } = require('express');
const { servicios } = require('../controller/mongodb');
const router = Router();

// RUTA PARA OBTENER DATOS DE MENSAJERIAS (PUBSUB,....)
router.post('/', servicios);

//PONER AQUI SOLO RUTAS DE MONGODB

module.exports = router;