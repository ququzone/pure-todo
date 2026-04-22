import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoList } from './TodoList';
import { TodoProvider } from '../../context/TodoContext';
import { Todo } from '../../types/todo';
import { useTodos } from '../../hooks/useTodos';
import '@testing-library/jest-dom/vitest';

// Mock the useTodos hook
vi.mock('../../hooks/useTodos', () => ({
  useTodos: vi.fn(),
}));

// Mock the useTodoContext hook
vi.mock('../../context/TodoContext', async () => {
  const actual = await import('../../context/TodoContext');
  return {
    ...actual,
    useTodoContext: vi.fn(),
  };
});

import { useTodoContext } from '../../context/TodoContext';

const mockTodos: Todo[] = [
  {
    id: '1',
    text: 'Test Todo 1',
    completed: false,
    priority: 'high',
    category: 'Work',
    dueDate: null,
    createdAt: new Date(),
  },
  {
    id: '2',
    text: 'Test Todo 2',
    completed: true,
    priority: 'low',
    category: 'Personal',
    dueDate: null,
    createdAt: new Date(),
  },
];

describe('TodoList & TodoItem', () => {
  let toggleTodoMock: any;
  let deleteTodoMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    toggleTodoMock = vi.fn();
    deleteTodoMock = vi.fn();
  });

  it('renders the correct number of TodoItem components based on state', () => {
    (useTodos as any).mockReturnValue({
      todos: mockTodos,
      isLoading: false,
    });

    const mockContext = {
      todos: mockTodos,
      toggleTodo: toggleTodoMock,
      deleteTodo: deleteTodoMock,
      isLoading: false,
    };
    (useTodoContext as any).mockReturnValue(mockContext);

    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('displays a friendly empty state message when no tasks are present', () => {
    (useTodos as any).mockReturnValue({
      todos: [],
      isLoading: false,
    });

    const mockContext = {
      todos: [],
      toggleTodo: toggleTodoMock,
      deleteTodo: deleteTodoMock,
      isLoading: false,
    };
    (useTodoContext as any).mockReturnValue(mockContext);

    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );

    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
  });

  it('TodoItem displays the task text, priority badge, and category', () => {
    (useTodos as any).mockReturnValue({
      todos: [mockTodos[0]],
      isLoading: false,
    });

    const mockContext = {
      todos: [mockTodos[0]],
      toggleTodo: toggleTodoMock,
      deleteTodo: deleteTodoMock,
      isLoading: false,
    };
    (useTodoContext as any).mockReturnValue(mockContext);

    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
    expect(screen.getAllByText('Work')[1]).toBeInTheDocument();
  });

  it('calls toggleTodo from context when checkbox is clicked', async () => {
    const mockContext = {
      todos: mockTodos,
      toggleTodo: toggleTodoMock,
      deleteTodo: deleteTodoMock,
      isLoading: false,
    };
    (useTodoContext as any).mockReturnValue(mockContext);
    (useTodos as any).mockReturnValue({
      todos: mockTodos,
      isLoading: false,
    });

    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(toggleTodoMock).toHaveBeenCalledWith('1');
  });

  it('calls deleteTodo from context when delete button is clicked', async () => {
    const mockContext = {
      todos: mockTodos,
      toggleTodo: toggleTodoMock,
      deleteTodo: deleteTodoMock,
      isLoading: false,
    };
    (useTodoContext as any).mockReturnValue(mockContext);
    (useTodos as any).mockReturnValue({
      todos: mockTodos,
      isLoading: false,
    });

    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(deleteTodoMock).toHaveBeenCalledWith('1');
  });
});
