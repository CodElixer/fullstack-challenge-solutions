# Dynamic To-Do List Application

A modern React-based To-Do List application built with Next.js, Tailwind CSS, and shadcn/ui components.

## Features

- Add new tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Filter tasks by all, completed, and pending
- Persist tasks in local storage
- Dark mode support
- Responsive design
- API integration with dummyJSON

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository or create a new directory and add all the files with the same structure

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/` - Next.js App Router files
- `components/` - React components
- `types/` - TypeScript type definitions
- `lib/` - Utility functions

## API Integration

The application uses the [dummyJSON](https://dummyjson.com/docs/todos) API for fetching, adding, updating, and deleting todos. If the API is unavailable, the application falls back to client-side operations.

## Local Storage

All changes to the todo list are persisted in the browser's local storage, ensuring that your tasks are retained after page refresh.

## Dark Mode

The application supports dark mode, which can be toggled using the theme switcher in the top-right corner of the app.

## License

This project is open source and available under the [MIT License](LICENSE).
