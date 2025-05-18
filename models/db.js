    const mongoose = require('mongoose');

    const Schema = mongoose.Schema({
        userId:  String,
        type: { type: String, enum: ['email', 'sms', 'inApp'] },
        message : String,
        status: { type: String, default: 'pending' },
        retry_count: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now }
    });

    module.exports =mongoose.model('Notification',Schema);

    