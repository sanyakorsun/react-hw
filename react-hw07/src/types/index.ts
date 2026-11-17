// Опис типів для завдань
export type Priority = "low" | "normal" | "high";

export interface Task {
  id: number | string;
  text: string;
  completed: boolean;
  priority: Priority;
  date?: string;
  isOverdue?: boolean;
}
