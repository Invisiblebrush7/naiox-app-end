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
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the client with id === :id
 */
router.get('/:id', clientsController.show);

/**
 * @swagger
 * /api/clients/:
 *   post:
 *     tags:
 *       - Clients
 *     description: Create a new client
 *     parameters:
 *
 *       - in: formData
 *         name: username
 *         type: string
 *         description: The client's username
 *
 *       - in: formData
 *         name: email
 *         type: string
 *         description: The client's email
 *
 *       - in: formData
 *         name: password
 *         type: string
 *         description: The client's password
 *
 *     responses:
 *       200:
 *         description: Receives changes for existing client, and returns it
 *       400:
 *         description: Bad Request - No client found with that id
 *       500:
 *         description: Server Error
 */
router.post('/', clientsController.newClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     tags:
 *       - Clients
 *     description: Edit an existing client
 *     parameters:
 *
 *       - in: path
 *         name: id
 *         required: true
 *
 *       - in: formData
 *         name: username
 *         type: string
 *         description: The client's username
 *
 *       - in: formData
 *         name: email
 *         type: string
 *         description: The client's email
 *
 *       - in: formData
 *         name: password
 *         type: string
 *         description: The client's password
 *
 *     responses:
 *       200:
 *         description: Receives changes for existing client, and returns it
 *       400:
 *         description: Bad Request - No client found with that id
 */
router.put('/:id', getClient, clientsController.updateClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     tags:
 *       - Clients
 *     description: Removes client with id === :id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
