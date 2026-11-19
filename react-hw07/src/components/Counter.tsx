import type { KeyboardEvent } from "react";
import styled, { css } from "styled-components";
import type { FilterStatus } from "../types";

interface CounterProps {
  total: number;
  completed: number;
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

type CardVariant = "total" | "active" | "completed";

const LABEL_COLORS: Record<CardVariant, string> = {
  total: "var(--text-muted)",
  active: "#d97706",
  completed: "#059669",
};

const VALUE_COLORS: Record<CardVariant, string> = {
  total: "var(--text-main)",
  active: "#b45309",
  completed: "#047857",
};

const CounterSection = styled.section`
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 14px;
`;

const Card = styled.div<{ $selected: boolean }>`
  background: #f8fafc;
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-light);
  cursor: pointer;
  user-select: none;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  }

  ${({ $selected }) =>
    $selected &&
    css`
      border-color: #6366f1;
      background-color: #ffffff;
      box-shadow:
        0 0 0 2px rgba(99, 102, 241, 0.25),
        0 4px 12px rgba(15, 23, 42, 0.08);
      transform: translateY(-2px);
    `}
`;

const Label = styled.span<{ $variant: CardVariant }>`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
  color: ${({ $variant }) => LABEL_COLORS[$variant]};
`;

const Value = styled.span<{ $variant: CardVariant }>`
  font-size: 1.4rem;
  font-weight: 800;
  color: ${({ $variant }) => VALUE_COLORS[$variant]};
`;

const ProgressContainer = styled.div`
  background: #ffffff;
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 10px 14px;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const ProgressLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
`;

const ProgressValue = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => `${$percentage}%`};
  background: linear-gradient(90deg, #6366f1 0%, #10b981 100%);
  border-radius: 9999px;
  transition: width 0.3s ease;
`;

export function Counter({
  total,
  completed,
  currentFilter,
  onFilterChange,
}: CounterProps) {
  const active = Math.max(0, total - completed);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleKeyDown = (e: KeyboardEvent, filter: FilterStatus) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFilterChange(filter);
    }
  };

  return (
    <CounterSection aria-label="Статистика та фільтри">
      <Grid>
        <Card
          $selected={currentFilter === "all"}
          onClick={() => onFilterChange("all")}
          onKeyDown={(e) => handleKeyDown(e, "all")}
          role="button"
          tabIndex={0}
          title="Показати всі завдання"
        >
          <Label $variant="total">Всього</Label>
          <Value $variant="total">{total}</Value>
        </Card>

        <Card
          $selected={currentFilter === "active"}
          onClick={() => onFilterChange("active")}
          onKeyDown={(e) => handleKeyDown(e, "active")}
          role="button"
          tabIndex={0}
          title="Показати тільки активні"
        >
          <Label $variant="active">В процесі</Label>
          <Value $variant="active">{active}</Value>
        </Card>

        <Card
          $selected={currentFilter === "completed"}
          onClick={() => onFilterChange("completed")}
          onKeyDown={(e) => handleKeyDown(e, "completed")}
          role="button"
          tabIndex={0}
          title="Показати тільки виконані"
        >
          <Label $variant="completed">Виконано</Label>
          <Value $variant="completed">{completed}</Value>
        </Card>
      </Grid>

      <ProgressContainer>
        <ProgressInfo>
          <ProgressLabel>Прогрес виконання</ProgressLabel>
          <ProgressValue>{percentage}%</ProgressValue>
        </ProgressInfo>
        <ProgressBar>
          <ProgressFill $percentage={percentage} />
        </ProgressBar>
      </ProgressContainer>
    </CounterSection>
  );
}
