const Project = require('../models/Project');

async function index(req, res) {
	try {
		const projects = await Project.find({});
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({ error });
	}
}

async function show(req, res) {
	try {
		const projects = await Project.findById(req.params.id);
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({ error });
	}
}

async function newProject(req, res) {
	try {
		const project = new Project({
			clientID: req.body.clientID,
			description: req.body.description,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			name: req.body.name,
			price: req.body.price,
			priority: req.body.priority,
			assignedTeams: req.body.assignedTeams,
			responsibleID: req.body.responsibleID,
			status: req.body.status,
		});
		const newProject = await project.save();
		res.status(201).json(newProject);
	} catch (error) {
		res.status(500).json({ error });
	}
}

exports.index = index;
exports.show = show;
exports.newProject = newProject;
