import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { TodoForm } from './TodoForm';
import { useTodoContext } from '../../context/TodoContext';

vi.mock('../../context/TodoContext', async () => {
  const actual = await vi.importActual('../../context/TodoContext');
  return {
    ...actual,
    useTodoContext: vi.fn(),
  };
});

describe('TodoForm', () => {
  const mockAddTodo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTodoContext as any).mockReturnValue({
      addTodo: mockAddTodo,
    });
  });

  it('renders all necessary inputs', () => {
    render(<TodoForm />);

    expect(screen.getByLabelText(/task description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  it('submits a valid todo and calls addTodo', async () => {
    render(<TodoForm />);

    fireEvent.change(screen.getByLabelText(/task description/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/priority/i), { target: { value: 'high' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Work' } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: '2026-12-31' } });

    const submitButtons = screen.getAllByRole('button', { name: /add todo/i });
    fireEvent.click(submitButtons[0]);

    await waitFor(() => {
      expect(mockAddTodo).toHaveBeenCalledWith({
        text: 'Test Task',
        priority: 'high',
        category: 'Work',
        dueDate: '2026-12-31',
        completed: false,
      });
    });
  });

  it('prevents submission if text is empty', async () => {
    render(<TodoForm />);

    // Leave text empty
    fireEvent.change(screen.getByLabelText(/priority/i), { target: { value: 'low' } });

    const submitButtons = screen.getAllByRole('button', { name: /add todo/i });
    fireEvent.click(submitButtons[0]);

    await waitFor(() => {
      expect(mockAddTodo).not.toHaveBeenCalled();
    });
  });
});
