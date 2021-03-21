const { Router } = require('express');
const { servicios, GetRegistro, GetRegiones, GetDepartamentos,GetStatePatients,GetInfectedType,getAgeRange } = require('../controller/mongodb');
const router = Router();

// RUTA PARA OBTENER DATOS DE MENSAJERIAS (PUBSUB,....)
router.get('/data', GetRegistro);
router.get('/regions', GetRegiones);
router.get('/topDepartaments', GetDepartamentos)
router.get('/statepatients', GetStatePatients)
router.get('/infectedtype', GetInfectedType)
router.get('/agerange', getAgeRange)
router.post('/', servicios);
//PONER AQUI SOLO RUTAS DE MONGODB

module.exports = router;
