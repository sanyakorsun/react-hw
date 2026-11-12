import React from "react";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span onClick={() => onToggle(todo.id)} style={{ cursor: "pointer" }}>
        {todo.text}
      </span>
      <button
        className="delete-button"
        onClick={() => onDelete(todo.id)}
        title="Видалити задачу"
      >
        Видалити
      </button>
    </div>
  );
};

export default TodoItem;
