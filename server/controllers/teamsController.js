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

async function updateTeam(req, res) {
	if (req.body.collaborators != null) {
		res.team.collaborators = req.body.collaborators;
	}
	if (req.body.teamLeader != null) {
		res.team.teamLeader = req.body.teamLeader;
	}
	if (req.body.teamName != null) {
		res.team.teamName = req.body.teamName;
	}

	try {
		const updatedTeam = await res.team.save();
		res.status(200).json(updatedTeam);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function deleteTeam(req, res) {
	try {
		const team = res.team;
		await res.team.remove();
		res.status(200).json(team);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

exports.index = index;
exports.show = show;
exports.newTeam = newTeam;
exports.updateTeam = updateTeam;
exports.deleteTeam = deleteTeam;
