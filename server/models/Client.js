const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Client', clientSchema);
