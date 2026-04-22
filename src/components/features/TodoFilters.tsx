import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Priority } from '../../types/todo';

interface TodoFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  categories: string[];
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  categories,
}) => {
  const priorities: Priority[] = ['low', 'medium', 'high'];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Priorities</option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSearchQuery('');
            setCategoryFilter('all');
            setPriorityFilter('all');
          }}
          className="text-xs"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
