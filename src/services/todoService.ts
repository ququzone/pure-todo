import { getDB, STORE_NAME } from '../lib/db';
import { Todo } from '../types/todo';

export async function fetchAllTodos(): Promise<Todo[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function createTodo(todoData: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> {
  const db = await getDB();
  const newTodo: Todo = {
    ...todoData,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  await db.put(STORE_NAME, newTodo);
  return newTodo;
}

export async function updateTodo(id: string, updates: Partial<Todo>): Promise<void> {
  const db = await getDB();
  const existing = await db.get(STORE_NAME, id);
  if (existing) {
    await db.put(STORE_NAME, { ...existing, ...updates });
  }
}

export async function removeTodo(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}
