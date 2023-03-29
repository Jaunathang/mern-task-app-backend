const express = require('express');
const { createTask, getTasks, getTask, deleteTask, updateTask } = require('../controllers/taskController');
const Task = require("../models/taskModel");
const router = express.Router();

// Create a task
router.post("/", createTask);

// Get all tasks
router.get("/", getTasks);

// Get a single task
router.get("/:id", getTask);

// Delete a task
router.delete("/:id", deleteTask);

// Update a task
router.put("/:id", updateTask);

module.exports = router;