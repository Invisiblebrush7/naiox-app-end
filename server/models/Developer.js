const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 1,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		max: 255,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		max: 255,
	},
	team: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model('Developer', developerSchema);
