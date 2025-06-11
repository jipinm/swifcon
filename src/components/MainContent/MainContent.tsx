import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './MainContent.module.css';
import MaskedText from '../MaskedText/MaskedText';

// Define types
type UpdateItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
  link: string;
  image: string;
};

type NewsItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
  link: string;
  image: string;
};

const MainContent = () => {
  // State for data
  const [updateItems, setUpdateItems] = useState<UpdateItem[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  
  // Refs for scroll animations
  const { scrollYProgress } = useScroll();
  const yearsRef = useRef<HTMLDivElement>(null);
  const updatesRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  
  // Animation values
  const yearsScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  const yearsOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);
  const updatesY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const newsY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  
  // No need to apply background image to yearsRef since MaskedText already has one

  // Use mock data directly instead of API fetches
  useEffect(() => {
    // Set update items
    setUpdateItems([
      {
        id: '1',
        title: 'New ISO Certification',
        date: 'June 5, 2025',
        summary: 'Swifcon achieves ISO 9001:2018 certification for quality management systems.',
        link: '/updates/iso-certification',
        image: '/assets/images/blog/thumb/blog-1.jpg'
      },
      {
        id: '2',
        title: 'Energy Efficiency Award',
        date: 'May 22, 2025',
        summary: 'Our Green Building initiatives win National Energy Conservation Award.',
        link: '/updates/energy-award',
        image: '/assets/images/blog/thumb/green-buildings.jpg'
      },
      {
        id: '3',
        title: 'Virtual Design & Construction',
        date: 'May 10, 2025',
        summary: 'Implementing VDC to improve project delivery and reduce waste.',
        link: '/updates/vdc-implementation',
        image: '/assets/images/blog/thumb/video-analysis.jpg'
      }
    ]);
    
    // Set news items
    setNewsItems([
      {
        id: '1',
        title: 'New Hospital Project',
        date: 'June 1, 2025',
        summary: 'Swifcon awarded contract for 500-bed super specialty hospital in Kochi.',
        link: '/news/hospital-project',
        image: '/assets/images/blog/thumb/blog-1.jpg'
      },
      {
        id: '2',
        title: 'BMS Integration',
        date: 'May 15, 2025',
        summary: 'Advanced Building Management Systems implementation for corporate clients.',
        link: '/news/bms-integration',
        image: '/assets/images/blog/thumb/bms-1.jpg'
      },
      {
        id: '3',
        title: 'Infrastructure Development',
        date: 'May 5, 2025',
        summary: 'Major infrastructure development project in Thiruvananthapuram.',
        link: '/news/infrastructure-development',
        image: '/assets/images/blog/thumb/video-analysis.jpg'
      }
    ]);
  }, []);

  return (
    <div className={styles.content} id="contents">
      {/* Latest Updates and News Section */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              
              {/* Latest Updates */}
              <motion.div 
                className={styles.column}
                ref={updatesRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ y: updatesY }}
              >
                <div className={styles.card}>
                  <h4 className={styles.sectionTitle}>
                    Latest <span className={styles.textPrimary}>Updates</span>
                  </h4>
                  <div className={styles.updatesList}>
                    {updateItems.map((item, index) => (
                      <motion.article 
                        key={index} 
                        className={styles.updateItem}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                      >
                        <div className={styles.updateImageWrapper}>
                          <a href="#">
                            <img alt={item.title} src={item.image} className={styles.updateImage} />
                          </a>
                        </div>
                        <div className={styles.updateContent}>
                          <h6 className={styles.updateTitle}>
                            <a href="#">{item.title}</a>
                          </h6>
                          <p className={styles.updateDescription}>{item.summary}</p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 15 Years Experience */}
              <motion.div 
                className={styles.column}
                ref={yearsRef}
                style={{ scale: yearsScale, opacity: yearsOpacity }}
              >
                <div className={styles.yearsExperience}>
                  <div className={styles.yearsImageContainer}>
                    <MaskedText 
                      number="15" 
                    />
                  </div>
                  <div className={styles.yearsText}>
                    <h4 className={styles.yearsTitle}>
                      <span className={styles.textPrimary}>Years of successful work</span>
                    </h4>
                    <p className={styles.yearsSubtitle}>in the market</p>
                  </div>
                </div>
              </motion.div>

              {/* Latest News */}
              <motion.div 
                className={styles.column}
                ref={newsRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ y: newsY }}
              >
                <div className={styles.card}>
                  <h4 className={styles.sectionTitle}>
                    Latest <span className={styles.textPrimary}>News</span>
                  </h4>
                  <div className={styles.newsList}>
                    {newsItems.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className={styles.newsItem}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <h5 className={styles.newsTitle}>
                          <a href="#">
                            <span className={styles.newsIcon}>›</span>
                            {item.title}
                          </a>
                        </h5>
                        <p className={styles.newsContent}>{item.summary}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default MainContent;
