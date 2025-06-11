import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './WorkIndustries.module.css'; // Self-contained styles for WorkIndustries
import { Building2, Hotel, Home, School, Factory, Briefcase, HeartPulse, Warehouse, Droplet } from 'lucide-react';

// Define types for our data
type Industry = {
  imageUrl: string;
  name: string;
};

const WorkIndustries = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  
  // Ref for parallax effects
  const industriesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start end', 'end start']
  });
  
  const industriesY = useTransform(scrollYProgress, [0.3, 0.8], [100, 0]);

  // Load data directly without API fetch to avoid console errors
  useEffect(() => {
    setIndustries([
      { imageUrl: '/assets/images/industries/healthcare.svg', name: 'Healthcare' },
      { imageUrl: '/assets/images/industries/hospitality.svg', name: 'Hospitality' },
      { imageUrl: '/assets/images/industries/office.svg', name: 'IT & Office Fitouts' },
      { imageUrl: '/assets/images/industries/residential.jpg', name: 'Residential' },
      { imageUrl: '/assets/images/industries/commercial.jpg', name: 'Commercial' },
      { imageUrl: '/assets/images/industries/educational.jpg', name: 'Educational' },
      { imageUrl: '/assets/images/industries/factories.svg', name: 'Factories' },
      { imageUrl: '/assets/images/industries/industrial.jpg', name: 'Industrial' },
      { imageUrl: '/assets/images/industries/warehouses.jpg', name: 'Warehouses' },
      { imageUrl: '/assets/images/industries/water.svg', name: 'Water Supply & Sewage Lines' }
    ]);
  }, []);

  return (
    <div ref={contentRef} className={styles.workIndustriesWrapper}>
      {/* Industries Section */}
      <motion.section 
        className={styles.industriesSection}
        ref={industriesRef}
        style={{ y: industriesY }}
      >
        <div className={styles.container}>
          <h2 className={styles.mainSectionTitle}>
            Work <span className={styles.textPrimary}>Industries</span>
          </h2>
          <div className={styles.industriesGrid}>
            {industries.map((industry, index) => (
              <motion.div 
                key={index} 
                className={styles.industryItem}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className={styles.industryImageContainer}>
                  {industry.name === 'Healthcare' && <HeartPulse size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                  {industry.name === 'Hospitality' && <Hotel size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                  {industry.name === 'IT & Office Fitouts' && <Briefcase size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                  {industry.name === 'Residential' && <Home size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                  {industry.name === 'Commercial' && <Building2 size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                  {industry.name === 'Educational' && <School size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                  {industry.name === 'Factories' && <Factory size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                  {industry.name === 'Industrial' && <Factory size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                  {industry.name === 'Warehouses' && <Warehouse size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                  {industry.name === 'Water Supply & Sewage Lines' && <Droplet size={48} strokeWidth={1.5} className={styles.industryIcon} />}
                </div>
                <h4 className={styles.industryName}>{industry.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default WorkIndustries;
