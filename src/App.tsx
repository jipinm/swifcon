import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Layout
import Layout from './components/Layout/Layout'

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'

function App() {
  // Initialize smooth scrolling on app load
  useEffect(() => {
 
    // Target scroll functionality for navigation links
    const handleTargetScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          const offsetTop = (targetElement as HTMLElement).offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add smooth scroll for mouse wheel (optional - can be enabled/disabled)
    // window.addEventListener('wheel', smoothScrollHandler, { passive: false });
    
    // Add target scroll for navigation links
    document.addEventListener('click', handleTargetScroll);

    return () => {
      // window.removeEventListener('wheel', smoothScrollHandler);
      document.removeEventListener('click', handleTargetScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
