const { response } = require('express');
const Task = require('../models/taskModel');

async function createTask(req, res) {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function getTasks(req, res) {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function getTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json(`No task with ID ${id}`);
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json(`No task with ID ${id}`);
        }

        res.status(200).json("Task deleted");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json(`No task with ID ${id}`);
        }

        res.status(200).json(task);
    } catch (error) {

        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}