import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoForm from './components/features/TodoForm';
import TodoList from './components/features/TodoList';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-500">Stay organized and productive.</p>
          </header>

          <div className="space-y-8">
            <TodoForm />
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
