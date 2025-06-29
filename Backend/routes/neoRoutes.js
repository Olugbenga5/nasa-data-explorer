const express = require('express');
const router = express.Router();
const { getNeoFeed } = require('../controllers/nasaController');

router.get('/neo-feed', getNeoFeed);

module.exports = router;
