# 📝 Organized Todo App

A modern, high-performance Single Page Application (SPA) for task management, built with a focus on organization, reliability, and smooth user experience.

## ✨ Features

- **Organized Task Management**: Create tasks with priority levels, categories, and due dates.
- **Powerful Filtering**: Real-time search and additive filtering by category and priority.
- **Local-First Persistence**: Uses **IndexedDB** for robust, browser-side storage that persists across sessions.
- **Optimistic UI**: Instant feedback on toggles and deletions through optimistic state updates.
- **Polished UX**: Smooth transitions and animations powered by Framer Motion.
- **Responsive Design**: Fully functional across mobile and desktop devices using Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Persistence**: IndexedDB (via `idb` library)
- **State Management**: React Context API + Custom Hooks
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Tooling**: Vite, TypeScript, Vitest

## 🛠️ Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Testing
Run the test suite:
```bash
npm test
```

## 📁 Project Structure

- `src/context`: Global state and IndexedDB synchronization.
- `src/hooks`: Logic for filtering, sorting, and interacting with the DB.
- `src/components/ui`: Atomic, reusable design system components.
- `src/components/features`: Core business logic components (Form, List, Filters).
- `src/lib`: Database configuration and initialization.
- `src/types`: TypeScript interfaces for a consistent data model.

## 📄 License
MIT
