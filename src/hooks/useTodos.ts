import { useMemo } from 'react';
import { useTodoContext } from '../context/TodoContext';

const PRIORITY_WEIGHT: Record<string, number> = { high: 1, medium: 2, low: 3 };

export function useTodos(
  categoryFilter: string = 'all',
  priorityFilter: string = 'all',
  searchQuery: string = ''
) {
  const { todos, isLoading } = useTodoContext();

  const processedTodos = useMemo(() => {
    let result = [...todos];

    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    if (priorityFilter !== 'all') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((t) => t.text.toLowerCase().includes(query));
    }

    return result.sort((a, b) => {
      if (a.priority !== b.priority) {
        return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
      }
      return b.createdAt - a.createdAt;
    });
  }, [todos, categoryFilter, priorityFilter, searchQuery]);

  return { todos: processedTodos, isLoading };
}
