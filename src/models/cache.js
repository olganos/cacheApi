const mongoose = require('mongoose');

const Cache = mongoose.model('Cache' , new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    usedLastTime: { 
        type: Date, 
        required: true,
        default: new Date(),
    },
    timeToLive: { 
        type: Date, 
        required: true,
        default: new Date().setTime(new Date().getTime() + (process.env.LIFE_TIME || 0))
    }
}));

exports.Cache = Cache;
