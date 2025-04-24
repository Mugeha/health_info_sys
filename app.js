const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clientRoutes = require('./routes/clientRoutes');
const programRoutes = require('./routes/programRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/programs', programRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Health Info System API 💉');
});

module.exports = app;
