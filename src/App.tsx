import { useLanguage } from './context/LanguageContext';
import { CMSProvider } from './context/CMSContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Impact from './components/Impact';
import About from './components/About';
import Activities from './components/Activities';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import Contact from './components/Contact';
import UpcomingEvents from './components/UpcomingEvents';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { useState } from 'react';

function App() {
  const { language } = useLanguage();
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <CMSProvider>
      <div className={`min-h-screen bg-background font-sans transition-colors duration-500 ${language === 'bn' ? 'font-bangla' : 'font-sans'}`}>
        {showAdmin ? (
          <AdminPanel onLogout={() => setShowAdmin(false)} />
        ) : (
          <>
            <Navbar />
            <main>
              <Hero />
              <Mission />
              <Impact />
              <About />
              <Activities />
              <Gallery />
              <UpcomingEvents />
              <Blog />
              <Contact />
            </main>
            <Footer />

            {/* Hidden Secret Admin Access */}
            <div
              className="fixed bottom-0 right-0 w-10 h-10 opacity-0 hover:opacity-10 cursor-pointer z-[100]"
              onClick={() => setShowAdmin(true)}
            />
          </>
        )}
      </div>
    </CMSProvider>
  );
}

export default App;
