import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct plugin import

export const exportTodosToPDF = (todos) => {
  const doc = new jsPDF();

  // ✅ Use plugin function — NOT doc.autoTable()
  autoTable(doc, {
    head: [["#", "Task", "Status", "Due Date"]],
    body: todos.map((todo, index) => [
      index + 1,
      todo.text,
      todo.completed ? "✅ Completed" : "❌ Pending",
      todo.dueDate || "-",
    ]),
    startY: 30,
  });

  doc.setFontSize(18);
  doc.text("ToDo List", 14, 22);
  doc.save("todo-list.pdf");
};
