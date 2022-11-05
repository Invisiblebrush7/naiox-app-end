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

/**
 * Update - PUT /clients
 * Edit client
 */
router.put('/:id', getClient, clientsController.updateClient);

/**
 * Destroy - DELETE /clients/:id
 * Remove developer
 */
router.delete('/:id', getClient, clientsController.deleteClient);

async function getClient(req, res, next) {
	let client;
	try {
		client = await Client.findById(req.params.id);
		if (client == null) return res.status(404).json({ message: 'Client not found' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
	res.client = client;
	next();
}

module.exports = router;
