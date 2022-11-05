'use strict';
const express = require('express');
const router = express.Router();

const Developer = require('../models/Developer');
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
router.get('/:id', getDeveloper, developersController.show);

/**
 * Create - POST /developers
 * New developer
 */

router.post('/', developersController.newDeveloper);

/**
 * Update - PUT /developers
 * Edit developer
 */
router.put('/:id', getDeveloper, developersController.updateDeveloper);

/**
 * Destroy - DELETE /developers/:id
 * Remove developer
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
