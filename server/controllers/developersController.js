const Developer = require('../models/Developer');

async function index(req, res) {
	try {
		const developers = await Developer.find({});
		res.status(200).json(developers);
	} catch (error) {
		res.status(500).json({ error });
	}
}

async function show(req, res) {
	res.status(200).json(res.developer);
}
async function newDeveloper(req, res) {
	try {
		const developer = new Developer({
			email: req.body.email,
			password: req.body.password,
			username: req.body.username,
			team: req.body.team,
		});
		const newDeveloper = await developer.save();
		res.status(201).json(newDeveloper);
	} catch (error) {
		res.status(500).json({ error });
	}
}

async function updateDeveloper(req, res) {
	if (req.body.username != null) {
		res.developer.username = req.body.username;
	}
	if (req.body.email != null) {
		res.developer.email = req.body.email;
	}
	if (req.body.password != null) {
		res.developer.password = req.body.password;
	}
	if (req.body.team != null) {
		res.developer.team = req.body.team;
	}

	try {
		const updatedDeveloper = await res.developer.save();
		res.status(200).json(updatedDeveloper);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function deleteDeveloper(req, res) {
	try {
		const developer = res.developer;
		await res.developer.remove();
		res.status(200).json(developer);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

exports.index = index;
exports.show = show;
exports.newDeveloper = newDeveloper;
exports.updateDeveloper = updateDeveloper;
exports.deleteDeveloper = deleteDeveloper;
