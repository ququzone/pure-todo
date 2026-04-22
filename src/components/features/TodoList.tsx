import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import { TodoItem } from './TodoItem';
import { TodoFilters } from './TodoFilters';

export const TodoList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const { todos, isLoading } = useTodos(
    'all',
    categoryFilter,
    priorityFilter,
    searchQuery
  );

  const categories = Array.from(new Set(
    todos.map((todo) => todo.category)
  )).filter(Boolean) as string[];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TodoFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categories={categories}
      />

      {todos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-12 text-center text-gray-500"
        >
          <Inbox className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-lg font-medium">No tasks found</p>
          <p className="text-sm">Enjoy your free time or add a new task!</p>
        </motion.div>
      ) : (
        <ul className="divide-y divide-gray-100 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};
