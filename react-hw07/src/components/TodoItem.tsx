import styled, { css } from "styled-components";
import type { Task, Priority } from "../types";

const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Низький",
  normal: "Звичайний",
  high: "Високий",
};

const PRIORITY_BORDER_COLORS: Record<Priority, string> = {
  low: "var(--priority-low)",
  normal: "var(--priority-normal)",
  high: "var(--priority-high)",
};

const BADGE_STYLES: Record<Priority, { bg: string; color: string }> = {
  low: { bg: "#ecfdf5", color: "#065f46" },
  normal: { bg: "#fffbeb", color: "#92400e" },
  high: { bg: "#fef2f2", color: "#991b1b" },
};

interface TodoItemProps {
  task: Task;
  onToggleTask: (id: number | string) => void;
  onDeleteTask: (id: number | string) => void;
}

const TODAY_STRING = new Date().toISOString().slice(0, 10);

const Item = styled.li<{
  $priority: Priority;
  $completed: boolean;
  $overdue: boolean;
}>`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: ${({ $completed }) => ($completed ? "#f8fafc" : "#ffffff")};
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 10px;
  border: 1px solid var(--border-light);
  border-left: 5px solid ${({ $priority }) => PRIORITY_BORDER_COLORS[$priority]};
  opacity: ${({ $completed }) => ($completed ? 0.65 : 1)};
  box-shadow: ${({ $overdue }) =>
    $overdue
      ? "0 0 0 2px #ef4444, 0 4px 12px rgba(239, 68, 68, 0.15)"
      : "0 2px 6px rgba(15, 23, 42, 0.05)"};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
  list-style: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $overdue }) =>
      $overdue
        ? "0 0 0 2px #ef4444, 0 6px 16px rgba(239, 68, 68, 0.2)"
        : "0 6px 16px rgba(15, 23, 42, 0.08)"};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 3px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--primary-color);
  border-radius: 6px;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Text = styled.p<{ $completed: boolean }>`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ $completed }) => ($completed ? "var(--text-muted)" : "#1e293b")};
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  margin-bottom: 6px;
  word-break: break-word;
  line-height: 1.4;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badge = styled.span<{ $priority: Priority }>`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
  text-transform: capitalize;
  background-color: ${({ $priority }) => BADGE_STYLES[$priority].bg};
  color: ${({ $priority }) => BADGE_STYLES[$priority].color};
`;

const DateText = styled.span<{ $overdue: boolean }>`
  font-size: 0.75rem;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${({ $overdue }) =>
    $overdue &&
    css`
      color: #dc2626;
      font-weight: 600;
    `}
`;

const OverdueAlert = styled.span`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 4px;
`;

const DeleteBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  color: #94a3b8;
  transition:
    background-color 0.15s ease,
    transform 0.15s ease;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fee2e2;
    transform: scale(1.1);
  }
`;

export function TodoItem({ task, onToggleTask, onDeleteTask }: TodoItemProps) {
  const isOverdue = Boolean(
    task.isOverdue ??
    (!task.completed && task.date && task.date < TODAY_STRING),
  );

  return (
    <Item
      $priority={task.priority}
      $completed={task.completed}
      $overdue={isOverdue}
    >
      <CheckboxLabel
        title={
          task.completed ? "Позначити як невиконане" : "Позначити як виконане"
        }
      >
        <Checkbox
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />
      </CheckboxLabel>

      <Content>
        <Text $completed={task.completed}>{task.text}</Text>
        <Meta>
          <Badge $priority={task.priority}>
            {PRIORITY_LABELS[task.priority]}
          </Badge>
          {task.date && (
            <DateText $overdue={isOverdue}>
              📅 {task.date}
              {isOverdue && <OverdueAlert>⚠️ Прострочено</OverdueAlert>}
            </DateText>
          )}
        </Meta>
      </Content>

      <DeleteBtn
        type="button"
        title="Видалити завдання"
        onClick={() => onDeleteTask(task.id)}
      >
        🗑️
      </DeleteBtn>
    </Item>
  );
}
