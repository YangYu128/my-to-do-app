'use client';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, fetchTodos } from "../../redux/todoSlice";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";
import { exportTodosToPDF } from '../../utils/exportTodosToPDF';

export default function TodoPage() {
  const dispatch = useDispatch();
  const { todos, filter, editIndex } = useSelector(state => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const handleExport = () => {
    exportTodosToPDF(filteredTodos, filter);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400 p-4">
      <div className="bg-white shadow-lg rounded-3xl p-6 md:p-8 lg:p-12 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">ToDo List</h1>

        <div className="flex flex-wrap justify-center mb-4 gap-2">
          {["all", "pending", "completed"].map(f => (
            <button
              key={f}
              onClick={() => dispatch(setFilter(f))}
              className={`px-3 py-1 rounded transition ${
                filter === f 
                  ? "bg-blue-500 text-white shadow-md" 
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md flex items-center gap-2"
          >
            Export to PDF
          </button>
        </div>

        <TodoInput />

        <ul className="space-y-3 mt-6">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo, index) => (
              <TodoItem 
                key={todo.id || index} 
                todo={todo} 
                isEditing={editIndex === index}
              />
            ))
          ) : (
            <li className="text-center py-4 text-gray-500">
              {filter === 'all' 
                ? 'No tasks yet. Add one above!'
                : `No ${filter} tasks found`}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
