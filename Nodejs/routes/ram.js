const { Router } = require('express');
const { get_ram } = require('../controller/ram');
const router = Router();

// OBTENER RAM
router.get('/getram', get_ram);

module.exports = router;