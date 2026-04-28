import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useTodoContext } from '../../context/TodoContext';
import { Priority } from '../../types/todo';

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export const TodoForm: React.FC = () => {
  const { addTodo } = useTodoContext();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('Task description is required');
      return;
    }

    try {
      await addTodo({
        text,
        priority,
        category,
        dueDate: dueDate || null,
        completed: false,
      });

      setText('');
      setPriority('medium');
      setCategory('');
      setDueDate('');
    } catch {
      setError('Failed to add todo');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="todo-text"
          label="Task Description"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={error && !text ? error : undefined}
        />
        <Select
          id="todo-priority"
          label="Priority"
          options={PRIORITY_OPTIONS}
          value={priority}
          onChange={(v) => setPriority(v as Priority)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="todo-category"
          label="Category"
          placeholder="e.g. Work, Personal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          id="todo-date"
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Add Todo</Button>
      </div>
    </motion.form>
  );
};
