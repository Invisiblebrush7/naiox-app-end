'use strict';
const express = require('express');
const router = express.Router();

const Team = require('../models/Team');
const teamsController = require('../controllers/teamsController');

/**
 * @swagger
 * /api/teams:
 *   get:
 *     tags:
 *       - teams
 *     description: Get all teams
 *     responses:
 *       200:
 *         description: Returns an array of teams
 */
router.get('/', teamsController.index);

/**
 * @swagger
 * /api/teams/{id}:
 *   get:
 *     tags:
 *       - teams
 *     description: Get a team with the id === :id
 *     parameters:
 *       - in: id
 *     responses:
 *       200:
 *         description: Returns the team with id === :id
 */
router.get('/:id', teamsController.show);

/**
 * @swagger
 * /api/teams:
 *   post:
 *     tags:
 *       - teams
 *     description: Create a new team
 *     responses:
 *       200:
 *         description: Creates a new team and returns it
 */
router.post('/', teamsController.newTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *   update:
 *     tags:
 *       - teams
 *     description: Edit an existing team
 *     responses:
 *       200:
 *         description: Receives changes for existing team, and returns it
 */
router.put('/:id', getTeam, teamsController.updateTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - teams
 *     description: Removes team with id === :id
 *     responses:
 *       200:
 *         description: Removes team with id === :id
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
