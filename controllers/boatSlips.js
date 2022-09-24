//create initial 3 boatslips
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

const getBoatSlips = (req, res) => {
  res.send(boatSlips);
};

const postBoatSlip = (req, res) => {
  const slips = boatSlips;
  const vesselName = req.body.vesselName;
  if (!vesselName) {
    return res
      .status(400)
      .send('Please provide a vessel name using the key vesselName');
  }
  if (typeof vesselName !== 'string') {
    return res.status(400).send('Please provide a valid vessel name');
  }
  const firstVacant = slips.find((e) => e.vacant == true);
  if (!firstVacant) {
    return res
      .status(409)
      .send({ statusCode: 409, Message: 'There are no available boat slips.' });
  }
  firstVacant.vacant = false;
  firstVacant.vesselName = vesselName;
  res.send({ slipNumber: firstVacant.slipNumber });
};

const vacateBoatSlip = (req, res) => {
  const slipToVacate = boatSlips.find((e) => e.slipNumber == req.params.id);
  if (!slipToVacate) {
    return res
      .status(400)
      .send('Boat slip ' + req.params.id + ' does not exist');
  }
  if (slipToVacate.vacant) {
    return res
      .status(409)
      .send('Boat slip ' + req.params.id + ' is currently vacant');
  }
  slipToVacate.vacant = true;
  slipToVacate.vesselName = undefined;
  res.status(204).send(slipToVacate);
};

module.exports = {
  getBoatSlips,
  postBoatSlip,
  vacateBoatSlip,
};
