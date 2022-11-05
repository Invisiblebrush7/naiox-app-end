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

async function updateClient(req, res) {
	if (req.body.username != null) {
		res.client.username = req.body.username;
	}
	if (req.body.email != null) {
		res.client.email = req.body.email;
	}
	if (req.body.password != null) {
		res.client.password = req.body.password;
	}

	try {
		const updatedClient = await res.client.save();
		res.status(200).json(updatedClient);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function deleteClient(req, res) {
	try {
		const client = res.client;
		await res.client.remove();
		res.status(200).json(client);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

exports.index = index;
exports.show = show;
exports.newClient = newClient;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;
