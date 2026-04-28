import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '../types/todo';
import { fetchAllTodos, createTodo, updateTodo, removeTodo } from '../services/todoService';

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  isLoading: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllTodos()
      .then(setTodos)
      .catch((error) => console.error('Failed to load todos:', error))
      .finally(() => setIsLoading(false));
  }, []);

  const addTodo = async (todoData: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo = await createTodo(todoData);
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = async (id: string) => {
    const previousTodos = [...todos];
    try {
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
      const target = todos.find((t) => t.id === id);
      if (target) {
        await updateTodo(id, { completed: !target.completed });
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      setTodos(previousTodos);
      throw error;
    }
  };

  const deleteTodo = async (id: string) => {
    const previousTodos = [...todos];
    try {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      await removeTodo(id);
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
