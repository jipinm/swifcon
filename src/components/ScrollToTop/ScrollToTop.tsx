import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that scrolls the window to the top when the route changes
 * This component doesn't render anything visible - it just performs the scroll action
 */
const ScrollToTop = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, we don't want to scroll to top
    // as the user is likely trying to navigate to a specific section
    if (!hash) {
      // Scroll to the top of the page with smooth behavior
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, hash, search]); // Re-run when location changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
