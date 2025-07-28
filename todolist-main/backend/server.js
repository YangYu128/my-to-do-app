const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todo');
dotenv.config();
// Load models before sync
const User = require('./models/user');
const Todo = require('./models/Todo');

// ✅ Define the relationship
User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Sync and run server
sequelize.sync({ alter: true }).then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`✅ Server running on port ${PORT}`)
  );
}).catch((err) => {
  console.error('❌ Database sync error:', err);
});
