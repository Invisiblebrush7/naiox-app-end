'use strict';
const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
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

/**
 * Update - PUT /projects/:id
 * Edit developer
 */
router.put('/:id', getProject, projectsController.updateProject);

/**
 * Destroy - DELETE /projects/:id
 * Remove developer
 */
router.delete('/:id', getProject, projectsController.deleteProject);

async function getProject(req, res, next) {
	let project;
	try {
		project = await Project.findById(req.params.id);
		if (project == null) return res.status(404).json({ message: 'Project not found' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
	res.project = project;
	next();
}

module.exports = router;
