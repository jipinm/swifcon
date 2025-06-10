import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [arrowUrl, setArrowUrl] = useState('');
  const location = useLocation();

  // Set logo and arrow images from public assets folder
  useEffect(() => {
    // Use local assets instead of API
    setLogoUrl('/assets/images/logos/logo-icon.png');
    setArrowUrl('/assets/images/icons/arrow3.gif');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Close mobile menu when clicking on a link
  const handleMobileMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Brand Panel */}
      <div className={styles.brandPanel}>
        <Link to="/" className={styles.brand}>
          <img src={logoUrl} alt="Swifcon" className={styles.brandImg} />
        </Link>
        <div className={styles.brandName}>Swifcon</div>
      </div>

      {/* Vertical Panel */}
      <div className={styles.verticalPanel}></div>
      <div className={styles.verticalPanelContent}>
        <div className={styles.verticalPanelInfo}>
          <div className={styles.verticalPanelTitle}>Swifcon</div>
          <div className={styles.line}></div>
        </div>
        <ul className={styles.socialList}>
          <li><a href="https://www.instagram.com/swifconinfrastructure/?hl=en" className="fa fa-instagram"></a></li>
          <li><a href="https://twitter.com/Swifconpvtltd" className="fa fa-twitter"></a></li>
          <li><a href="https://www.facebook.com/SWIFCONPVTLTD/" className="fa fa-facebook"></a></li>
        </ul>
      </div>

      {/* Desktop Navigation */}
      <nav className={`${styles.navbarDesktop} ${isScrolled ? styles.affix : ''}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.brand}>
            <img src={logoUrl} alt="Swifcon" className={styles.imgResponsive} />
          </Link>
          <ul className={styles.navbarDesktopMenu}>
            <li className={location.pathname === '/' ? styles.active : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === '/about' ? styles.active : ''}>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <a href="#industry">Industries</a>
              <ul>
                <li><a href="#healthcare">Healthcare</a></li>
                <li><a href="#hospitality">Hospitality</a></li>
                <li><a href="#office">IT & Office Fitouts</a></li>
                <li><a href="#factories">Factories & Warehouses</a></li>
                <li><a href="#water">Water Supply & Sewage Lines</a></li>
              </ul>
            </li>
            <li>
              <a href="#services">Services</a>
              <ul>
                <li><a href="#civil">Civil Works</a></li>
                <li><a href="#medical">Medical Engineering</a></li>
                <li><a href="#interiors">Interiors</a></li>
                <li><a href="#mechanical">Mechanical</a></li>
                <li><a href="#electrical">Electrical</a></li>
                <li><a href="#plumbing">Plumbing</a></li>
              </ul>
            </li>
            <li className={location.pathname === '/contact' ? styles.active : ''}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={styles.navbarMobile}>
        <Link to="/" className={styles.brand}>
          <img src={logoUrl} width="29" alt="Swifcon" />
        </Link>
        <button 
          type="button" 
          className={`${styles.navbarToggle} ${mobileMenuOpen ? '' : styles.collapsed}`}
          onClick={toggleMobileMenu}
        >
          <span className={styles.srOnly}>Toggle navigation</span>
          <span className={styles.iconBar}></span>
          <span className={styles.iconBar}></span>
          <span className={styles.iconBar}></span>
        </button>
        <div className={`${styles.navbarCollapse} ${mobileMenuOpen ? styles.in : styles.collapse}`}>
          <ul className={styles.navbarNavMobile}>
            <li className={location.pathname === '/' ? styles.active : ''}>
              <Link to="/" onClick={handleMobileMenuItemClick}>Home</Link>
            </li>
            <li className={location.pathname === '/about' ? styles.active : ''}>
              <Link to="/about" onClick={handleMobileMenuItemClick}>About us</Link>
            </li>
            <li className={styles.hasSubmenu}>
              <a href="#industries">Industries</a>
              <ul>
                <li><a href="#healthcare" onClick={handleMobileMenuItemClick}>Healthcare</a></li>
                <li><a href="#hospitality" onClick={handleMobileMenuItemClick}>Hospitality</a></li>
                <li><a href="#office" onClick={handleMobileMenuItemClick}>IT & Office Fitouts</a></li>
                <li><a href="#factories" onClick={handleMobileMenuItemClick}>Factories & Warehouses</a></li>
                <li><a href="#water" onClick={handleMobileMenuItemClick}>Water Supply & Sewage Lines</a></li>
              </ul>
            </li>
            <li className={styles.hasSubmenu}>
              <a href="#services">Services</a>
              <ul>
                <li><a href="#civil" onClick={handleMobileMenuItemClick}>Civil Works</a></li>
                <li><a href="#medical" onClick={handleMobileMenuItemClick}>Medical Engineering</a></li>
                <li><a href="#interiors" onClick={handleMobileMenuItemClick}>Interiors</a></li>
                <li><a href="#mechanical" onClick={handleMobileMenuItemClick}>Mechanical</a></li>
                <li><a href="#electrical" onClick={handleMobileMenuItemClick}>Electrical</a></li>
                <li><a href="#plumbing" onClick={handleMobileMenuItemClick}>Plumbing</a></li>
              </ul>
            </li>
            <li className={location.pathname === '/contact' ? styles.active : ''}>
              <Link to="/contact" onClick={handleMobileMenuItemClick}>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Down Arrow */}
      <img 
        className={styles.downArrow} 
        src={arrowUrl} 
        onClick={() => {
          const element = document.getElementById('rev_slider');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        alt="Scroll down"
      />
    </>
  );
};

export default Header;
