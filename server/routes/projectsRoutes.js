'use strict';
const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
const projectsController = require('../controllers/projectsController');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags:
 *       - projects
 *     description: Get all projects
 *     responses:
 *       200:
 *         description: Returns an array of projects
 */
router.get('/', projectsController.index);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     tags:
 *       - projects
 *     description: Get a project with the id === :id
 *     parameters:
 *       - in: id
 *     responses:
 *       200:
 *         description: Returns the project with id === :id
 */
router.get('/:id', projectsController.show);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     tags:
 *       - projects
 *     description: Create a new project
 *     responses:
 *       200:
 *         description: Creates a new project and returns it
 */
router.post('/', projectsController.newProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   update:
 *     tags:
 *       - project
 *     description: Edit an existing project
 *     responses:
 *       200:
 *         description: Receives changes for existing project, and returns it
 */
router.put('/:id', getProject, projectsController.updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - projects
 *     description: Removes project with id === :id
 *     responses:
 *       200:
 *         description: Removes project with id === :id
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
