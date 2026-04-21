# TODO App Design - 2026-04-21

## Overview
A pure frontend Single Page Application (SPA) for managing tasks with an emphasis on organization and reliability.

## Technical Stack
- **Framework**: React
- **Styling**: Tailwind CSS
- **Persistence**: IndexedDB (via `idb` library)
- **State Management**: Context API + Custom Hooks
- **Animations**: Framer Motion (for UI polish)

## Architecture & Data Model

### Directory Structure
- `/src/context`: `TodoContext` and `TodoProvider`
- `/src/hooks`: `useTodos` (state interaction) and `useIndexedDB` (DB operations)
- `/src/components`:
    - `/ui`: Atomic components (Button, Input, Badge, Modal)
    - `/features`: Feature components (TodoItem, TodoList, TodoForm, TodoFilters)
- `/src/lib`: DB configuration and utility functions

### Data Schema
```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: Date | null;
  createdAt: Date;
}
```

### Storage Strategy
- **DB Name**: `TodoAppDB`
- **Store**: `todos`
- **Indexes**: `category`, `priority`

## Component Design & Data Flow

### Hierarchy
- `App` $\rightarrow$ `TodoProvider` $\rightarrow$ `TodoDashboard`
    - `TodoForm` (Create)
    - `TodoFilters` (Search/Filter)
    - `TodoList` $\rightarrow$ `TodoItem` (Read/Update/Delete)

### Data Flow
1. **Init**: `TodoProvider` $\rightarrow$ `idb.openDB` $\rightarrow$ fetch all $\rightarrow$ update React state.
2. **Create**: `TodoForm` $\rightarrow$ `useTodos.addTodo` $\rightarrow$ write to IndexedDB $\rightarrow$ update state.
3. **Update**: `TodoItem` $\rightarrow$ `useTodos.toggleTodo` $\rightarrow$ write to IndexedDB $\rightarrow$ update state.
4. **Filter**: `TodoFilters` $\rightarrow$ update local filter state $\rightarrow$ `TodoList` derives filtered list.

## Error Handling & Quality

### Error Handling
- All DB operations wrapped in `try-catch`.
- User feedback via toast notifications.
- Basic form validation (prevent empty tasks).

### Testing
- **Unit**: Vitest for `useTodos` and utils.
- **Component**: React Testing Library for UI logic.
- **E2E**: Playwright for core user flows.

### UX Polish
- **Optimistic Updates**: UI updates before DB confirmation.
- **Empty States**: Visual feedback when no tasks exist.
- **Animations**: Smooth list transitions via Framer Motion.
- **Responsive**: Mobile-first Tailwind layout.
