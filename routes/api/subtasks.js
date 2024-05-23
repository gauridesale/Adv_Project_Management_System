const express = require('express');
const router = express.Router();
const Subtask = require('../../models/Subtask');
const Task = require('../../models/Task');

// Create a new subtask
router.post('/', async (req, res) => {
    try {
        const subtask = new Subtask(req.body);
        await subtask.save();

        // Update parent task with the new subtask
        const task = await Task.findById(subtask.taskId);
        task.subtasks.push(subtask._id);
        await task.save();

        res.status(201).send(subtask);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update a subtask
router.put('/:id', async (req, res) => {
    try {
        const subtask = await Subtask.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subtask) {
            return res.status(404).send();
        }
        res.send(subtask);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a subtask
router.delete('/:id', async (req, res) => {
    try {
        const subtask = await Subtask.findByIdAndDelete(req.params.id);
        if (!subtask) {
            return res.status(404).send();
        }

        // Remove subtask from parent task
        const task = await Task.findById(subtask.taskId);
        task.subtasks.pull(subtask._id);
        await task.save();

        res.send(subtask);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
