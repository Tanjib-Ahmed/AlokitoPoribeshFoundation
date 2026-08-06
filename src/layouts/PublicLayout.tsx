import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Heart, ShieldCheck, Mail, Phone, MapPin, Trees } from 'lucide-react';
import { Button } from '../components/Button';
import { db } from '../services/db';

export const PublicLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orgContact, setOrgContact] = useState({
    email: 'info@alokitoporibesh.org',
    phone: '+880 1700 000 000',
    address: 'Dhanmondi, Dhaka'
  });

  // Fetch settings for contact info
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await db.getSettings();
        const emailSet = settings.find(s => s.key === 'email');
        const phoneSet = settings.find(s => s.key === 'phone');
        const addrSet = i18n.language === 'bn' 
          ? settings.find(s => s.key === 'address_bn') 
          : settings.find(s => s.key === 'address_en');

        setOrgContact({
          email: emailSet ? emailSet.value : 'info@alokitoporibesh.org',
          phone: phoneSet ? phoneSet.value : '+880 1700 000 000',
          address: addrSet ? addrSet.value : 'Dhanmondi, Dhaka'
        });
      } catch (err) {
        console.error('Failed to load layout settings', err);
      }
    };
    loadSettings();
  }, [i18n.language]);

  // Toggle Language
  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('apf_language', nextLang);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.events'), path: '/events' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.verify'), path: '/verify' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  const activeClass = (path: string) => {
    const isHome = path === '/';
    const isActive = isHome 
      ? location.pathname === '/' 
      : location.pathname.startsWith(path);
    
    return isActive 
      ? 'text-primary font-bold border-b-2 border-primary pb-1' 
      : 'text-slate-600 hover:text-primary transition-colors pb-1';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-40 w-full glass-nav shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <Trees className="h-6 w-6" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg sm:text-xl text-primary tracking-tight block">
                  {i18n.language === 'bn' ? 'আলোকিত পরিবেশ' : 'Alokito Poribesh'}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest -mt-1 block font-semibold">
                  Foundation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`text-sm font-semibold ${activeClass(item.path)}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Language switch & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Toggle Language"
              >
                <Globe className="h-4 w-4 text-slate-500" />
                <span>{i18n.language === 'en' ? 'বাংলা' : 'English'}</span>
              </button>

              <Button 
                onClick={() => navigate('/donate')}
                variant="primary"
                size="sm"
                className="shadow-sm"
              >
                <Heart className="h-4 w-4 mr-1.5 fill-white" />
                {t('nav.donate')}
              </Button>
            </div>

            {/* Mobile Hamburger menu */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1.5 rounded-lg cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{i18n.language === 'en' ? 'বাং' : 'EN'}</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-primary p-2 rounded-lg cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-3 shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`py-2 px-3 rounded-lg text-sm font-semibold ${
                    location.pathname === item.path 
                      ? 'bg-primary/5 text-primary' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="border-t border-slate-100 pt-3 flex flex-col space-y-2">
              <Button 
                onClick={() => navigate('/donate')}
                variant="primary"
                className="w-full shadow-sm"
              >
                <Heart className="h-4 w-4 mr-2 fill-white" />
                {t('nav.donate')}
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-white">
                <Trees className="h-7 w-7 text-primary-light" />
                <span className="font-heading font-extrabold text-xl tracking-tight block">
                  {i18n.language === 'bn' ? 'আলোকিত পরিবেশ' : 'Alokito Poribesh'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('home.heroSubtitle')}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">
                {i18n.language === 'bn' ? 'কুইক লিংক' : 'Quick Links'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/about" className="hover:text-primary-light transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/projects" className="hover:text-primary-light transition-colors">{t('nav.projects')}</Link></li>
                <li><Link to="/events" className="hover:text-primary-light transition-colors">{t('nav.events')}</Link></li>
                <li><Link to="/blog" className="hover:text-primary-light transition-colors">{t('nav.blog')}</Link></li>
                <li><Link to="/verify" className="hover:text-primary-light transition-colors">{t('nav.verify')}</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">
                {t('nav.contact')}
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start">
                  <Mail className="h-4 w-4 text-slate-500 mr-2 shrink-0" />
                  <span className="break-all">{orgContact.email}</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 text-slate-500 mr-2 shrink-0" />
                  <span>{orgContact.phone}</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 text-slate-500 mr-2 shrink-0" />
                  <span>{orgContact.address}</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Transparent Seal */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-heading">
                {i18n.language === 'bn' ? 'নিরাপত্তা ও স্বচ্ছতা' : 'Trust & Security'}
              </h4>
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center space-x-3">
                <ShieldCheck className="h-8 w-8 text-primary-light shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-white">
                    {i18n.language === 'bn' ? '১০০% স্বচ্ছ সংস্থা' : '100% Transparent'}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {i18n.language === 'bn' ? 'সরাসরি অনুদান ও নিরীক্ষিত রিপোর্ট' : 'Direct impacts, audited financials.'}
                  </span>
                </div>
              </div>
              
              <Link to="/admin" className="inline-block text-[10px] font-bold text-slate-500 hover:text-slate-400 uppercase tracking-widest">
                {t('nav.admin')}
              </Link>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {i18n.language === 'bn' ? 'আলোকিত পরিবেশ ফাউন্ডেশন' : 'Alokito Poribesh Foundation'}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
export default PublicLayout;
