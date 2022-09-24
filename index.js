const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

//create initial 3 boatslips
let boatSlips = [
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
  return res.send(boatSlips);
});

app.post('/boat-slips', (req, res) => {
  const slips = boatSlips;
  const vesselName = req.body.vesselName;
  const firstVacant = slips.find((e) => e.vacant == true);
  if (!firstVacant) {
    return res.status(409).send('There are no available boat slips.');
  }
  firstVacant.vacant = false;
  firstVacant.vesselName = vesselName;
  res.send({ slipNumber: firstVacant.slipNumber });
});

app.put('/boat-slips/:id/vacate', (req, res) => {
  const slipToVacate = boatSlips.find((e) => e.slipNumber == req.params.id);
  if (slipToVacate.vacant) {
    return res
      .status(409)
      .send('Boat slip ' + req.params.id + ' is currently vacant');
  }
  slipToVacate.vacant = true;
  slipToVacate.vesselName = undefined;
  res.status(204).send(slipToVacate);
});
module.exports = app.listen(port);
