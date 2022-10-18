'use strict';

const clientsRoutes = require('./server/routes/clientsRoutes');
const teamRoutes = require('./server/routes/teamsRoutes');
const projectRoutes = require('./server/routes/projectsRoutes');
const developerRoutes = require('./server/routes/developersRoutes');

//ENV file
require('dotenv').config();
// Mongoose / DB
require('./config/db');

// Express
const express = require('express');

// APP
const app = express();

/**
 * Middlewares for express
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // body-parser

app.use('/api/clients', clientsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/developers', developerRoutes);
app.use('/api/teams', teamRoutes);

app.listen(3000, () => {
	console.log('Server running');
});
