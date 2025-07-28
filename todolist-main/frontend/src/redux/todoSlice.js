import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BACKEND_URL = 'http://localhost:5000';

// ----------------------------
// ✅ Async Thunks
// ----------------------------

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BACKEND_URL}/api/todos`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch todos');
  return await res.json();
});

export const addTodo = createAsyncThunk('todo/addTodo', async ({ text, dueDate }) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BACKEND_URL}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text, dueDate }),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return await res.json();
});

export const toggleTodo = createAsyncThunk('todo/toggleTodo', async (id, { getState }) => {
  const token = localStorage.getItem('token');
  
  // Get current value from state
  const currentTodo = getState().todo.todos.find(t => t.id === id);
  const newCompleted = !currentTodo.completed; // <-- toggle!

  const res = await fetch(`${BACKEND_URL}/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ completed: newCompleted }),
  });

  if (!res.ok) throw new Error('Failed to toggle todo');
  return await res.json();
});


export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BACKEND_URL}/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete todo');
  return id;
});

export const saveEditTodo = createAsyncThunk(
  'todo/saveEditTodo',
  async ({ id, text, dueDate }) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BACKEND_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, dueDate }),
    });

    if (!res.ok) throw new Error('Failed to update todo');
    return await res.json();
  }
);

// ----------------------------
// ✅ Initial State
// ----------------------------

const initialState = {
  todos: [],
  input: '',
  dueDate: '',
  filter: 'all', // 'all', 'completed', 'incomplete'
  editIndex: null,
  editTodo: null, // For editing a todo
};

// ----------------------------
// ✅ Slice
// ----------------------------

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setDueDate: (state, action) => {
      state.dueDate = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  startEdit: (state, action) => {
  const todoId = action.payload;
  const todo = state.todos.find(t => t.id === todoId);

  if (todo) {
    state.editTodo = todo; // 
    state.editIndex = todoId;
    state.input = todo.text;
    state.dueDate = todo.dueDate || '';
  }
},

    cancelEdit: (state) => {
      state.editIndex = null;
      state.input = '';
      state.dueDate = '';
    },
   saveEdit: (state, action) => {
  const todo = state.todos.find(t => t.id === state.editIndex);
  if (todo) {
    todo.text = state.input;
    todo.dueDate = state.dueDate;
  }
  state.editIndex = null;
  state.input = '';
  state.dueDate = '';
},
    clearEditTodo: (state) => {
      state.editTodo = null;
      state.editIndex = null;
      state.input = '';
      state.dueDate = '';
    },
  },

  // ✅ Extra Reducers for Async Thunks
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })

      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.input = '';
        state.dueDate = '';
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })

      .addCase(toggleTodo.fulfilled, (state, action) => {
      const updated = action.payload;
      const index = state.todos.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          state.todos[index] = updated;
          }
        })


      .addCase(saveEditTodo.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.todos.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          state.todos[index] = updated;
        }
        state.editIndex = null;
        state.input = '';
        state.dueDate = '';
      });
  },
});

// ----------------------------
// ✅ Exports
// ----------------------------

export const {
  setInput,
  setDueDate,
  setFilter,
  startEdit,
  cancelEdit,
  saveEdit,
  clearEditTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
