import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Priority } from '../../types/todo';

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

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
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

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
        <Select
          label="Category:"
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />

        <Select
          label="Priority:"
          options={PRIORITY_OPTIONS}
          value={priorityFilter}
          onChange={setPriorityFilter}
        />

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
