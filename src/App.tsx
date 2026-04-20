import type { Task, TaskStatus } from "./types/task";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TaskColumn } from "./components/TaskColumn";
import { AddTaskForm } from "./components/AddTaskForm";

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "todo",        label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done",        label: "Done" },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("spiderly-tasks", []);

  const addTask = (text: string) => {
    const newTask: Task = {
      id:        crypto.randomUUID(),
      text,
      status:    "todo",
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-spiderly-black text-spiderly-white font-sans">
      <header className="border-b border-spiderly-gray px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-spiderly-accent font-bold text-2xl tracking-tight">SPIDERLY</span>
          <span className="text-spiderly-muted text-sm mt-1">Task-Board</span>
        </div>
        <span className="text-spiderly-muted text-xs">{tasks.length} Tasks gesamt</span>
      </header>
      <div className="px-6 py-6">
        <AddTaskForm onAdd={addTask} />
      </div>
      <main className="px-6 pb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <TaskColumn
            key={col.id}
            status={col.id}
            label={col.label}
            tasks={tasks.filter((t) => t.status === col.id)}
            onMove={moveTask}
            onDelete={deleteTask}
          />
        ))}
      </main>
    </div>
  );
}