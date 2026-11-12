// src/components/TodoForm.tsx
import React from "react";
import type { SortOrder } from "../types";

interface TodoFormProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: (text: string) => void;
  onToggleSort: () => void;
  sortOrder: SortOrder;
}

const TodoForm: React.FC<TodoFormProps> = ({
  inputValue,
  onInputChange,
  onAdd,
  onToggleSort,
  sortOrder,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(inputValue);
  };

  const sortLabel =
    sortOrder === "asc"
      ? "Сортування: А-Я"
      : sortOrder === "desc"
        ? "Сортування: Я-А"
        : "Сортувати";

  return (
    <form className="controls" onSubmit={handleSubmit}>
      <input
        type="text"
        id="todo-input"
        placeholder="Що потрібно зробити?"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" id="add-button" title="Додати задачу">
        <span className="btn-icon">＋</span> Додати
      </button>
      <button
        type="button"
        id="sort-button"
        onClick={onToggleSort}
        title="Сортувати за алфавітом"
      >
        <span className="btn-icon">⇅</span> {sortLabel}
      </button>
    </form>
  );
};

export default TodoForm;
