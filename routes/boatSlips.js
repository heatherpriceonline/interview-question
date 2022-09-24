const express = require('express');
const router = express.Router();

const {
  getBoatSlips,
  postBoatSlip,
  vacateBoatSlip,
} = require('../controllers/boatSlips.js');

router.get('/', getBoatSlips);

router.post('/', postBoatSlip);

router.put('/:id/vacate', vacateBoatSlip);

module.exports = router;
