import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../features/home/Home';
import About from '../features/about/About';
import Projects from '../features/projects/Projects';
import ProjectDetail from '../features/projects/ProjectDetail';
import Events from '../features/events/Events';
import EventDetail from '../features/events/EventDetail';
import Gallery from '../features/gallery/Gallery';
import AlbumDetail from '../features/gallery/AlbumDetail';
import Blog from '../features/blog/Blog';
import BlogDetail from '../features/blog/BlogDetail';
import Donate from '../features/donate/Donate';
import Join from '../features/join/Join';
import Verify from '../features/verify/Verify';
import Contact from '../features/contact/Contact';

// Legal Pages
const Privacy: React.FC = () => (
  <div className="py-12 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 font-heading">Privacy Policy</h1>
    <p className="text-slate-600 leading-relaxed mb-4">
      Your privacy is important to us. It is Alokito Poribesh Foundation's policy to respect your privacy regarding any information we may collect from you across our website. We only ask for personal information when we truly need it to provide a service to you (like volunteer application or donation tracing).
    </p>
    <p className="text-slate-600 leading-relaxed">
      We do not share any personally identifying information publicly or with third-parties, except when required by law.
    </p>
  </div>
);

const Terms: React.FC = () => (
  <div className="py-12 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 font-heading">Terms of Service</h1>
    <p className="text-slate-600 leading-relaxed mb-4">
      By accessing the website at alokitoporibesh.org, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
    </p>
    <p className="text-slate-600 leading-relaxed">
      The materials on Alokito Poribesh Foundation's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability or fitness for a particular purpose.
    </p>
  </div>
);

// Admin Pages
import Login from '../features/admin/Login';
import DashboardOverview from '../features/admin/DashboardOverview';
import BlogManager from '../features/admin/managers/BlogManager';
import ProjectManager from '../features/admin/managers/ProjectManager';
import EventManager from '../features/admin/managers/EventManager';
import GalleryManager from '../features/admin/managers/GalleryManager';
import VolunteerManager from '../features/admin/managers/VolunteerManager';
import DonationManager from '../features/admin/managers/DonationManager';
import CertificateManager from '../features/admin/managers/CertificateManager';
import SettingManager from '../features/admin/managers/SettingManager';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:slug" element={<EventDetail />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="gallery/:albumId" element={<AlbumDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetail />} />
        <Route path="donate" element={<Donate />} />
        <Route path="join" element={<Join />} />
        <Route path="verify" element={<Verify />} />
        <Route path="verify/:certificateId" element={<Verify />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Dashboard Pages */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="blogs" element={<BlogManager />} />
        <Route path="projects" element={<ProjectManager />} />
        <Route path="events" element={<EventManager />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="volunteers" element={<VolunteerManager />} />
        <Route path="donations" element={<DonationManager />} />
        <Route path="certificates" element={<CertificateManager />} />
        <Route path="settings" element={<SettingManager />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
