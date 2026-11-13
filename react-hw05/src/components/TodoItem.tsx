import React from "react";
import clsx from "clsx";
import type { Todo } from "../types";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const priority = todo.priority || "normal";
  const isOverdue =
    !todo.completed && todo.date ? new Date(todo.date) < new Date() : false;

  const formattedDate = todo.date
    ? new Date(todo.date).toLocaleString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <li
      className={clsx(styles.item, styles[priority], {
        [styles.completed]: todo.completed,
        [styles.overdue]: isOverdue,
      })}
    >
      <div className={styles.leftContent}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <div className={styles.info}>
          <span className={styles.text}>{todo.text}</span>

          {(formattedDate || isOverdue) && (
            <div className={styles.meta}>
              {formattedDate && <span>Дедлайн: {formattedDate}</span>}
              {isOverdue && (
                <span className={styles.overdueBadge}>Прострочено!</span>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className={styles.deleteBtn}
        onClick={() => onDelete(todo.id)}
        aria-label="Видалити завдання"
      >
        ✕
      </button>
    </li>
  );
};

export default TodoItem;
