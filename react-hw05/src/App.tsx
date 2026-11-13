// src/App.tsx
import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import type { Todo, SortOrder, Priority } from "./types";
import styles from "./App.module.css";

const App: React.FC = () => {
  // 1. Стан списку задач з лінивою ініціалізацією із localStorage
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Стан інпуту та сортування
  const [inputValue, setInputValue] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  // 3. Автозбереження в localStorage через useEffect
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 4. Похідний стан (Derived State)
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;

  const displayedTodos = [...todos].sort((a, b) => {
    if (sortOrder === "asc") return a.text.localeCompare(b.text);
    if (sortOrder === "desc") return b.text.localeCompare(a.text);
    return 0;
  });

  // 5. Динамічний заголовок вкладки браузера
  useEffect(() => {
    document.title = `Задач: ${totalCount} | Todo App`;
  }, [totalCount]);

  // 6. Обробники подій (оновлено для прийому priority та date)
  const handleAddTodo = (
    text: string,
    priority: Priority = "normal",
    date?: string,
  ) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      priority,
      date,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => {
      if (prev === "none") return "asc";
      if (prev === "asc") return "desc";
      return "none";
    });
  };

  return (
    <main className={styles.todoApp}>
      <header className={styles.appHeader}>
        <h1 className={styles.title}>Todo List</h1>
        <p className={styles.subtitle}>
          Організуй свої щоденні справи та завдання
        </p>
      </header>

      <TodoForm
        inputValue={inputValue}
        onInputChange={setInputValue}
        onAdd={handleAddTodo}
        onToggleSort={handleToggleSort}
        sortOrder={sortOrder}
      />

      <div className={styles.counter}>
        <div className={styles.counterBadge}>
          <span className={styles.counterLabel}>Всього завдань</span>
          <span className={styles.counterValue}>{totalCount}</span>
        </div>
        <div className={styles.counterBadge}>
          <span className={styles.counterLabel}>Виконано</span>
          <span className={`${styles.counterValue} ${styles.completedValue}`}>
            {completedCount}
          </span>
        </div>
      </div>

      <TodoList
        todos={displayedTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </main>
  );
};

export default App;
