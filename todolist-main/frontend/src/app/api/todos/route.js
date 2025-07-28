// src/app/api/todos/route.js
let todos = []; // This lives in memory and resets on server restart

export async function GET() {
  return Response.json(todos);
}

export async function POST(req) {
  const { text } = await req.json();
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  return Response.json(newTodo);
}

export async function PUT(req) {
  const { id } = await req.json();
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  return Response.json({ success: true });
}

export async function DELETE(req) {
  const { id } = await req.json();
  todos = todos.filter(todo => todo.id !== id);
  return Response.json({ success: true });
}
