import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo, Priority } from '../types/todo';
import { getDB } from '../lib/db';

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => Promise<void>;
  toggleTodo: (id: number | string) => Promise<void>;
  deleteTodo: (id: number | string) => Promise<void>;
  isLoading: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const db = await getDB();
        const allTodos = await db.getAll('todos');
        setTodos(allTodos);
      } catch (error) {
        console.error('Failed to load todos from IndexedDB:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, []);

  const addTodo = async (todoData: Omit<Todo, 'id' | 'createdAt'>) => {
    try {
      const db = await getDB();
      const newTodo: Todo = {
        ...todoData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      await db.put('todos', newTodo);
      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
      throw error;
    }
  };

  const toggleTodo = async (id: number | string) => {
    const previousTodos = [...todos];
    try {
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

      const db = await getDB();
      const todo = await db.get('todos', id);
      if (todo) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        await db.put('todos', updatedTodo);
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      setTodos(previousTodos);
      throw error;
    }
  };

  const deleteTodo = async (id: number | string) => {
    const previousTodos = [...todos];
    try {
      setTodos((prev) => prev.filter((t) => t.id !== id));

      const db = await getDB();
      await db.delete('todos', id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setTodos(previousTodos);
      throw error;
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, isLoading }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
