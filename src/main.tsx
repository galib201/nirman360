
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import NotFound from './pages/NotFound';

// Import page components
import AIRecommendations from './pages/AIRecommendations';

// Setup routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/properties" replace />,
  },
  {
    path: "/nirman-ai",
    element: <AIRecommendations />,
  },
  {
    path: "*",
    element: <App />,
  }
]);

// Render application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
