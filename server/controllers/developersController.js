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
	try {
		const developer = await Developer.find({ _id: req.params.id });
		res.status(200).json(developer);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error });
	}
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

exports.index = index;
exports.show = show;
exports.newDeveloper = newDeveloper;
