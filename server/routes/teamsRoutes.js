'use strict';
const express = require('express');
const router = express.Router();
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

module.exports = router;
