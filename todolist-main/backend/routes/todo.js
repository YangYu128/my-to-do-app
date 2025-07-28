const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/todos (🔐 Auth protected + filtered by user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { userId: req.user.id }, //  Only current user's todos
      order: [['createdAt', 'DESC']],
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /api/todos (🔐 Auth protected)
router.post('/', authMiddleware, async (req, res) => {
  const { text, dueDate } = req.body;
  const userId = req.user.id;

  try {
    const newTodo = await Todo.create({ text, dueDate, userId });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('❌ Error creating todo:', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /api/todos/:id (🔐 Auth protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed, dueDate } = req.body;

    const todo = await Todo.findOne({ where: { id, userId: req.user.id } }); // ✅ only their todo
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    if (text !== undefined) todo.text = text;
    if (completed !== undefined) todo.completed = completed;
    if (dueDate !== undefined) todo.dueDate = dueDate;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo', details: err.message });
  }
});

// DELETE /api/todos/:id (🔐 Auth protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOne({ where: { id, userId: req.user.id } }); // ✅ only their todo
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    await todo.destroy();
    res.json({ message: 'Todo deleted', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
