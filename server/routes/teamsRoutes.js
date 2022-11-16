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
 *       - Teams
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
 *       - Teams
 *     description: Get a team with the id === :id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the team with id === :id
 */
router.get('/:id', teamsController.show);

/**
 * @swagger
 * /api/teams/:
 *   post:
 *     tags:
 *       - Teams
 *     description: Create a new team
 *     parameters:
 *       - in: formData
 *         name: collaborators
 *         type: array
 *         items:
 *           - type: string
 *         description: Team's developers
 *       - in: formData
 *         name: teamLeader
 *         type: string
 *         description: Who is in charge of the team, needs an ID of a developer
 *       - in: formData
 *         name: teamName
 *         type: string
 *         description: The team's name
 *     responses:
 *       200:
 *         description: Receives changes for existing project, and returns it
 *       400:
 *         description: Bad Request - No team found with that id
 */
router.post('/', teamsController.newTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *   put:
 *     tags:
 *       - Teams
 *     description: Edit an existing team
 *     parameters:
 *
 *       - in: path
 *         name: id
 *         required: true
 *
 *       - in: formData
 *         name: collaborators
 *         type: array
 *         items:
 *           - type: string
 *         description: Team's developers
 *
 *       - in: formData
 *         name: teamLeader
 *         type: string
 *         description: Who is in charge of the team
 *
 *       - in: formData
 *         name: teamName
 *         type: string
 *         description: The team's name
 *     responses:
 *       200:
 *         description: Receives changes for existing project, and returns it
 *       400:
 *         description: Bad Request - No team found with that id
 */
router.put('/:id', getTeam, teamsController.updateTeam);

/**
 * @swagger
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     description: Removes team with id === :id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
