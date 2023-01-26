const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createNewTask,
  getATask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");


router
  .route("/")
  .get(getAllTasks)
  .post(createNewTask)
  

router
  .route("/:id")
  .get(getATask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
