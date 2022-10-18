const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
	collaborators: {
		type: Array,
		required: true,
		default: [],
	},
	teamLeader: {
		type: mongoose.Types.ObjectId,
		required: false,
	},
	teamName: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Team', teamSchema);
