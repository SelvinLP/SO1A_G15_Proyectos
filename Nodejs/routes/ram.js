const { Router } = require('express');
const { get_pol, get_util } = require('../controller/ram');
const router = Router();

// OBTENER RAM
router.get('/get_pol', get_pol);
router.get('/get_util', get_util);

module.exports = router;