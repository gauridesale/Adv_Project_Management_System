// routes/projects.js

const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');

// Middleware to catch errors
const errorHandler = require('../../middleware/errorHandler');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Public
router.post('/', async (req, res) => {
    // Create a new project object using data from the request body
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        teamMembers: req.body.teamMembers
    });

    try {
        // Save the new project to the database
        const newProject = await project.save();
        // If successful, send a response with status code 201 (Created) and the new project data
        res.status(201).json(newProject);
    } catch (err) {
        // If an error occurs (e.g., validation error), send a response with status code 400 (Bad Request) and the error message
        res.status(400).json({ message: err.message });
    }
});

// @route   PATCH /api/projects/:id
// @desc    Update a project
// @access  Public
router.patch('/:id', getProject, async (req, res) => {
    if (req.body.title != null) {
        res.project.title = req.body.title;
    }
    if (req.body.description != null) {
        res.project.description = req.body.description;
    }
    if (req.body.startDate != null) {
        res.project.startDate = req.body.startDate;
    }
    if (req.body.endDate != null) {
        res.project.endDate = req.body.endDate;
    }
    if (req.body.status != null) {
        res.project.status = req.body.status;
    }
    if (req.body.teamMembers != null) {
        res.project.teamMembers = req.body.teamMembers;
    }
    try {
        const updatedProject = await res.project.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Public
router.delete('/:id', getProject, async (req, res) => {
    try {
        await res.project.remove();
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single project by ID
async function getProject(req, res, next) {
    let project;
    try {
        project = await Project.findById(req.params.id);
        if (project == null) {
            return res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.project = project;
    next();
}

module.exports = router;
