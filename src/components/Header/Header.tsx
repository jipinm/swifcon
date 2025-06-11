import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Use constants instead of state since these values won't change
  const logoUrl = '/assets/images/logos/logo-icon.png';
  const arrowUrl = '/assets/images/icons/arrow3.gif';
  const location = useLocation();

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
            <li className={location.pathname === '/industries' ? styles.active : ''}>
              <Link to="/industries">Industries</Link>
              <ul>
                <li><Link to="/industries#healthcare">Healthcare</Link></li>
                <li><Link to="/industries#hospitality">Hospitality</Link></li>
                <li><Link to="/industries#office">IT & Office Fitouts</Link></li>
                <li><Link to="/industries#factories">Factories & Warehouses</Link></li>
                <li><Link to="/industries#water">Water Supply & Sewage Lines</Link></li>
              </ul>
            </li>
            <li className={location.pathname === '/services' ? styles.active : ''}>
              <Link to="/services">Services</Link>
              <ul>
                <li><Link to="/services#civil">Civil Works</Link></li>
                <li><Link to="/services#medical">Medical Engineering</Link></li>
                <li><Link to="/services#interiors">Interiors</Link></li>
                <li><Link to="/services#mechanical">Mechanical</Link></li>
                <li><Link to="/services#electrical">Electrical</Link></li>
                <li><Link to="/services#plumbing">Plumbing</Link></li>
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
            <li className={`${styles.hasSubmenu} ${location.pathname === '/industries' ? styles.active : ''}`}>
              <Link to="/industries">Industries</Link>
              <ul>
                <li><Link to="/industries#healthcare" onClick={handleMobileMenuItemClick}>Healthcare</Link></li>
                <li><Link to="/industries#hospitality" onClick={handleMobileMenuItemClick}>Hospitality</Link></li>
                <li><Link to="/industries#office" onClick={handleMobileMenuItemClick}>IT & Office Fitouts</Link></li>
                <li><Link to="/industries#factories" onClick={handleMobileMenuItemClick}>Factories & Warehouses</Link></li>
                <li><Link to="/industries#water" onClick={handleMobileMenuItemClick}>Water Supply & Sewage Lines</Link></li>
              </ul>
            </li>
            <li className={`${styles.hasSubmenu} ${location.pathname === '/services' ? styles.active : ''}`}>
              <Link to="/services">Services</Link>
              <ul>
                <li><Link to="/services#civil" onClick={handleMobileMenuItemClick}>Civil Works</Link></li>
                <li><Link to="/services#medical" onClick={handleMobileMenuItemClick}>Medical Engineering</Link></li>
                <li><Link to="/services#interiors" onClick={handleMobileMenuItemClick}>Interiors</Link></li>
                <li><Link to="/services#mechanical" onClick={handleMobileMenuItemClick}>Mechanical</Link></li>
                <li><Link to="/services#electrical" onClick={handleMobileMenuItemClick}>Electrical</Link></li>
                <li><Link to="/services#plumbing" onClick={handleMobileMenuItemClick}>Plumbing</Link></li>
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
