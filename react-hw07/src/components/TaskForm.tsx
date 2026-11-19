import { useState, useRef, useEffect, type FormEvent } from "react";
import styled from "styled-components";
import type { Priority } from "../types";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8fafc;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--border-light);
  margin-bottom: 24px;
`;

const InputGroup = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  background-color: #ffffff;
  color: var(--text-main);
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
`;

const Controls = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 140px;
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Select = styled.select`
  padding: 10px 12px;
  font-size: 0.9rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  background-color: #ffffff;
  color: #1e293b;
  outline: none;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

const DateInput = styled.input`
  padding: 10px 12px;
  font-size: 0.9rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  background-color: #ffffff;
  color: #1e293b;
  outline: none;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 20px;
  height: 42px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.25);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(79, 70, 229, 0.35);
    background: linear-gradient(135deg, var(--primary-hover) 0%, #3730a3 100%);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const BtnIcon = styled.span`
  font-size: 1.1rem;
  line-height: 1;
`;

interface TaskFormProps {
  onAddTask: (task: { text: string; priority: Priority; date: string }) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (text.trim().length < 3) {
      setError("Текст завдання має містити щонайменше 3 символи!");
      return;
    }

    onAddTask({
      text: text.trim(),
      priority,
      date,
    });

    setText("");
    setPriority("normal");
    setDate("");
    setError(null);

    textInputRef.current?.focus();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          ref={textInputRef}
          type="text"
          placeholder="Що потрібно зробити?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          autoComplete="off"
        />
        {error && <ErrorText>⚠️ {error}</ErrorText>}
      </InputGroup>

      <Controls>
        <Group>
          <Label htmlFor="priority-select">Пріоритет:</Label>
          <Select
            id="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">🟢 Низький</option>
            <option value="normal">🟡 Звичайний</option>
            <option value="high">🔴 Високий</option>
          </Select>
        </Group>

        <Group>
          <Label htmlFor="deadline-input">Дедлайн:</Label>
          <DateInput
            id="deadline-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Group>

        <SubmitBtn type="submit" disabled={text.trim().length === 0}>
          <BtnIcon>＋</BtnIcon>
          <span>Додати</span>
        </SubmitBtn>
      </Controls>
    </Form>
  );
}
