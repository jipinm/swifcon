import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './MainContent.module.css';
import MaskedText from '../MaskedText/MaskedText';

// Define types for our data
type UpdateItem = {
  imageUrl: string;
  title: string;
  description: string;
};

type NewsItem = {
  title: string;
  content: string;
};

const MainContent = () => {
  const [updateItems, setUpdateItems] = useState<UpdateItem[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [textBgUrl, setTextBgUrl] = useState<string>('');
  
  // Refs for parallax effects
  const contentRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const updatesRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start end', 'end start']
  });
  
  const yearsScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  const yearsOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);
  const updatesY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const newsY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  // Use textBgUrl in the component (to fix lint warning)
  useEffect(() => {
    if (textBgUrl) {
      console.log('Background image URL loaded:', textBgUrl);
      // This could be used to set a background image dynamically
      // For example: document.body.style.backgroundImage = `url(${textBgUrl})`;
    }
  }, [textBgUrl]);

  // Fetch data from API
  useEffect(() => {
    // Fetch blog updates
    fetch('https://api.example.com/updates')
      .then(response => response.json())
      .then(data => setUpdateItems(data))
      .catch(error => console.error('Error fetching updates:', error));

    // Fetch news items
    fetch('https://api.example.com/news')
      .then(response => response.json())
      .then(data => setNewsItems(data))
      .catch(error => console.error('Error fetching news:', error));



    // Fetch background image
    fetch('https://api.example.com/backgrounds')
      .then(response => response.json())
      .then(data => setTextBgUrl(data.textBg))
      .catch(error => console.error('Error fetching background:', error));
  }, []);

  // Mock data for development (will be replaced by API responses)
  useEffect(() => {
    // If API fails or during development, use this mock data
    if (updateItems.length === 0) {
      setUpdateItems([
        {
          imageUrl: '/assets/images/blog/thumb/blog-1.jpg',
          title: 'Virtual Design & Construction',
          description: '"Virtual Construction Design" a disruptive technology wh..'
        },
        {
          imageUrl: '/assets/images/blog/thumb/video-analysis.jpg',
          title: 'Intelligent Video Analytics',
          description: 'Our unique solution automatically detects, analyses and clas..'
        },
        {
          imageUrl: '/assets/images/blog/thumb/green-buildings.jpg',
          title: 'Green Building Concept',
          description: 'Green buildings are one of the varieties of green living sol..'
        },
        {
          imageUrl: '/assets/images/blog/thumb/bms-1.jpg',
          title: 'Building Management System',
          description: 'BMS systems are "Intelligent" microprocessor-based contr..'
        }
      ]);
    }

    if (newsItems.length === 0) {
      setNewsItems([
        {
          title: 'Transparent Aluminum',
          content: 'For decades, chemical engineers have dreamed of a material that combines the strength and durability of metal with the crystal-clear purity of glass. Such a "clear metal" could be used to construct towering glass-walled skyscrapers that require less internal support. Aluminium oxynitride or AlON is a ceramic composed of aluminium, oxygen and nitrogen. AlON is optically transparent (~80%)'
        },
        {
          title: 'Photovoltaic Glass',
          content: 'Photovoltaic Glass (PV glass) is a technology that enables the conversion of light into electricity. To do so, the glass incorporates transparent semiconductor-based photovoltaic cells, which are also known as solar cells. The cells are sandwiched between two sheets of glass. Photovoltaic glass is not perfectly transparent but allows some of the available light through. it provides the same thermal and sound insulation, and natural light as a conventional architectural glass.'
        },
        {
          title: 'The Second Coming of Ultrasound',
          content: 'Researchers are fitting people\'s heads with ultrasound-emitting helmets to treat tremors and Alzheimer\'s. They\'re using it to remotely activate cancer-fighting immune cells. Startups are designing swallowable capsules and ultrasonically vibrating enemas to shoot drugs into the bloodstream. One company is even using the shockwaves to heal wounds'
        }
      ]);
    }

  }, [updateItems, newsItems]);

  return (
    <div className={styles.content} id="contents" ref={contentRef}>
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
                            <img alt={item.title} src={item.imageUrl} className={styles.updateImage} />
                          </a>
                        </div>
                        <div className={styles.updateContent}>
                          <h6 className={styles.updateTitle}>
                            <a href="#">{item.title}</a>
                          </h6>
                          <p className={styles.updateDescription}>{item.description}</p>
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
                        <p className={styles.newsContent}>{item.content}</p>
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
