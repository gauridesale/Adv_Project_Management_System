const express = require('express');
const router = express.Router();
const TimeEntry = require('../../models/TimeEntries');

// Create a new time entry
router.post('/', async (req, res) => {
    try {
        const { task, duration, date, description } = req.body;
        const timeEntry = new TimeEntry({ task, duration, date, description });
        await timeEntry.save();
        res.status(201).send(timeEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get all time entries
router.get('/', async (req, res) => {
    try {
        const timeEntries = await TimeEntry.find();
        res.send(timeEntries);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a time entry by ID
router.get('/:id', async (req, res) => {
    try {
        const timeEntry = await TimeEntry.findById(req.params.id);
        if (!timeEntry) {
            return res.status(404).send();
        }
        res.send(timeEntry);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a time entry
router.put('/:id', async (req, res) => {
    try {
        const timeEntry = await TimeEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!timeEntry) {
            return res.status(404).send();
        }
        res.send(timeEntry);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a time entry
router.delete('/:id', async (req, res) => {
    try {
        const timeEntry = await TimeEntry.findByIdAndDelete(req.params.id);
        if (!timeEntry) {
            return res.status(404).send();
        }
        res.send(timeEntry);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
