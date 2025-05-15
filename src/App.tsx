
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Properties from './pages/Properties';
import NotFound from './pages/NotFound';
import AIRecommendations from './pages/AIRecommendations';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/properties" replace />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/nirman-ai" element={<AIRecommendations />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
