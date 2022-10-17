'use strict';
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

/**
 * Index - GET /projects
 * Get all projects
 */
router.get('/', projectsController.index);

/**
 * Show - GET /developers/:id
 * Get info from specific project
 */
router.get('/:id', projectsController.show);

/**
 * Create - POST /projects
 * New project
 */

router.post('/', projectsController.newProject);

module.exports = router;
