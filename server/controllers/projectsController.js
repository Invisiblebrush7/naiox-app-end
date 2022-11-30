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
	console.log(req.file?.filename);
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
			image: req.file?.filename,
		});
		const newProject = await project.save();
		res.status(201).json(newProject);
	} catch (error) {
		res.status(500).json({ error });
	}
}
// TODO: Improve this mess / spaghetti
async function updateProject(req, res) {
	if (req.body.name != null) {
		res.project.name = req.body.name;
	}
	if (req.body.clientID != null) {
		res.project.clientID = req.body.clientID;
	}
	if (req.body.price != null) {
		res.project.price = req.body.price;
	}
	if (req.body.endDate != null) {
		res.project.endDate = req.body.endDate;
	}
	if (req.body.startDate != null) {
		res.project.startDate = req.body.startDate;
	}
	if (req.body.responsibleID != null) {
		res.project.responsibleID = req.body.responsibleID;
	}
	if (req.body.description != null) {
		res.project.description = req.body.description;
	}
	if (req.body.assignedTeams != null) {
		res.project.assignedTeams = req.body.assignedTeams;
	}
	if (req.body.priority != null) {
		res.project.priority = req.body.priority;
	}
	if (req.body.status != null) {
		res.project.status = req.body.status;
	}

	try {
		const updatedProject = await res.project.save();
		res.status(200).json(updatedProject);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function deleteProject(req, res) {
	try {
		const project = res.project;
		await res.project.remove();
		res.status(200).json(project);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

exports.index = index;
exports.show = show;
exports.newProject = newProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
