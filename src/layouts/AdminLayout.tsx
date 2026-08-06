import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, BookOpen, FolderGit, Calendar, Image as ImageIcon, 
  Users, Award, Heart, Settings, LogOut, ShieldCheck, Database, Trees 
} from 'lucide-react';
import { db } from '../services/db';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Authentication check
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('apf_admin_logged_in') === 'true';
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('apf_admin_logged_in');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: t('adminPanel.dashboard'), path: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: t('adminPanel.projectManager'), path: '/admin/projects', icon: <FolderGit className="h-5 w-5" /> },
    { name: t('adminPanel.eventManager'), path: '/admin/events', icon: <Calendar className="h-5 w-5" /> },
    { name: t('adminPanel.blogManager'), path: '/admin/blogs', icon: <BookOpen className="h-5 w-5" /> },
    { name: t('adminPanel.galleryManager'), path: '/admin/gallery', icon: <ImageIcon className="h-5 w-5" /> },
    { name: t('adminPanel.volunteerManager'), path: '/admin/volunteers', icon: <Users className="h-5 w-5" /> },
    { name: t('adminPanel.donationManager'), path: '/admin/donations', icon: <Heart className="h-5 w-5" /> },
    { name: t('adminPanel.certificateManager'), path: '/admin/certificates', icon: <Award className="h-5 w-5" /> },
    { name: t('adminPanel.settingManager'), path: '/admin/settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const isActive = (path: string) => location.pathname === path;

  const isLocal = db.isLocalOnly();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        
        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 space-x-2 bg-slate-950">
          <Trees className="h-6 w-6 text-primary-light" />
          <div>
            <span className="font-heading font-extrabold text-sm text-white tracking-wide block uppercase">
              APF ADMIN
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">
              Platform Panel
            </span>
          </div>
        </div>

        {/* Database Status Sync Indicator */}
        <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800">
          {isLocal ? (
            <div className="flex items-center space-x-2 text-[10px] bg-amber-950/40 text-amber-400 border border-amber-800/40 p-2 rounded-lg">
              <Database className="h-3.5 w-3.5 shrink-0" />
              <span className="font-medium">Sandbox Mode (LocalStorage)</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-[10px] bg-green-950/40 text-green-400 border border-green-800/40 p-2 rounded-lg">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span className="font-medium">Connected to Supabase DB</span>
            </div>
          )}
        </div>

        {/* Navigation Sidebar List */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors
                ${isActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Box */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-950/30 border border-red-900/30 text-red-400 hover:bg-red-900/30 hover:text-red-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>{t('nav.logout')}</span>
          </button>
        </div>

      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
        
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800 font-heading">
              {menuItems.find(item => isActive(item.path))?.name || 'Admin Panel'}
            </h2>
            <p className="text-xs text-slate-500">
              Alokito Poribesh Foundation management operations
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xs font-bold text-primary hover:underline">
              View Public Website &rarr;
            </Link>
          </div>
        </header>

        {/* Child Router Screens */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
          <Outlet />
        </div>

      </main>
    </div>
  );
};
export default AdminLayout;
