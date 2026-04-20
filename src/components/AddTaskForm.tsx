import { useState } from "react";

interface Props { onAdd: (text: string) => void; }

export function AddTaskForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Neue Aufgabe hinzufügen..."
        className="flex-1 bg-spiderly-gray border border-spiderly-muted/30 rounded px-4 py-2 text-sm text-white placeholder-spiderly-muted focus:outline-none focus:border-spiderly-accent"
      />
      <button type="submit" className="bg-spiderly-accent hover:bg-spiderly-accent/80 transition text-white font-semibold px-5 py-2 rounded text-sm">
        + Hinzufügen
      </button>
    </form>
  );
}