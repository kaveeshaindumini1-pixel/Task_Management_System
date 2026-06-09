const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const verifyToken = require("../middleware/authMiddleware");

// ✅ Create task
router.post("/", verifyToken, createTask);

// ✅ Get all tasks
router.get("/", verifyToken, getTasks);

// ✅ Get single task
router.get("/:id", verifyToken, getTaskById);

// ✅ Update task
router.put("/:id", verifyToken, updateTask);

// ✅ Delete task
router.delete("/:id", verifyToken, deleteTask);

module.exports = router;