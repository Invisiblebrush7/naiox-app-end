const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL);
mongoose.connect('mongodb+srv://andre:andre@pae2022.cy4rx6j.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connected'));

module.exports = db;
