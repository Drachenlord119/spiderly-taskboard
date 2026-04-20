import type { Task, TaskStatus } from "../types/task";

interface Props {
  task:     Task;
  onMove:   (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const NEXT_STATUS: Record<TaskStatus, TaskStatus | null> = {
  "todo":        "in-progress",
  "in-progress": "done",
  "done":        null,
};

const PREV_STATUS: Record<TaskStatus, TaskStatus | null> = {
  "todo":        null,
  "in-progress": "todo",
  "done":        "in-progress",
};

export function TaskCard({ task, onMove, onDelete }: Props) {
  const next = NEXT_STATUS[task.status];
  const prev = PREV_STATUS[task.status];

  return (
    <div className="bg-spiderly-black rounded p-3 group border border-transparent hover:border-spiderly-muted/30 transition">
      <p className="text-sm text-white mb-2">{task.text}</p>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
        {prev && (
          <button onClick={() => onMove(task.id, prev)} className="text-xs text-spiderly-muted hover:text-white px-2 py-0.5 rounded bg-spiderly-gray transition">
            ← Zurück
          </button>
        )}
        {next && (
          <button onClick={() => onMove(task.id, next)} className="text-xs text-spiderly-muted hover:text-spiderly-accent px-2 py-0.5 rounded bg-spiderly-gray transition">
            Weiter →
          </button>
        )}
        <button onClick={() => onDelete(task.id)} className="ml-auto text-xs text-spiderly-muted hover:text-red-400 px-2 py-0.5 rounded bg-spiderly-gray transition">
          ✕
        </button>
      </div>
    </div>
  );
}