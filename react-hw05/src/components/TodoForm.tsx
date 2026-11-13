import React, { useState } from "react";
import type { SortOrder, Priority } from "../types";
import styles from "./TodoForm.module.css";

interface TodoFormProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: (text: string, priority: Priority, date?: string) => void;
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
  const [priority, setPriority] = useState<Priority>("normal");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    onAdd(inputValue, priority, date || undefined);
    setPriority("normal");
    setDate("");
  };

  const getSortLabel = () => {
    if (sortOrder === "asc") return "А → Я";
    if (sortOrder === "desc") return "Я → А";
    return "Сортування";
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.input}
          placeholder="Введіть нове завдання..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <button type="submit" className={styles.addButton}>
          Додати
        </button>
      </div>

      <div className={styles.controlsRow}>
        <select
          className={`${styles.select} ${styles[priority]}`}
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Низький пріоритет</option>
          <option value="normal">Звичайний пріоритет</option>
          <option value="high">Високий пріоритет</option>
        </select>

        <input
          type="datetime-local"
          className={styles.dateInput}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          type="button"
          className={styles.sortButton}
          onClick={onToggleSort}
        >
          {getSortLabel()}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
