export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number | string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: string;
  dueDate: string | null;
  createdAt: Date;
}
