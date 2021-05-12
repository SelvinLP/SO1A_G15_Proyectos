const { Router } = require('express');
const { servicios, GetRegistro, GetRegiones, GetDepartamentos,GetStatePatients,GetInfectedType,getAgeRange,DeleteAnyRegistros } = require('../controller/mongodb');
const router = Router();

// RUTA PARA OBTENER DATOS DE MENSAJERIAS (PUBSUB,....)
router.get('/data', GetRegistro);
router.post('/last5ingresspais', GetDepartamentos)
router.post('/genderfrompais', GetInfectedType)
router.get('/DeleteAny', DeleteAnyRegistros)
router.post('/', servicios);
//PONER AQUI SOLO RUTAS DE MONGODB

module.exports = router;
