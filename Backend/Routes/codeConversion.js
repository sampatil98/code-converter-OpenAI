const express = require('express');
const router = express.Router();
const { convertCode } = require('./codeConversionController');

router.post('/', convertCode);

module.exports = router;
