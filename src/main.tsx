
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';

// Import page components
import AIRecommendations from './pages/AIRecommendations';

// Setup routes
const router = createBrowserRouter([
  {
    path: "/nirman-ai",
    element: <AIRecommendations />,
  },
  // Add other routes as needed
]);

// Render application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
