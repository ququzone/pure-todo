import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, isLoading } = useTodos();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        Loading tasks...
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">Enjoy your free time or add a new task!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
