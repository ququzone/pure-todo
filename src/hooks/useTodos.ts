import { useMemo } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { Todo, Priority } from '../types/todo';

export function useTodos(
  filter: 'all' | 'active' | 'completed' = 'all',
  categoryFilter: string = 'all',
  priorityFilter: string = 'all',
  searchQuery: string = ''
) {
  const { todos, isLoading } = useTodoContext();

  const processedTodos = useMemo(() => {
    let result = [...todos];

    // Filter by status
    if (filter === 'active') {
      result = result.filter(t => !t.completed);
    } else if (filter === 'completed') {
      result = result.filter(t => t.completed);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter(t => t.category === categoryFilter);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(t =>
        t.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by priority then date
    return result.sort((a, b) => {
      const priorityMap: Record<string, number> = { high: 1, medium: 2, low: 3 };
      if (a.priority !== b.priority) {
        return priorityMap[a.priority] - priorityMap[b.priority];
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [todos, filter, categoryFilter, priorityFilter, searchQuery]);

  return {
    todos: processedTodos,
    isLoading,
  };
}
