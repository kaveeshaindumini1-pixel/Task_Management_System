const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// =========================
// CREATE TASK
// =========================
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "PENDING",
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.user.id,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// =========================
// GET ALL TASKS (USER ONLY)
// =========================
const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// =========================
// GET TASK BY ID
// =========================
const getTaskById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// =========================
// UPDATE TASK
// =========================
const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, status, priority, dueDate } = req.body;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// =========================
// DELETE TASK
// =========================
const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: {
        id: task.id,
      },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};