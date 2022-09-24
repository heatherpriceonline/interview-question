const express = require('express');
const boatSlipRoutes = require('./routes/boatSlips.js');
const app = express();
const port = 8080;

module.exports = app.listen(port);
app.use(express.json());
app.use('/boat-slips', boatSlipRoutes);
