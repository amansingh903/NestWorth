// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatBubble from "./components/ChatBubble.jsx";

import ModularKitchen from "./pages/design-ideas/ModularKitchen.jsx";
import LivingRoom from "./pages/design-ideas/LivingRoom.jsx";
import MasterBedroom from "./pages/design-ideas/MasterBedroom";
import Bathroom from "./pages/design-ideas/Bathroom.jsx";
import ProjectJourney from "./pages/ProjectJourney";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Designers from "./pages/Designers.jsx";
import PriceCalculator from "./pages/PriceCalculator.jsx";
import Interiors from "./pages/Interiors.jsx";
import Furnishings from "./pages/Furnishings.jsx";
import CityPage from "./pages/CityPage.jsx";
import Leads from "./pages/admin/leads.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

const isAdminRoute = location.pathname.startsWith("/admin");
export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/price-calculator" element={<PriceCalculator />} />
          <Route path="/city/:city" element={<CityPage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/interiors" element={<Interiors />} />
          <Route path="/furnishings" element={<Furnishings />} />
          <Route path="/modular-journey" element={<ProjectJourney />} />

          {/* Design Ideas routes */}
          <Route path="/design-ideas/kitchen" element={<ModularKitchen />} />
          <Route path="/design-ideas/living-room" element={<LivingRoom />} />
          <Route path="/design-ideas/master-bedroom" element={<MasterBedroom />} />
          <Route path="/design-ideas/bathroom" element={<Bathroom />} />

<Route
  path="/admin/leads"
  element={
    <AdminRoute>
      <Leads />
    </AdminRoute>
  }
/>

        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      {/* ✅ Floating chat visible on all pages */}
      <ChatBubble />
    </>
  );
}
