import { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";
import type { Task, Priority, FilterStatus } from "./types";

const STORAGE_KEY = "tasks_pv511";

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    text: "Опанувати декомпозицію компонентів у React",
    completed: true,
    priority: "normal",
    date: "2026-11-12",
  },
  {
    id: 2,
    text: "Вивчити роботу з хуками useState, useEffect та useRef",
    completed: false,
    priority: "high",
    date: "2026-11-13",
  },
  {
    id: 3,
    text: "Створити завершений додаток Task List із збереженням у LocalStorage",
    completed: false,
    priority: "low",
    date: "2026-11-20",
  },
];

const appAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.99);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const AppContainer = styled.main`
  width: 100%;
  max-width: 600px;
  background-color: var(--card-bg);
  border-radius: 20px;
  padding: 32px 28px;
  box-shadow:
    0 20px 45px -15px rgba(15, 23, 42, 0.08),
    0 0 0 1px rgba(226, 232, 240, 0.8);
  animation: ${appAppear} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
`;

export function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_TASKS;
    } catch (e) {
      console.error("Не вдалося завантажити завдання з LocalStorage:", e);
      return INITIAL_TASKS;
    }
  });

  const [filter, setFilter] = useState<FilterStatus>("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Не вдалося зберегти завдання в LocalStorage:", e);
    }
  }, [tasks]);

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  useEffect(() => {
    document.title =
      activeCount > 0
        ? `(${activeCount}) Завдань залишилось | Task List`
        : "Всі справи виконано! 🎉 | Task List";
  }, [activeCount]);

  const handleAddTask = (taskData: {
    text: string;
    priority: Priority;
    date: string;
  }) => {
    const newTask: Task = {
      id: Date.now(),
      text: taskData.text,
      priority: taskData.priority,
      date: taskData.date || undefined,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: number | string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (id: number | string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const displayedTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <AppContainer>
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <Counter
        total={totalCount}
        completed={completedCount}
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      <TodoList
        tasks={displayedTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </AppContainer>
  );
}

export default App;
