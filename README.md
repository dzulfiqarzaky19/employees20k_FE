# Employees 20k Frontend

This is the frontend application for the Employees 20k project, a comprehensive employee management dashboard built with modern web technologies.

## Tech Stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **State Management:** React Query
- **Routing:** React Router DOM
- **Real-time:** Socket.io Client
- **Testing:** Vitest + React Testing Library

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dzulfiqarzaky19/employees20k_FE.git
   cd employees20k_FE
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory to configure the application. You can refer to `.env.example` if available, or use the following template:

```properties
# API Base URL
VITE_API_URL=http://localhost:3000/api

# WebSocket URL
VITE_WS_URL=http://localhost:3000
```

> **Note:** Adjust the URLs if your backend server is running on a different host or port.

## Running the Application

### Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

To build the application for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Testing

This project uses Vitest for unit and integration testing.

To run the tests:

```bash
npm run test
```

To run tests in watch mode (default):

```bash
npm run test
```

To run tests once:

```bash
npm run test:run
```

## Project Structure

- `src/features`: Feature-based architecture containing components, hooks, and logic for specific domains (e.g., auth, dashboard).
- `src/pages`: Top-level page components used for routing.
- `src/components`: Reusable UI components (Shadcn UI).
- `src/lib`: Utility functions and configuration (axios, socket, utils).
