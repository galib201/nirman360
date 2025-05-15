
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Properties from './pages/Properties';
import Dashboard from './pages/Dashboard';
import BookVisit from './pages/BookVisit';
import BuyingGuide from './pages/BuyingGuide';
import RentingGuide from './pages/RentingGuide';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Properties />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/book-visit/:id" element={<BookVisit />} />
      <Route path="/buying-guide" element={<BuyingGuide />} />
      <Route path="/renting-guide" element={<RentingGuide />} />
    </Routes>
  );
};

export default App;
