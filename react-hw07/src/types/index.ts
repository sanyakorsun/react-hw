export type Priority = "low" | "normal" | "high";

export type FilterStatus = "all" | "active" | "completed";

export interface Task {
  id: number | string;
  text: string;
  completed: boolean;
  priority: Priority;
  date?: string;
  isOverdue?: boolean;
}
