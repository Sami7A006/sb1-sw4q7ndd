import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductScanPage from './pages/ProductScanPage';
import HealthTrackerPage from './pages/HealthTrackerPage';
import DietPlanPage from './pages/DietPlanPage';
import ChatbotPage from './pages/ChatbotPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="scan" element={<ProductScanPage />} />
          <Route path="health" element={<HealthTrackerPage />} />
          <Route path="diet" element={<DietPlanPage />} />
          <Route path="chat" element={<ChatbotPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;