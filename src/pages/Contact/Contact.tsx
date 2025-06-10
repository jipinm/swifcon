import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission with API calls
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000); // Reset after 5 seconds
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const formSectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        duration: 0.6 
      }
    }
  };

  const infoSectionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        duration: 0.6,
        delay: 0.2 
      }
    }
  };

  const mapSectionVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        delay: 0.3,
        duration: 0.7
      }
    }
  };

  return (
    <motion.div 
      className={styles.contactContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Breadcrumb Navigation */}
      <motion.div className={styles.breadcrumb} variants={itemVariants}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>Contact</span>
      </motion.div>
      
      <motion.h1 className={styles.pageTitle} variants={itemVariants}>
        Contact <span className={styles.accentColor}>Us</span>
      </motion.h1>
      
      <motion.p className={styles.pageSubtitle} variants={itemVariants}>
        We'd love to hear from you. Please fill out the form below or use our contact information to get in touch.
      </motion.p>
        
      <div className={styles.contactLayout}>
        {/* Form Section */}
        <motion.div 
          className={styles.formSection}
          variants={formSectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Name</label>
              <input 
                type="text" 
                id="name" 
                className={styles.formControl}
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
              
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <input 
                type="email" 
                id="email" 
                className={styles.formControl}
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.formLabel}>Subject</label>
              <input 
                type="text" 
                id="subject" 
                className={styles.formControl}
                placeholder="Message Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
              
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Message</label>
              <textarea 
                id="message" 
                rows={5} 
                className={`${styles.formControl} ${styles.formTextarea}`}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
              
            <motion.button 
              type="submit" 
              className={styles.submitButton}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={formSubmitted}
            >
              {formSubmitted ? 'Message Sent!' : 'Send Message'}
            </motion.button>
            
            {formSubmitted && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#4caf50', marginTop: '1rem' }}
              >
                Thank you for your message! We'll get back to you soon.
              </motion.p>
            )}
          </form>
        </motion.div>
          
        {/* Info Section */}
        <motion.div 
          className={styles.infoSection}
          variants={infoSectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Contact Information</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Address</span>
                  <p className={styles.contactValue}>123 MG Road, Thiruvananthapuram, Kerala 695001, India</p>
                </div>
              </div>
              
              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Phone</span>
                  <p className={styles.contactValue}>(555) 123-4567</p>
                </div>
              </div>
              
              <div className={styles.contactInfoItem}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Email</span>
                  <p className={styles.contactValue}>info@swifcon.com</p>
                </div>
              </div>
              
              <div className={styles.officeHours}>
                <h4 className={styles.hoursTitle}>Office Hours</h4>
                <ul className={styles.hoursList}>
                  <li className={styles.hoursItem}>
                    <span className={styles.dayName}>Monday - Friday</span>
                    <span className={styles.dayHours}>8:00 AM - 6:00 PM</span>
                  </li>
                  <li className={styles.hoursItem}>
                    <span className={styles.dayName}>Saturday</span>
                    <span className={styles.dayHours}>10:00 AM - 2:00 PM</span>
                  </li>
                  <li className={styles.hoursItem}>
                    <span className={styles.dayName}>Sunday</span>
                    <span className={styles.dayHours}>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className={styles.infoTitle}>Follow Us</h3>
            <div className={styles.socialLinks}>
              <motion.a 
                href="#" 
                className={styles.socialLink}
                whileHover={{ y: -3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}
                aria-label="Facebook"
              >
                FB
              </motion.a>
              <motion.a 
                href="#" 
                className={styles.socialLink}
                whileHover={{ y: -3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}
                aria-label="Twitter"
              >
                TW
              </motion.a>
              <motion.a 
                href="#" 
                className={styles.socialLink}
                whileHover={{ y: -3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}
                aria-label="Instagram"
              >
                IG
              </motion.a>
              <motion.a 
                href="#" 
                className={styles.socialLink}
                whileHover={{ y: -3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}
                aria-label="LinkedIn"
              >
                LI
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Full-width Map Section - Thiruvananthapuram, Kerala */}
      <motion.div
        className={styles.fullWidthMapContainer}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3 
          className={styles.mapTitle}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Our Location in Thiruvananthapuram
        </motion.h3>
        <motion.div 
          className={styles.mapSection}
          variants={mapSectionVariants}
          initial="hidden"
          animate="visible"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31628.026826004016!2d76.9366129274035!3d8.487374310984462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb805bbcd47%3A0x15439fab5c5c81cb!2sThiruvananthapuram%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sus!4v1717582609344!5m2!1sen!2sus"
            className={styles.map}
            allowFullScreen={true}
            loading="lazy"
            title="Thiruvananthapuram, Kerala Office Location"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
        <motion.p 
          className={styles.mapCaption}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          Explore the vibrant capital city of Kerala, home to historic landmarks, beautiful beaches, and our office location
        </motion.p>
        <motion.div 
          className={styles.mapHint}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <span className={styles.mapHintIcon}>ⓘ</span> 
          <span>Use mouse wheel to zoom or click and drag to move around the map</span>
        </motion.div>
        <motion.a 
          href="https://www.google.com/maps/place/Thiruvananthapuram,+Kerala,+India/@8.4873743,76.9366129,14z/data=!3m1!4b1!4m6!3m5!1s0x3b05bbb805bbcd47:0x15439fab5c5c81cb!8m2!3d8.4883446!4d76.9473894!16zL20vMDE2ODR5?entry=ttu"
          className={styles.viewLargerMap}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          View Larger Map
        </motion.a>
      </motion.div>
      
      {/* CTA Section */}
      <motion.div 
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className={styles.ctaTitle}>Ready to Start Your Project?</h2>
        <p className={styles.ctaText}>
          Our team of experts is ready to help you turn your vision into reality. 
          Get in touch with us today to discuss your project requirements.
        </p>
        <Link to="/services" className={styles.ctaButton}>
          Explore Our Services
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
