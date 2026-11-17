import styled, { keyframes } from "styled-components";
import { Header } from "./components/Header";
import type { Task } from "./types";
import { TaskForm } from "./components/TaskForm";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    text: "Підготувати практичне завдання зі стилізації компонентів",
    completed: false,
    priority: "high",
    date: "2026-11-12",
    isOverdue: true,
  },
  {
    id: 2,
    text: "Розробити структуру та стилі інтерфейсу списку завдань",
    completed: true,
    priority: "normal",
    date: "2026-11-14",
  },
  {
    id: 3,
    text: "Налаштувати стилізацію через глобальні CSS-стилі",
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
  const total = MOCK_TASKS.length;
  const completed = MOCK_TASKS.filter((task) => task.completed).length;

  return (
    <AppContainer>
      <Header />
      <TaskForm />
      <Counter total={total} completed={completed} />
      <TodoList tasks={MOCK_TASKS} />
    </AppContainer>
  );
}

export default App;
