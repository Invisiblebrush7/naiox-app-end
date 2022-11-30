const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 1,
		max: 255,
	},
	clientID: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	endDate: {
		type: Date,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
		default: Date.today,
	},
	responsibleID: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	assignedTeams: {
		type: Array,
		required: true,
		default: [],
	},
	priority: {
		type: Number,
		required: true,
		default: 1,
	},
	status: {
		type: Number,
		required: true,
		default: 1,
		min: 1,
		max: 3,
	},
	image: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model('Project', projectSchema);
