const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Planned', 'In Progress', 'Completed'],
        default: 'Planned'
    },
    teamMembers: [{
        type: String
    }]
});

// Create a model using the schema
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
