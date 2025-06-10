import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

// Define types for our slides
type Slide = {
  imageUrl: string;
  title: string;
  subtitle: string;
};

// Helper function to split text into characters for letter-by-letter animation
const splitTextIntoChars = (text: string) => {
  // Split text into words first
  const words = text.split(' ');
  
  // Then process each word character by character
  return words.map((word, wordIndex) => {
    const chars = word.split('').map((char, charIndex) => (
      <span 
        key={`${wordIndex}-${charIndex}`} 
        className={styles.char}
        style={{ animationDelay: `${0.05 * (charIndex + wordIndex * word.length)}s` }}
      >
        {char}
      </span>
    ));
    
    // Add a space after each word except the last one
    if (wordIndex < words.length - 1) {
      return (
        <span key={`word-${wordIndex}`} className={styles.word}>
          {chars}
          <span className={styles.space}>&nbsp;</span>
        </span>
      );
    } else {
      return (
        <span key={`word-${wordIndex}`} className={styles.word}>
          {chars}
        </span>
      );
    }
  });
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [slides, setSlides] = useState<Slide[]>([]);

  // Fetch slides from API
  useEffect(() => {
    fetch('https://api.example.com/slides')
      .then(response => response.json())
      .then(data => setSlides(data))
      .catch(error => {
        console.error('Error fetching slides:', error);
        // Fallback to mock data if API fails
        setSlides([
          {
            imageUrl: '/assets/images/slider/slide1.jpg',
            title: 'Infrastructure Development',
            subtitle: 'Doing the best for a growing Economy'
          },
          {
            imageUrl: '/assets/images/slider/slide2.jpg',
            title: 'Medical Engineering',
            subtitle: 'The best partner for constructing a healthy nation'
          },
          {
            imageUrl: '/assets/images/slider/slide3.jpg',
            title: 'Interiors of Commercial Spaces',
            subtitle: 'Comfort and Aesthetics Blended for those who work'
          },
          {
            imageUrl: '/assets/images/slider/slide4.jpg',
            title: 'Steel Structures',
            subtitle: 'Strong, Fast & Eco friendly Structures'
          },
          {
            imageUrl: '/assets/images/slider/slide5.jpg',
            title: 'Turnkey Projects',
            subtitle: 'Your trusted Partner'
          },
          {
            imageUrl: '/assets/images/slider/slide6.jpg',
            title: 'Industrial Pipelines',
            subtitle: 'Industrial Pipe lines'
          },
          {
            imageUrl: '/assets/images/slider/slide7.jpg',
            title: 'Green Buildings',
            subtitle: 'Eco friendly and energy saving buildings'
          }
        ]);
      });
  }, []);

  // Initialize the slider
  useEffect(() => {
    // Only start the timer when we have slides
    if (slides.length > 0) {
      startSliderTimer();
    }
    
    // Handle touch events for mobile swipe
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      let touchStartX = 0;
      let touchEndX = 0;
      
      const handleTouchStart = (e: TouchEvent) => {
        touchStartX = e.touches[0].clientX;
      };
      
      const handleTouchEnd = (e: TouchEvent) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
      };
      
      const handleSwipe = () => {
        const swipeThreshold = 75; // Match Revolution Slider's swipe_threshold
        if (touchEndX - touchStartX > swipeThreshold) {
          // Swipe right - go to previous slide
          handlePrevSlide();
        } else if (touchStartX - touchEndX > swipeThreshold) {
          // Swipe left - go to next slide
          handleNextSlide();
        }
      };
      
      sliderElement.addEventListener('touchstart', handleTouchStart);
      sliderElement.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        sliderElement.removeEventListener('touchstart', handleTouchStart);
        sliderElement.removeEventListener('touchend', handleTouchEnd);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [slides.length]);
  
  // Handle down arrow click to scroll to content
  useEffect(() => {
    const handleDownArrowClick = () => {
      const contentElement = document.getElementById('contents');
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    const downArrow = document.querySelector('.down-arrow') as HTMLElement;
    if (downArrow) {
      downArrow.addEventListener('click', handleDownArrowClick);
      return () => downArrow.removeEventListener('click', handleDownArrowClick);
    }
  }, []);

  const startSliderTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNextSlide();
      }
    }, 7000); // Keep 7000ms delay between slides
  };

  const pauseSliderTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    
    // Reset animation state after transition completes
    // Use 5000ms to match the data-masterspeed for the full animation duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 5000); 
    
    // Restart the timer
    startSliderTimer();
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    
    // Reset animation state after transition completes
    // Use 5000ms to match the data-masterspeed for the full animation duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 5000);
    
    // Restart the timer
    startSliderTimer();
  };

  return (
    <div className={styles.layout} id="hero">
      <main className={styles.main}>
        <div 
          className={styles.arrowLeft} 
          onClick={handlePrevSlide}
          onMouseEnter={pauseSliderTimer}
          onMouseLeave={startSliderTimer}
        ></div>
        <div 
          className={styles.arrowRight} 
          onClick={handleNextSlide}
          onMouseEnter={pauseSliderTimer}
          onMouseLeave={startSliderTimer}
        ></div>
        
        <div className={styles.revSliderWrapper}>
          <div 
            id="rev_slider" 
            className={styles.revSlider}
            ref={sliderRef}
            onMouseEnter={pauseSliderTimer}
            onMouseLeave={startSliderTimer}
          >
            <ul>
              {slides.map((slide, index) => (
                <li
                  key={index}
                  className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                  data-transition="slotzoom-horizontal"
                  data-slotamount="7"
                  data-masterspeed="5000"
                  data-fsmasterspeed="5000"
                  style={{ display: index === currentSlide ? 'block' : 'none' }}
                >
                  {/* Original background image (hidden but used for fallback) */}
                  <img
                    src={slide.imageUrl}
                    alt=""
                    className={styles.revSlidebg}
                    data-bgposition="center center"
                    data-bgfit="cover"
                    data-bgrepeat="no-repeat"
                    style={{ opacity: 0.1 }} /* Slightly visible as fallback */
                  />
                  
                  {/* Slot-based animation wrapper */}
                  <div className={styles.slotWrapper}>
                    {/* Generate 7 slots for the animation */}
                    {Array.from({ length: 7 }).map((_, slotIndex) => (
                      <div key={slotIndex} className={styles.slot}>
                        <img 
                          src={slide.imageUrl} 
                          alt="" 
                          className={styles.slotImage}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div 
                    className={`${styles.slideTitle} ${styles.tpCaption} ${index === currentSlide ? styles.animateTitle : ''}`}
                    data-x="right"
                    data-hoffset="-18"
                    data-y="middle"
                    data-voffset="-35"
                  >
                    <div className={styles.titleContainer}>
                      {index === currentSlide ? splitTextIntoChars(slide.title) : slide.title}
                    </div>
                  </div>
                  <div 
                    className={`${styles.slideSubtitle} ${styles.tpCaption} ${index === currentSlide ? styles.animateSubtitle : ''}`}
                    data-x="right"
                    data-hoffset="0"
                    data-y="middle"
                    data-voffset="75"
                  >
                    {slide.subtitle}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
