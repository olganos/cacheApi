const express = require('express');
const CacheRepository = require('../dataAccess/cacheRepository');
const CacheService = require('../services/cacheService');

const router = express.Router();
const cacheService = new CacheService(new CacheRepository());

router.get('/', async (req, res) => {
    // todo: update timeToLive for all
    const caches = await cacheService.getAll();
    res.send(caches);
});

router.post('/', async (req, res) => {
    const cache = await cacheService.create(req.body.value);
    res.send(cache);
});

module.exports = router;
