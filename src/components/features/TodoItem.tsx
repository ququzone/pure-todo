import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
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
    <motion.li
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-4 bg-white border-b last:border-b-0 hover:bg-gray-50 transition-colors"
    >
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
            {todo.category && (
              <Badge priority="low" text={todo.category} />
            )}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteTodo(todo.id)}
        aria-label={`Delete ${todo.text}`}
        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.li>
  );
};
