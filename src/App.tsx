import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Activities from './components/Activities';
import Impact from './components/Impact';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <div className="relative">
        <About />
        <Activities />
        <Impact />
        <Gallery />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
