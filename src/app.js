const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

module.exports = app;
