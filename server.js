'use strict';

const cors = require('cors');
const clientsRoutes = require('./server/routes/clientsRoutes');
const teamRoutes = require('./server/routes/teamsRoutes');
const projectRoutes = require('./server/routes/projectsRoutes');
const developerRoutes = require('./server/routes/developersRoutes');
const correoRoutes = require('./server/routes/correoRoutes');

//ENV file
require('dotenv').config();
// Mongoose / DB
require('./config/db');

// Express
const express = require('express');

// APP
const app = express();
const port = process.env.PORT || 3000;

/**
 * Middlewares for express
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // body-parser

app.use(cors());
app.use('/api/clients', clientsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/developers', developerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/correo', correoRoutes);

// Swagger config
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.json');
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// API docs
app.use('', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const server = app.listen(port, () => {
	console.log('Server running in port ', port);
});

// Socket.io
const socketIo = require('socket.io');

const io = socketIo(server, {
    cors: {
      origin: '*'
    }
});

io.on('connection', socket => {
    console.log('Alguien se conecto!');

    socket.on('share', data => {
      console.log('El usuario', data.email, 'necesita asistencia');

      socket.broadcast.emit('onShared', data);
    })

});

// Google OAuth
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_ID);
app.get('/google/:token', (req, res) => {
	const token = req.params.token;
	console.log('Will validate token ', token);
	googleClient.verifyIdToken({ idToken: token }).then(response => {
	  const data = response.getPayload();
	  console.log('Data: ', data);
	  res.send('Token is valid');
	}).catch(err => {
	  console.log('Failed to validate token');
	  res.status(401).send();
	});
});