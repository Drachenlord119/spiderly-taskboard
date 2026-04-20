import type { Task, TaskStatus } from "../types/task";
import { TaskCard } from "./TaskCard";

interface Props {
  status:   TaskStatus;
  label:    string;
  tasks:    Task[];
  onMove:   (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const STATUS_COLOR: Record<TaskStatus, string> = {
  "todo":        "border-spiderly-muted",
  "in-progress": "border-yellow-500",
  "done":        "border-green-500",
};

export function TaskColumn({ status, label, tasks, onMove, onDelete }: Props) {
  return (
    <div className={`bg-spiderly-gray rounded-lg border-t-2 ${STATUS_COLOR[status]} p-4 min-h-[300px]`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm uppercase tracking-widest text-spiderly-muted">{label}</h2>
        <span className="text-xs bg-spiderly-black px-2 py-0.5 rounded-full text-spiderly-muted">{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMove={onMove} onDelete={onDelete} />
        ))}
        {tasks.length === 0 && (
          <p className="text-spiderly-muted text-xs text-center mt-8">Keine Tasks</p>
        )}
      </div>
    </div>
  );
}