import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Testimonials.module.css';

// Define types for testimonial data
type TestimonialItem = {
  name: string;
  position: string;
  company: string;
  content: string;
  avatarUrl: string;
};

const Testimonials = () => {
  // Sample testimonial data
  const testimonials: TestimonialItem[] = [
    {
      name: "Sarah Johnson",
      position: "Project Manager",
      company: "Nexus Builders",
      content: "Swifcon delivered our office renovation project on time and within budget. Their attention to detail and commitment to quality exceeded our expectations.",
      avatarUrl: "/assets/images/testimonials/avatar1.svg"
    },
    {
      name: "Michael Chen",
      position: "Director of Operations",
      company: "HealthPlus Facilities",
      content: "Working with Swifcon on our healthcare facility was a seamless experience. Their expertise in healthcare construction standards made all the difference.",
      avatarUrl: "/assets/images/testimonials/avatar2.svg"
    },
    {
      name: "Priya Sharma",
      position: "Chief Sustainability Officer",
      company: "GreenTech Innovations",
      content: "Swifcon's commitment to sustainable building practices aligned perfectly with our company values. The LEED certification process was handled expertly.",
      avatarUrl: "/assets/images/testimonials/avatar3.svg"
    },
    {
      name: "Raj Patel",
      position: "Hospitality Director",
      company: "Grand Plaza Hotels",
      content: "The renovation of our hotel lobby and conference spaces by Swifcon transformed our property. Their team understood our vision and executed it flawlessly while keeping disruption to a minimum.",
      avatarUrl: "/assets/images/testimonials/avatar4.svg"
    }
  ];

  // Ref for scroll animations
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: testimonialsRef,
    offset: ['start end', 'end start']
  });
  
  const testimonialsY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  // State for carousel navigation
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3); // Default to desktop
  
  // Determine number of visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setVisibleCards(1); // Mobile
      } else if (window.innerWidth <= 992) {
        setVisibleCards(2); // Tablet
      } else {
        setVisibleCards(3); // Desktop/laptop
      }
      
      // Update scroll button states after resize
      if (carouselRef.current) {
        updateScrollButtonStates();
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get card width based on screen size
  const getCardWidth = () => {
    if (!carouselRef.current) return 350;
    
    const containerWidth = carouselRef.current.clientWidth;
    if (window.innerWidth <= 576) {
      return containerWidth * 0.85; // 85% width on mobile
    } else if (window.innerWidth <= 992) {
      return containerWidth * 0.45; // 45% width on tablet
    } else {
      return containerWidth * 0.33333 - 16; // 1/3 of container width on desktop
    }
  };
  
  // Get gap width
  const getGapWidth = () => {
    return window.innerWidth <= 576 ? 16 : 32; // 1rem on mobile, 2rem otherwise
  };
  
  // Calculate max index based on number of testimonials and visible cards
  const getMaxIndex = () => {
    return Math.max(0, testimonials.length - visibleCards);
  };
  
  // Handle carousel navigation
  const handleScrollTo = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    
    const cardWidth = getCardWidth();
    const gap = getGapWidth();
    const itemWidth = cardWidth + gap;
    
    let newIndex: number;
    if (direction === 'next') {
      newIndex = Math.min(activeIndex + 1, getMaxIndex());
    } else {
      newIndex = Math.max(activeIndex - 1, 0);
    }
    
    setActiveIndex(newIndex);
    
    // Calculate scroll position based on card width and gap
    const scrollPosition = Math.floor(newIndex * itemWidth);
    
    // Force a reflow before scrolling
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        
        // Update scroll button states after scrolling completes
        setTimeout(() => updateScrollButtonStates(), 300);
      }
    }, 0);
  };

  // Function to update scroll button states
  const updateScrollButtonStates = (scrollLeft?: number) => {
    if (!carouselRef.current) return;
    
    const currentScrollLeft = scrollLeft !== undefined ? scrollLeft : carouselRef.current.scrollLeft;
    setCanScrollLeft(currentScrollLeft > 5); // Add a small threshold for better detection
    
    const containerWidth = carouselRef.current.clientWidth;
    const scrollWidth = carouselRef.current.scrollWidth;
    const maxScrollLeft = scrollWidth - containerWidth;
    
    // Allow 10px margin of error for right edge detection
    setCanScrollRight(currentScrollLeft < maxScrollLeft - 10);
  };
  
  // Handle scroll events in the carousel
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = getCardWidth();
      const gap = getGapWidth();
      const itemWidth = cardWidth + gap;
      
      // Calculate the current index based on scroll position
      const newIndex = Math.min(
        Math.round(scrollLeft / itemWidth),
        getMaxIndex() // Limit to max possible index
      );
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
      
      // Update scroll button states
      updateScrollButtonStates(scrollLeft);
    }
  };

  return (
    <motion.section 
      className={styles.testimonialsSection}
      ref={testimonialsRef}
      style={{ 
        y: testimonialsY,
        backgroundColor: 'var(--bg-light-alt)',
        width: '100%'
      }}
    >
      <div className={styles.container}>
        <h2 className={styles.mainSectionTitle}>
          Client <span className={styles.textPrimary}>Testimonials</span>
        </h2>
        
        <div 
          className={styles.testimonialsGrid}
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                transition: { duration: 0.3 } 
              }}
            >
              <div className={styles.testimonialQuote}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.667 13.333H5.33366C5.33366 13.333 5.33366 8 10.667 8M10.667 13.333C10.667 15.667 8.66699 17.333 6.66699 18.667C4.66699 20 5.33366 24 5.33366 24H10.667C10.667 24 13.3337 24 13.3337 21.333V16C13.3337 14.667 12.0003 13.333 10.667 13.333ZM26.667 13.333H21.3337C21.3337 13.333 21.3337 8 26.667 8M26.667 13.333C26.667 15.667 24.667 17.333 22.667 18.667C20.667 20 21.3337 24 21.3337 24H26.667C26.667 24 29.3337 24 29.3337 21.333V16C29.3337 14.667 28.0003 13.333 26.667 13.333Z" 
                    stroke="#db6766" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className={styles.testimonialContent}>
                <p>{testimonial.content}</p>
              </div>
              
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.name}
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.classList.add(styles.avatarInitials);
                      target.parentElement!.setAttribute('data-initials', testimonial.name.charAt(0));
                    }}
                  />
                </div>
                <div className={styles.testimonialInfo}>
                  <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                  <p className={styles.testimonialPosition}>
                    {testimonial.position}, <span>{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Carousel Navigation Arrows */}
        <div className={styles.carouselNavigation}>
          <button 
            className={styles.navButton}
            onClick={() => handleScrollTo('prev')}
            disabled={!canScrollLeft}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button 
            className={styles.navButton}
            onClick={() => handleScrollTo('next')}
            disabled={!canScrollRight}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
