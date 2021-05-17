const { Router } = require('express');
const { get_proc } = require('../controller/proceso');
const router = Router();

// OBTENER PROCESOS
router.get('/processes', get_proc);

module.exports = router;