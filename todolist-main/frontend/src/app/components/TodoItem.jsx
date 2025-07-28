import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, startEdit } from "../../redux/todoSlice";

function TodoItem({ todo, isEditing }) {
  const dispatch = useDispatch();

  return (
    <li className={`p-4 rounded-lg border ${isEditing ? "border-yellow-400 bg-yellow-50" : "border-gray-300 bg-slate-100"}`}>
      <div className="flex justify-between items-start">
        <div 
          className="flex items-start gap-3 flex-1 cursor-pointer"
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
            todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
          }`}>
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <div>
            <p className={`font-medium ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
              {todo.text}
            </p>
            <div className="text-xs space-y-1 mt-1">
              <p className="text-gray-500">
                Created: {new Date(todo.createdAt).toLocaleString()}
              </p>
                  {todo.dueDate && (
                    <p
                      className={`text-xs font-semibold ${
                        new Date(todo.dueDate) < new Date() && !todo.completed
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                    >
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                      {new Date(todo.dueDate) < new Date() && !todo.completed && " (Overdue)"}
                    </p>
                  )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();  
              console.log("Edit clicked for ID:", todo.id);
              dispatch(startEdit(todo.id));
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteTodo(todo.id));
            }}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;