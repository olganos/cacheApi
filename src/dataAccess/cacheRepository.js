const { Cache } = require('../models/cache');
const mongoose = require('mongoose');

function CacheRepository() {
    function getAll() {        
        return Cache.find({timeToLive: { $gte: new Date() }});
    }

    async function getToOverwrite() {
        // Take any with expired life time
        let old = await Cache.findOne({timeToLive: { $lt: new Date() }});

        // Or by LRU principle (Least Recently Used)
        if(!old) {
            [old] = await Cache
                .find()
                .limit(1)
                .sort({usedLastTime: 1});
        }

        return old;
    }

    function create(value) {
        let cache = new Cache({
            value,
        });
        return cache.save();
    }

    function update(id, value) {
        return Cache.findByIdAndUpdate(id,
            { value },
            { new: true });
    }

    function count() {
        return Cache.count();
    }

    return {
        getAll,
        create,
        count,
        getToOverwrite,
        update,
    };
}
module.exports = CacheRepository;
