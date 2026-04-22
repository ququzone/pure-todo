import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTodoContext } from '../../context/TodoContext';
import { Priority } from '../../types/todo';

export const TodoForm: React.FC = () => {
  const { addTodo } = useTodoContext();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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

      // Reset form on success
      setText('');
      setPriority('medium');
      setCategory('');
      setDueDate('');
    } catch (err) {
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
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="todo-priority" className="text-sm font-medium text-gray-700">Priority</label>
          <select
            id="todo-priority"
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
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
