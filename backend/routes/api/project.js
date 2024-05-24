// routes/projects.js

const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');

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

// @route   GET /api/projects/:projectId
// @desc    Get a specific project by ID
// @access  Public
router.get('/:projectId', async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        next(error);
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
        // If an error occurs (e.g., validation error) send a response with status code 400 (Bad Request) and the error message
        res.status(400).json({ message: err.message });
    }
});


/// @route   PATCH /api/projects/:id
// @desc    Update a project
// @access  Public
router.patch('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (req.body.title != null) {
            project.title = req.body.title;
        }
        if (req.body.description != null) {
            project.description = req.body.description;
        }
        if (req.body.startDate != null) {
            project.startDate = req.body.startDate;
        }
        if (req.body.endDate != null) {
            project.endDate = req.body.endDate;
        }
        if (req.body.status != null) {
            project.status = req.body.status;
        }
        if (req.body.teamMembers != null) {
            project.teamMembers = req.body.teamMembers;
        }

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.remove();
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
