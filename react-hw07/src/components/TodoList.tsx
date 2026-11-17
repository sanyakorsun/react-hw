import styled from "styled-components";
import { ToDoItem } from "./TodoItem";
import type { Task } from "../types";

interface TodoListProps {
  tasks: Task[];
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const EmptyContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #f8fafc;
  border-radius: 16px;
  border: 2px dashed #cbd5e1;
`;

const EmptyIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 12px;
`;

const EmptyTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 6px;
`;

const EmptySubtitle = styled.p`
  font-size: 0.9rem;
  color: var(--text-muted);
  max-width: 320px;
  margin: 0 auto;
`;

export function TodoList({ tasks }: TodoListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyContainer>
        <EmptyIcon>✨</EmptyIcon>
        <EmptyTitle>Список завдань порожній</EmptyTitle>
        <EmptySubtitle>
          Додайте нове завдання вище, щоб розпочати свій продуктивний день!
        </EmptySubtitle>
      </EmptyContainer>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <ToDoItem key={task.id} task={task} />
      ))}
    </List>
  );
}
