'use strict';
const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
const projectsController = require('../controllers/projectsController');
const file = require('../middlewares/file');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
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
 *       - Projects
 *     description: Get a project with the id === :id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the project with id === :id
 */
router.get('/:id', projectsController.show);

/**
 * @swagger
 * /api/projects/:
 *   post:
 *     tags:
 *       - Projects
 *     description: Create a new project
 *     parameters:
 *
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Name of the project
 *
 *       - in: formData
 *         name: clientID
 *         type: string
 *         description: The client id
 *
 *       - in: formData
 *         name: price
 *         type: integer
 *         description: Price of the project
 *
 *       - in: formData
 *         name: startDate
 *         type: string
 *         description: Start of the project
 *
 *       - in: formData
 *         name: endDate
 *         type: string
 *         description: End of the project
 *
 *       - in: formData
 *         name: responsibleID
 *         type: string
 *         description: Responsible of the project
 *
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of what the project is about
 *
 *       - in: formData
 *         name: assignedTeams
 *         type: array
 *         items:
 *           - type: string
 *         description: List of teams assigned to the project
 *
 *       - in: formData
 *         name: priority
 *         type: integer
 *         minimum: 1
 *         maximum: 3
 *         description: What is the project priority (1 - Low, 2 - Medium, 3 - High)
 *
 *       - in: formData
 *         name: status
 *         type: string
 *         description: Backlog - 1, In progress - 2, Finished - 3
 *
 *     responses:
 *       200:
 *         description: Receives changes for existing project, and returns it
 *       400:
 *         description: Bad Request - No project found with that id
 */
router.post('/', file.single('image'), projectsController.newProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     description: Edit an existing project
 *     parameters:
 *
 *       - in: path
 *         name: id
 *         required: true
 *
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Name of the project
 *
 *       - in: formData
 *         name: clientID
 *         type: string
 *         description: The client id
 *
 *       - in: formData
 *         name: price
 *         type: integer
 *         description: Price of the project
 *
 *       - in: formData
 *         name: startDate
 *         type: string
 *         description: Start of the project
 *
 *       - in: formData
 *         name: endDate
 *         type: string
 *         description: End of the project
 *
 *       - in: formData
 *         name: responsibleID
 *         type: string
 *         description: Responsible of the project
 *
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of what the project is about
 *
 *       - in: formData
 *         name: assignedTeams
 *         type: array
 *         items:
 *           - type: string
 *         description: List of teams assigned to the project
 *
 *       - in: formData
 *         name: priority
 *         type: integer
 *         minimum: 1
 *         maximum: 3
 *         description: What is the project priority (1 - Low, 2 - Medium, 3 - High)
 *
 *       - in: formData
 *         name: status
 *         type: string
 *         description: Backlog - 1, In progress - 2, Finished - 3
 *
 *     responses:
 *       200:
 *         description: Receives changes for existing project, and returns it
 *       400:
 *         description: Bad Request - No project found with that id
 */
router.put('/:id', getProject, projectsController.updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     description: Removes project with id === :id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
