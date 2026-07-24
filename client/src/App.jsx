/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './screens/Home';
import AreasExplorer from './screens/AreasExplorer';
import MapView from './screens/MapView';
import WardenDashboard from './screens/WardenDashboard';
import WardenPortal from './screens/WardenPortal';
import HostelDetails from './screens/HostelDetails';
import Login from './screens/Login';
import Signup from './screens/Signup';
import WardenGuidance from './screens/WardenGuidance';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsOfService from './screens/TermsOfService';
import ContactUs from './screens/ContactUs';
import ComingSoon from './screens/ComingSoon';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/areas" element={<AreasExplorer />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<WardenDashboard />} />
        <Route path="/management" element={<WardenPortal />} />
        <Route path="/hostel/:id" element={<HostelDetails />} />
        <Route path="/warden-guidance" element={<WardenGuidance />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
}

