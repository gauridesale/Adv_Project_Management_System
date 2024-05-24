const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedUser: {
        type: String, // This can be replaced with a reference to a User model if you have one
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['todo', 'in_progress', 'done'],
        default: 'todo'
    },
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
