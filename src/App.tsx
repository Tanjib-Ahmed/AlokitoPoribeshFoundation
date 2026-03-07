import { LanguageProvider } from './context/LanguageContext';
import { CMSProvider } from './context/CMSContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Activities from './components/Activities';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import Contact from './components/Contact';
import UpcomingEvents from './components/UpcomingEvents';
import Impact from './components/Impact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { useState } from 'react';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAdminAuthenticated(true);
      setShowAdminLogin(false);
      setLoginError('');
      setUsername('');
      setPassword('');
      window.scrollTo(0, 0);
    } else {
      setLoginError('ভুল ইউজারনেম বা পাসওয়ার্ড।');
    }
  };

  // Render the Admin Panel full-screen if authenticated
  if (isAdminAuthenticated) {
    return (
      <CMSProvider>
        <AdminPanel onLogout={() => setIsAdminAuthenticated(false)} />
      </CMSProvider>
    );
  }

  return (
    <CMSProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-slate-50 font-sans text-gray-800 selection:bg-brand-200 selection:text-brand-900">

          {/* Admin Login Modal overlay */}
          {showAdminLogin && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in-95">
                <button
                  onClick={() => setShowAdminLogin(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
                >
                  ✕
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">অ্যাডমিন লগইন</h2>
                {loginError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium">
                    {loginError}
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="ইউজারনেম (Username)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:border-brand-500 outline-none"
                  />
                  <input
                    type="password"
                    required
                    placeholder="পাসওয়ার্ড (Password)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:border-brand-500 outline-none"
                  />
                  <button type="submit" className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-colors">
                    লগইন করুন
                  </button>
                </form>
              </div>
            </div>
          )}
          <Navbar />
          <main>
            <Hero />
            <Impact />
            <About />
            <Activities />
            <Gallery />
            <Blog />
            <UpcomingEvents />
            <Contact />
          </main>
          <Footer />
        </div>

        {/* Hidden Admin Trigger Button at Bottom Right */}
        <button
          onClick={() => setShowAdminLogin(true)}
          className="fixed bottom-4 right-4 w-12 h-12 rounded-full opacity-10 hover:opacity-100 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center text-transparent"
        >
          A
        </button>
      </LanguageProvider>
    </CMSProvider>
  );
}

export default App;
