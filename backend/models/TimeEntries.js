const mongoose = require('mongoose');

const timeEntrySchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
});

const TimeEntry = mongoose.model('TimeEntry', timeEntrySchema);

module.exports = TimeEntry;
