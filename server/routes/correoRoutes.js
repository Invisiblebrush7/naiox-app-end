'use strict';
const express = require("express");
const router = express.Router();

let envioController = require('../controllers/correoController');

router.post('/', envioController.enviarCorreo);

module.exports = router;