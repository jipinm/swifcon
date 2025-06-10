import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Services.module.css';

// Service data structure
interface ServiceContent {
  id: string;
  title: string;
  description: string;
  keyFeatures: string[];
  imageUrl: string;
  benefits: string[];
}

// Service data
const servicesData: ServiceContent[] = [
  {
    id: 'civil',
    title: 'Civil Works',
    description: 'Our civil works services encompass all aspects of construction from foundation to structure completion. We specialize in delivering high-quality civil engineering solutions for various types of buildings and infrastructure projects, ensuring structural integrity and longevity.',
    keyFeatures: [
      'Structural design and engineering',
      'Foundation construction',
      'Concrete work and reinforcement',
      'Masonry and stonework',
      'Site preparation and excavation',
      'Retaining walls and support structures'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=80',
    benefits: [
      'Durable construction that stands the test of time',
      'Compliance with all relevant building codes and standards',
      'Efficient project management to minimize delays',
      'Cost-effective solutions without compromising quality'
    ]
  },
  {
    id: 'medical',
    title: 'Medical Engineering',
    description: 'Our medical engineering services focus on creating specialized healthcare environments that meet strict regulatory requirements. We design and build facilities that support modern medical practices while ensuring patient safety and comfort.',
    keyFeatures: [
      'Medical gas pipeline systems',
      'Clean room construction',
      'Specialized HVAC for infection control',
      'Radiation shielding installation',
      'Operating theater construction',
      'Laboratory and diagnostic facility setup'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
    benefits: [
      'Facilities that meet international healthcare standards',
      'Optimized spaces for medical equipment and procedures',
      'Enhanced infection control through proper design',
      'Future-ready infrastructure for evolving medical technologies'
    ]
  },
  {
    id: 'interiors',
    title: 'Interiors',
    description: 'Our interior services transform spaces into functional, aesthetically pleasing environments. We combine design expertise with quality craftsmanship to create interiors that reflect your brand identity while maximizing space utilization and user comfort.',
    keyFeatures: [
      'Commercial and office interior design',
      'Custom furniture and fixture installation',
      'Acoustic treatment and sound management',
      'Lighting design and implementation',
      'Flooring and ceiling solutions',
      'Partition systems and space division'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
    benefits: [
      'Spaces that enhance productivity and well-being',
      'Customized designs that reflect brand identity',
      'Optimal space utilization for maximum efficiency',
      'Sustainable and eco-friendly interior solutions'
    ]
  },
  {
    id: 'mechanical',
    title: 'Mechanical',
    description: 'Our mechanical services provide comprehensive solutions for building systems that ensure comfort, efficiency, and sustainability. We design, install, and maintain mechanical systems that form the backbone of modern building functionality.',
    keyFeatures: [
      'HVAC system design and installation',
      'Ventilation and air quality management',
      'Building management systems',
      'Energy efficiency optimization',
      'Refrigeration systems',
      'Fire protection systems'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&auto=format&fit=crop&q=80',
    benefits: [
      'Reduced energy consumption and operational costs',
      'Improved indoor air quality and comfort',
      'Reliable systems with minimal maintenance requirements',
      'Integration with smart building technologies'
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical',
    description: 'Our electrical services deliver safe, efficient, and reliable power solutions for all types of buildings and facilities. We handle everything from basic electrical installations to complex power management systems, ensuring code compliance and optimal performance.',
    keyFeatures: [
      'Electrical system design and installation',
      'Power distribution and management',
      'Lighting systems and controls',
      'Emergency power solutions',
      'Low voltage systems',
      'Smart electrical systems and automation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1473308822086-710304d7d30c?w=800&auto=format&fit=crop&q=80',
    benefits: [
      'Enhanced safety through proper electrical design',
      'Energy-efficient systems that reduce operational costs',
      'Scalable solutions that accommodate future growth',
      'Integration with renewable energy sources'
    ]
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    description: 'Our plumbing services ensure efficient water supply, drainage, and sanitation systems for all types of buildings. We implement solutions that conserve water, prevent leaks, and provide reliable performance for the entire lifecycle of your facility.',
    keyFeatures: [
      'Water supply system design and installation',
      'Drainage and waste management',
      'Fixture installation and fitting',
      'Water conservation solutions',
      'Hot water systems',
      'Stormwater management'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&auto=format&fit=crop&q=80',
    benefits: [
      'Water-efficient systems that reduce consumption',
      'Reliable plumbing that minimizes maintenance issues',
      'Hygienic solutions that meet health standards',
      'Sustainable approaches to water management'
    ]
  }
];

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>('civil');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract service ID from URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && servicesData.some(service => service.id === hash)) {
      setSelectedService(hash);
    }
  }, [location]);

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === selectedService) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setSelectedService(serviceId);
      navigate(`/services#${serviceId}`);
      setIsLoading(false);
      
      // Scroll to top of content with smooth animation
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // Short delay for animation effect
  };

  // Find the selected service data
  const currentService = servicesData.find(service => service.id === selectedService) || servicesData[0];

  return (
    <div className={styles.servicesContainer} ref={contentRef}>
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>Services</span>
        {selectedService && (
          <>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{currentService.title}</span>
          </>
        )}
      </div>
      
      <h1 className={styles.pageTitle}>
        <span className={styles.accentColor}>Swifcon</span> Services
      </h1>

      {/* Service Navigation */}
      <div className={styles.serviceNavigation}>
        {servicesData.map(service => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className={`${styles.serviceButton} ${selectedService === service.id ? styles.activeButton : ''}`}
            aria-label={`View ${service.title} service details`}
            aria-pressed={selectedService === service.id}
          >
            {service.title}
          </button>
        ))}
      </div>

      {/* Service Content */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={styles.contentContainer}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Service Image */}
              <motion.div 
                className={styles.serviceImage} 
                style={{ backgroundImage: `url(${currentService.imageUrl})` }}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Fallback for missing images */}
                <div className={styles.imageOverlay}>
                  {currentService.title}
                </div>
              </motion.div>

              {/* Service Title */}
              <motion.h2 
                className={styles.sectionTitle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentService.title}
              </motion.h2>

              {/* Service Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {currentService.description}
              </motion.p>

              {/* Service Key Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className={styles.sectionTitle}>What We Offer</h3>
                <ul className={styles.featuresList}>
                  {currentService.keyFeatures.map((feature, index) => (
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

              {/* Service Benefits */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className={styles.sectionTitle}>Benefits</h3>
                <ul className={styles.benefitsList}>
                  {currentService.benefits.map((benefit, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                    >
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Expertise Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3 className={styles.sectionTitle}>Our Expertise</h3>
                <p>With years of experience in {currentService.title.toLowerCase()} services, Swifcon has developed specialized knowledge and capabilities to deliver exceptional results for our clients. Our team understands the unique challenges and requirements of this field, ensuring that every project meets the highest standards of quality and compliance.</p>
              </motion.div>

              {/* CTA Section */}
              <motion.div 
                className={styles.ctaSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <h3 className={styles.sectionTitle}>
                  Ready to start your project?
                </h3>
                <p>Contact our team to discuss your specific requirements for {currentService.title.toLowerCase()} services.</p>
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

export default Services;
