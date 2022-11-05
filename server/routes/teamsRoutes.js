'use strict';
const express = require('express');
const router = express.Router();

const Team = require('../models/Team');
const teamsController = require('../controllers/teamsController');

/**
 * Index - GET /projects
 * Get all projects
 */
router.get('/', teamsController.index);

/**
 * Show - GET /developers/:id
 * Get info from specific project
 */
router.get('/:id', teamsController.show);

/**
 * Create - POST /teams
 * New Team
 */

router.post('/', teamsController.newTeam);

/**
 * Update - PUT /projects/:id
 * Edit developer
 */
router.put('/:id', getTeam, teamsController.updateTeam);

/**
 * Destroy - DELETE /teams/:id
 * Remove developer
 */
router.delete('/:id', getTeam, teamsController.deleteTeam);

async function getTeam(req, res, next) {
	let team;
	try {
		team = await Team.findById(req.params.id);
		if (team == null) return res.status(404).json({ message: 'Team not found' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
	res.team = team;
	next();
}

module.exports = router;
