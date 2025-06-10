

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
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

  const statVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Company stats
  const stats = [
    { number: '15+', label: 'Years of Experience' },
    { number: '500+', label: 'Projects Completed' },
    { number: '300+', label: 'Happy Clients' },
    { number: '150+', label: 'Team Members' }
  ];

  // Company values with icons
  const values = [
    { icon: 'Q', title: 'Quality', description: 'We are committed to delivering the highest quality in every project we undertake.' },
    { icon: 'I', title: 'Integrity', description: 'We conduct our business with honesty, transparency, and the highest ethical standards.' },
    { icon: 'I', title: 'Innovation', description: 'We embrace new technologies and methodologies to continuously improve our services.' },
    { icon: 'S', title: 'Sustainability', description: 'We prioritize environmentally responsible practices in all our operations.' },
    { icon: 'S', title: 'Safety', description: 'We maintain rigorous safety standards to protect our team members and clients.' }
  ];

  // Company milestones
  const milestones = [
    { year: '2008', title: 'Company Founded', text: 'Swifcon was established with a vision to provide quality construction services.' },
    { year: '2012', title: 'First Major Project', text: 'Completed our first major commercial building project worth over $10 million.' },
    { year: '2015', title: 'Expansion', text: 'Expanded operations to three new states and doubled our workforce.' },
    { year: '2018', title: 'Sustainability Focus', text: 'Launched our green building initiative and earned LEED certification.' },
    { year: '2022', title: 'Digital Transformation', text: 'Implemented advanced digital tools and BIM technology across all projects.' },
    { year: '2025', title: 'Industry Leader', text: 'Recognized as one of the top construction firms in the region.' }
  ];

  return (
    <motion.div 
      className={styles.aboutContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Breadcrumb Navigation */}
      <motion.div className={styles.breadcrumb} variants={itemVariants}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>About Us</span>
      </motion.div>
      
      <motion.h1 className={styles.pageTitle} variants={itemVariants}>
        About <span className={styles.accentColor}>Swifcon</span>
      </motion.h1>
      
      <motion.p className={styles.pageSubtitle} variants={itemVariants}>
        Swifcon is a leading construction company with over 15 years of experience in delivering exceptional 
        building solutions across multiple industries. Our commitment to quality, innovation, and sustainability 
        has established us as a trusted partner for clients seeking reliable construction services.
      </motion.p>

      {/* Stats Section */}
      <motion.div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <motion.div 
            className={styles.statItem} 
            key={index}
            variants={statVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Two Column Layout for Mission and Vision */}
      <div className={styles.twoColumnLayout}>
        <motion.div className={styles.column} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p>
            To deliver construction projects that exceed client expectations through innovative solutions, 
            quality craftsmanship, and sustainable practices while maintaining the highest standards of safety 
            and professionalism.
          </p>
        </motion.div>
        
        <motion.div className={styles.column} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Our Vision</h2>
          <p>
            To be the most trusted and respected construction company, recognized for our excellence in 
            project delivery, innovative approaches, and commitment to building a sustainable future.
          </p>
        </motion.div>
      </div>
      
      {/* Company History Timeline */}
      <motion.section className={styles.contentSection} variants={itemVariants}>
        <h2 className={styles.sectionTitle}>Our Journey</h2>
        <div className={styles.timeline}>
          {milestones.map((milestone, index) => (
            <motion.div 
              className={styles.timelineItem} 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                <p className={styles.timelineText}>{milestone.text}</p>
              </div>
              <div className={styles.timelineYear}>{milestone.year}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section className={styles.contentSection} variants={itemVariants}>
        <h2 className={styles.sectionTitle}>Our Values</h2>
        <ul className={styles.valuesList}>
          {values.map((value, index) => (
            <motion.li 
              className={styles.valueItem} 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.valueItemIcon}>{value.icon}</div>
              <div className={styles.valueItemContent}>
                <strong>{value.title}</strong>
                <p>{value.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.section>
      
      {/* CTA Section */}
      <motion.div 
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.ctaTitle}>Ready to Start Your Project?</h2>
        <p className={styles.ctaText}>
          Our team of experts is ready to help you turn your vision into reality. 
          Get in touch with us today to discuss your project requirements.
        </p>
        <Link to="/contact" className={styles.ctaButton}>
          Contact Us Today
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default About;
