import React from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { Todo } from '../../types/todo';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoContext();

  return (
    <li className="flex items-center justify-between p-4 bg-white border-b last:border-b-0 hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          aria-label={`Toggle ${todo.text}`}
        />
        <div className="flex flex-col gap-1">
          <span className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.text}
          </span>
          <div className="flex items-center gap-2">
            <Badge priority={todo.priority} text={todo.priority} />
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
              {todo.category}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => deleteTodo(todo.id)}
          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          aria-label={`Delete ${todo.text}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </li>
  );
};
