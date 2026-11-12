export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Напрямок сортування: без сортування, від А до Я, або від Я до А
export type SortOrder = "none" | "asc" | "desc";