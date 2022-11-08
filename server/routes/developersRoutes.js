'use strict';
const express = require('express');
const router = express.Router();

const Developer = require('../models/Developer');
const developersController = require('../controllers/developersController');

/**
 * @swagger
 * /api/developers:
 *   get:
 *     tags:
 *       - developers
 *     description: Get all developers
 *     responses:
 *       200:
 *         description: Returns an array of developers
 */
router.get('/', developersController.index);

/**
 * @swagger
 * /api/developers/{id}:
 *   get:
 *     tags:
 *       - developers
 *     description: Get a developer with the id === :id
 *     parameters:
 *       - in: id
 *     responses:
 *       200:
 *         description: Returns the developer with id === :id
 */
router.get('/:id', getDeveloper, developersController.show);

/**
 * @swagger
 * /api/developers:
 *   post:
 *     tags:
 *       - developers
 *     description: Create a new developer
 *     responses:
 *       200:
 *         description: Creates a new developer and returns it
 */
router.post('/', developersController.newDeveloper);

/**
 * @swagger
 * /api/developers/{id}:
 *   update:
 *     tags:
 *       - developers
 *     description: Edit an existing developer
 *     responses:
 *       200:
 *         description: Receives changes for existing developer, and returns it
 */
router.put('/:id', getDeveloper, developersController.updateDeveloper);

/**
 * @swagger
 * /api/developers/{id}:
 *   delete:
 *     tags:
 *       - developers
 *     description: Removes developer with id === :id
 *     responses:
 *       200:
 *         description: Removes developer with id === :id
 */
router.delete('/:id', getDeveloper, developersController.deleteDeveloper);

async function getDeveloper(req, res, next) {
	let developer;
	try {
		developer = await Developer.findById(req.params.id);
		if (developer == null) return res.status(404).json({ message: 'Developer not found' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
	res.developer = developer;
	next();
}

module.exports = router;
