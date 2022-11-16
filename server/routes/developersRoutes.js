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
 *       - Developers
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
 *       - Developers
 *     description: Get a project with the id === :id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the project with id === :id
 */
router.get('/:id', developersController.show);

/**
 * @swagger
 * /api/developers/:
 *   post:
 *     tags:
 *       - Developers
 *     description: Create a new developer
 *     parameters:
 *
 *       - in: formData
 *         name: username
 *         type: string
 *         description: The developer's username
 *
 *       - in: formData
 *         name: email
 *         type: string
 *         description: The developer's email
 *
 *       - in: formData
 *         name: password
 *         type: string
 *         description: The developer's password
 *
 *       - in: formData
 *         name: team
 *         type: string
 *         description: ID of the developer's team
 *
 *     responses:
 *       200:
 *         description: Receives changes for existing developer, and returns it
 *       400:
 *         description: Bad Request - No developer found with that id
 */
router.post('/', developersController.newDeveloper);

/**
 * @swagger
 * /api/developers/{id}:
 *   put:
 *     tags:
 *       - Developers
 *     description: Edit an existing developer
 *     parameters:
 *
 *       - in: path
 *         name: id
 *         required: true
 *
 *       - in: formData
 *         name: username
 *         type: string
 *         description: The developer's username
 *
 *       - in: formData
 *         name: email
 *         type: string
 *         description: The developer's email
 *
 *       - in: formData
 *         name: password
 *         type: string
 *         description: The developer's password
 *
 *       - in: formData
 *         name: team
 *         type: string
 *         description: ID of the developer's team
 *
 *     responses:
 *       200:
 *         description: Receives changes for existing developer, and returns it
 *       400:
 *         description: Bad Request - No developer found with that id
 */
router.put('/:id', getDeveloper, developersController.updateDeveloper);

/**
 * @swagger
 * /api/developers/{id}:
 *   delete:
 *     tags:
 *       - Developers
 *     description: Removes developer with id === :id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
