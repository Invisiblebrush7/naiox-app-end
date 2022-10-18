'use strict';
const express = require('express');
const router = express.Router();

const Client = require('../models/Client');
const clientsController = require('../controllers/clientsController');

/**
 * Index - GET /clients
 * Get all clients
 */
router.get('/', clientsController.index);

/**
 * Show - GET /clients/:id
 * Get info from specific client
 */
router.get('/:id', clientsController.show);

/**
 * Create - POST /clients
 * New client
 */

router.post('/', clientsController.newClient);

module.exports = router;
