const Task = require("../models/Task");
const asyncHandler = require("express-async-handler");


const getAllTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


const getATask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json(`No task with id : ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


const createNewTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


const updateTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json(`No task with id : ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json(`No task with id : ${id}`);
    }
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = {
  getAllTasks,
  getATask,
  createNewTask,
  updateTask,
  deleteTask,
};
