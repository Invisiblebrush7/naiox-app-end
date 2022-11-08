'use strict';
const express = require('express');
const router = express.Router();

const Client = require('../models/Client');
const clientsController = require('../controllers/clientsController');

/**
 * @swagger
 * /api/clients:
 *   get:
 *     tags:
 *       - Clients
 *     description: Get all clients
 *     responses:
 *       200:
 *         description: Returns an array of clients
 */
router.get('/', clientsController.index);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     tags:
 *       - Clients
 *     description: Get a client with the id === :id
 *     parameters:
 *       - in: id
 *     responses:
 *       200:
 *         description: Returns the client with id === :id
 */
router.get('/:id', clientsController.show);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     tags:
 *       - Clients
 *     description: Create a new client
 *     responses:
 *       200:
 *         description: Creates a new client and returns is
 */
router.post('/', clientsController.newClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   update:
 *     tags:
 *       - Clients
 *     description: Edit an existing client
 *     responses:
 *       200:
 *         description: Receives changes for existing client, and returns it
 */
router.put('/:id', getClient, clientsController.updateClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     tags:
 *       - Clients
 *     description: Removes client with id === :id
 *     responses:
 *       200:
 *         description: Removes client with id === :id
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
