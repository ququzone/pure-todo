import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoForm from './components/features/TodoForm';
import TodoList from './components/features/TodoList';

function App() {
  return (
    <<TodoTodoProvider>
      <<divdiv className="min-h-screen bg-gray-50 py-8 px-4">
        <<divdiv className="max-w-2xl mx-auto">
          <<headerheader className="mb-8">
            <<hh1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <<pp className="text-gray-500">Stay organized and productive.</p>
          </header>

          <<divdiv className="space-y-8">
            <<TodoTodoForm />
            <<TodoListTodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
