# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Run All Tests**: `npm test`
- **Run Single Test**: `npx vitest run <path/to/test>.test.tsx`

## Architecture & Structure
The application is a React SPA using a feature-based directory structure and IndexedDB for local persistence.

### Key Layers
- **Persistence (`src/lib/db.ts`)**: Uses `idb` library to wrap IndexedDB. Stores todos in a `todos` object store with indexes for `category` and `priority`.
- **State Management (`src/context/TodoContext.tsx`)**: A global `TodoProvider` that synchronizes IndexedDB data with React state. Implements optimistic updates for UI responsiveness.
- **Data Access (`src/hooks/useTodos.ts`)**: Custom hook providing derived state for filtered and sorted todo lists.
- **UI Components**:
    - `src/components/ui`: Atomic, reusable components (Button, Input, Badge).
    - `src/components/features`: Feature-specific components (TodoForm, TodoList, TodoItem, TodoFilters).

### Data Flow
`IndexedDB` $\rightarrow$ `TodoProvider` $\rightarrow$ `useTodos` hook $\rightarrow$ `Feature Components` $\rightarrow$ `UI Components`
