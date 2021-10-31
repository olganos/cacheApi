function CacheService (cacheRepository) {
    function getAll() {
        return cacheRepository.getAll();
    }

    async function create(value) {
        // check the cache limit
        if (await cacheRepository.count() < process.env.CACHE_LIMIT) {
           return cacheRepository.create(value);
        }

        // check old in order to overwrite it
        const old = await cacheRepository.getToOverwrite();
        if(!old) {
            return cacheRepository.create(value);
        }
        
        // overwrite
        return cacheRepository.update(old._id, value);
    }

    return {
        getAll,
        create,
    };
}

module.exports = CacheService;
