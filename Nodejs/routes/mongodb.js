const { Router } = require('express');
const { servicios, GetRegistro, GetRegiones } = require('../controller/mongodb');
const router = Router();

// RUTA PARA OBTENER DATOS DE MENSAJERIAS (PUBSUB,....)
router.get('/data', GetRegistro);
router.get('/regions', GetRegiones);
router.post('/', servicios);
//PONER AQUI SOLO RUTAS DE MONGODB

module.exports = router;
