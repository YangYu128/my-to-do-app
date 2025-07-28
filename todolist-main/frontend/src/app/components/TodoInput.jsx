import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  saveEditTodo,
  setEditTodo,
  clearEditTodo,
} from '../../redux/todoSlice';

export default function TodoInput() {
  const dispatch = useDispatch();
  const { editTodo } = useSelector((state) => state.todo);

  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueDateError, setDueDateError] = useState(false);

  // Prefill input if editing
  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text);
      setDueDate(editTodo.dueDate || '');
    } else {
      setText('');
      setDueDate('');
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDueDateError(false);

    if (!text.trim()) return;

    if (!dueDate) {
      setDueDateError(true);
      return;
    }

    if (editTodo) {
      dispatch(saveEditTodo({ id: editTodo.id, text, dueDate }));
    } else {
      dispatch(addTodo({ text, dueDate }));
    }

    setText('');
    setDueDate('');
    dispatch(clearEditTodo());
  };

  const today = new Date().toISOString().split('T')[0]; // for min date

  return (
    <div className="todo-input-form w-full border border-gray-300 rounded-xl p-6 shadow-md bg-gradient-to-r from-blue-50 to-white">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {editTodo ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a task"
            className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={today}
            className="w-full sm:w-auto px-4 py-2 border-2 border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className={`px-4 py-2 w-full ${
                editTodo
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white font-medium rounded-lg transition shadow-md`}
            >
              {editTodo ? 'Update' : 'Add'}
            </button>
            {editTodo && (
              <button
                type="button"
                onClick={() => dispatch(clearEditTodo())}
                className="px-4 py-2 w-full bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition shadow-md"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* error messages */}
        {!text.trim() && (
          <p className="text-red-500 text-sm">Please enter a task description</p>
        )}
        {dueDateError && (
          <p className="text-red-500 text-sm">Please select a due date</p>
        )}
      </form>
    </div>
  );
}
