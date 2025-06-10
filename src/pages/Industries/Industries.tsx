import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Industries.module.css';
import IndustryProjects from './IndustryProjects';

// Industry data structure
interface IndustryContent {
  id: string;
  title: string;
  description: string;
  keyFeatures: string[];
  imageUrl: string;
}

// Industry data
const industriesData: IndustryContent[] = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Swifcon delivers specialized construction solutions for healthcare facilities, including hospitals, clinics, and medical centers. Our expertise ensures compliance with strict healthcare regulations while creating healing environments that prioritize patient comfort and operational efficiency.',
    keyFeatures: [
      'Medical gas systems installation',
      'Clean room construction',
      'Specialized HVAC systems for infection control',
      'Radiation shielding solutions',
      'ADA-compliant facilities design'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'Our hospitality construction services create exceptional guest experiences through thoughtful design and quality craftsmanship. From luxury hotels to restaurants, we deliver spaces that combine aesthetics with functionality to enhance guest satisfaction and operational efficiency.',
    keyFeatures: [
      'Hotel renovations and new constructions',
      'Restaurant and bar buildouts',
      'Spa and wellness facility construction',
      'Lobby and common area design',
      'Energy-efficient building systems'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'office',
    title: 'IT & Office Fitouts',
    description: 'Swifcon specializes in creating modern, efficient workspaces tailored to your business needs. Our office fitout solutions incorporate the latest technology infrastructure, ergonomic design principles, and flexible layouts to enhance productivity and employee satisfaction.',
    keyFeatures: [
      'Open plan office designs',
      'Meeting room and collaborative spaces',
      'IT infrastructure integration',
      'Acoustic management solutions',
      'Sustainable office environments'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'factories',
    title: 'Factories & Warehouses',
    description: 'We deliver industrial construction solutions that optimize operational efficiency and safety. Our factory and warehouse projects are designed to meet specific industrial requirements while ensuring durability, functionality, and compliance with industry regulations.',
    keyFeatures: [
      'Large-span structural systems',
      'Loading dock construction',
      'Industrial flooring solutions',
      'Climate-controlled storage facilities',
      'Integrated safety and security systems'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'water',
    title: 'Water Supply & Sewage Lines',
    description: 'Swifcon provides comprehensive solutions for water infrastructure projects, including water supply networks and sewage systems. Our expertise in civil engineering ensures reliable, efficient, and environmentally responsible water management systems.',
    keyFeatures: [
      'Water distribution network installation',
      'Sewage collection system construction',
      'Stormwater management solutions',
      'Pump station installation',
      'Trenchless technology applications'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1589481169991-40ee02888551?auto=format&fit=crop&w=800&q=80'
  }
];

const Industries = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('healthcare');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract industry ID from URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && industriesData.some(industry => industry.id === hash)) {
      setSelectedIndustry(hash);
    }
  }, [location]);

  // Handle industry selection
  const handleIndustrySelect = (industryId: string) => {
    if (industryId === selectedIndustry) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setSelectedIndustry(industryId);
      navigate(`/industries#${industryId}`);
      setIsLoading(false);
      
      // Scroll to top of content with smooth animation
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // Short delay for animation effect
  };

  // Find the selected industry data
  const currentIndustry = industriesData.find(industry => industry.id === selectedIndustry) || industriesData[0];

  return (
    <div className={styles.industriesContainer} ref={contentRef}>
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>Industries</span>
        {selectedIndustry && (
          <>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{currentIndustry.title}</span>
          </>
        )}
      </div>
      
      <h1 className={styles.pageTitle}>
        <span className={styles.accentColor}>Swifcon</span> Industries
      </h1>

      {/* Industry Navigation */}
      <div className={styles.industryNavigation}>
        {industriesData.map(industry => (
          <button
            key={industry.id}
            onClick={() => handleIndustrySelect(industry.id)}
            className={`${styles.industryButton} ${selectedIndustry === industry.id ? styles.activeButton : ''}`}
            aria-label={`View ${industry.title} industry details`}
            aria-pressed={selectedIndustry === industry.id}
          >
            {industry.title}
          </button>
        ))}
      </div>

      {/* Industry Content */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={currentIndustry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={styles.contentContainer}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Industry Image */}
              <motion.div 
                className={styles.industryImage} 
                style={{ backgroundImage: `url(${currentIndustry.imageUrl})` }}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Fallback for missing images */}
                <div className={styles.imageOverlay}>
                  {currentIndustry.title}
                </div>
              </motion.div>

              {/* Industry Title */}
              <motion.h2 
                className={styles.sectionTitle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentIndustry.title}
              </motion.h2>

              {/* Industry Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {currentIndustry.description}
              </motion.p>

              {/* Industry Key Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className={styles.sectionTitle}>Key Features</h3>
                <ul className={styles.featuresList}>
                  {currentIndustry.keyFeatures.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Expertise Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className={styles.sectionTitle}>Our Expertise</h3>
                <p>With years of experience in the {currentIndustry.title.toLowerCase()} sector, Swifcon has developed specialized knowledge and capabilities to deliver exceptional results for our clients. Our team understands the unique challenges and requirements of this industry, ensuring that every project meets the highest standards of quality and compliance.</p>
              </motion.div>

              {/* Projects Section */}
              <IndustryProjects industryId={currentIndustry.id} />

              {/* CTA Section */}
              <motion.div 
                className={styles.ctaSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className={styles.sectionTitle}>
                  Ready to start your project?
                </h3>
                <p>Contact our team to discuss your specific requirements in the {currentIndustry.title.toLowerCase()} sector.</p>
                <button 
                  onClick={() => navigate('/contact')}
                  className={styles.ctaButton}
                  aria-label="Navigate to contact page"
                >
                  Contact Us
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Industries;
