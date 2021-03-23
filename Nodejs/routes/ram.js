const { Router } = require('express');
const { get_pol, get_util } = require('../controller/ram');
const router = Router();

// OBTENER RAM
router.get('/rampolygon', get_pol);
router.get('/rampercentaje', get_util);


module.exports = router;