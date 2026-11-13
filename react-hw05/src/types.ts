export type Priority = "low" | "normal" | "high";
export type SortOrder = "none" | "asc" | "desc";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  date?: string;
}
