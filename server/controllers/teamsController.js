const Team = require('../models/Team');

async function index(req, res) {
	try {
		const teams = await Team.find({});
		res.status(200).json(teams);
	} catch (error) {
		res.status(500).json({ error });
	}
}

async function show(req, res) {
	try {
		const teams = await Team.findById(req.params.id);
		res.status(200).json(teams);
	} catch (error) {
		res.status(500).json({ error });
	}
}

async function newTeam(req, res) {
	try {
		const team = new Team({
			collaborators: req.body.collaborators,
			teamLeader: req.body.teamLeader,
			teamName: req.body.teamName,
		});
		const newteam = await team.save();
		res.status(201).json(newteam);
	} catch (error) {
		res.status(500).json({ error });
	}
}

exports.index = index;
exports.show = show;
exports.newTeam = newTeam;
