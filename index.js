const express = require('express');
const app = express();
const port = 8080;
module.exports = app.listen(8080);

const boatSlips = [
  {
    slipNumber: 1,
    vacant: true,
  },
  {
    slipNumber: 2,
    vacant: true,
  },
  {
    slipNumber: 3,
    vacant: true,
  },
];
app.get('/boat-slips', (req, res) => {
  res.send(boatSlips);
});
app.post('/boat-slips', (req, res) => {});
