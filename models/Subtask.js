const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'in_progress', 'done'],
        default: 'todo'
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    }
});

const Subtask = mongoose.model('Subtask', subtaskSchema);

module.exports = Subtask;
