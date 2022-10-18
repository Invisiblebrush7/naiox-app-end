'use strict';
const express = require('express');
const router = express.Router();

const developersController = require('../controllers/developersController');

/**
 * Index - GET /developers
 * Get all developers
 */
router.get('/', developersController.index);

/**
 * Show - GET /developers/:id
 * Get info from specific developer
 */
router.get('/:id', developersController.show);

/**
 * Create - POST /developers
 * New developer
 */

router.post('/', developersController.newDeveloper);

module.exports = router;
