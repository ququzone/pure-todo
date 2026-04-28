import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoList } from './TodoList';
import { useTodoContext } from '../../context/TodoContext';
import { useTodos } from '../../hooks/useTodos';
import { Todo } from '../../types/todo';
import '@testing-library/jest-dom/vitest';

vi.mock('../../hooks/useTodos');
vi.mock('../../context/TodoContext', async () => {
  const actual = await vi.importActual('../../context/TodoContext');
  return {
    ...actual,
    useTodoContext: vi.fn(),
  };
});

const mockTodos: Todo[] = [
  {
    id: '1',
    text: 'Test Todo 1',
    completed: false,
    priority: 'high',
    category: 'Work',
    dueDate: null,
    createdAt: Date.now(),
  },
  {
    id: '2',
    text: 'Test Todo 2',
    completed: true,
    priority: 'low',
    category: 'Personal',
    dueDate: null,
    createdAt: Date.now(),
  },
];

describe('TodoList & TodoItem', () => {
  const toggleTodoMock = vi.fn();
  const deleteTodoMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useTodoContext as ReturnType<typeof vi.fn>).mockReturnValue({
      todos: mockTodos,
      toggleTodo: toggleTodoMock,
      deleteTodo: deleteTodoMock,
      isLoading: false,
    });

    (useTodos as ReturnType<typeof vi.fn>).mockReturnValue({
      todos: mockTodos,
      isLoading: false,
    });
  });

  it('renders the correct number of TodoItem components', () => {
    render(<TodoList />);
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('displays empty state when no tasks', () => {
    (useTodos as ReturnType<typeof vi.fn>).mockReturnValue({
      todos: [],
      isLoading: false,
    });
    (useTodoContext as ReturnType<typeof vi.fn>).mockReturnValue({
      todos: [],
      toggleTodo: toggleTodoMock,
      deleteTodo: deleteTodoMock,
      isLoading: false,
    });

    render(<TodoList />);
    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
  });

  it('displays task text, priority badge, and category', () => {
    (useTodos as ReturnType<typeof vi.fn>).mockReturnValue({
      todos: [mockTodos[0]],
      isLoading: false,
    });

    render(<TodoList />);
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
    const workBadges = screen.getAllByText('Work');
    expect(workBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('calls toggleTodo when checkbox is clicked', () => {
    render(<TodoList />);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(toggleTodoMock).toHaveBeenCalledWith('1');
  });

  it('calls deleteTodo when delete button is clicked', () => {
    render(<TodoList />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(deleteTodoMock).toHaveBeenCalledWith('1');
  });
});
