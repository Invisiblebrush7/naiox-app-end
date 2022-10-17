const Client = require('../models/Client');

async function index(req, res) {
	try {
		const clients = await Client.find({});
		res.status(200).json(clients);
	} catch (error) {
		res.status(500).json({ error });
	}
}

async function show(req, res) {
	try {
		const client = await Client.findById(req.params.id);
		res.status(200).json(client);
	} catch (error) {
		res.status(500).json({ error });
	}
}
// TODO: Encryption of passwords
async function newClient(req, res) {
	try {
		const client = new Client({
			email: req.body.email,
			password: req.body.password,
			username: req.body.username,
		});
		const newClient = await client.save();
		res.status(201).json(newClient);
	} catch (error) {
		res.status(500).json({ error });
	}
}

exports.index = index;
exports.show = show;
exports.newClient = newClient;
