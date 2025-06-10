import styles from './Partners.module.css';

const Partners = () => {
  const partnerLogos = [
    {
      src: '/assets/images/accreditation/chamber-of-commerce.png',
      alt: 'Chamber of Commerce - Thiruvananthapuram'
    },
    {
      src: '/assets/images/accreditation/igbc-member.png',
      alt: 'IGBC - Member'
    },
    {
      src: '/assets/images/accreditation/cii-logo.png',
      alt: 'Confederation of Indian Industry'
    },
    {
      src: '/assets/images/accreditation/pmi-member.png',
      alt: 'Member- Project Management Institute'
    },
    {
      src: '/assets/images/accreditation/ashrae-web.png',
      alt: 'ASHRAE Member'
    }
  ];

  return (
    <section className={`${styles.clients} ${styles.section}`}>
      <div className={styles.container}>
        <div className={styles.sectionContent}>
          <div className={styles.partnersGrid}>
            <div className={styles.partnersRow}>
              {/* First set of logos */}
              {partnerLogos.map((logo, index) => (
                <div key={`partner-1-${index}`} className={styles.partnerCard}>
                  <img alt={logo.alt} src={logo.src} className={styles.partnerLogo} />
                </div>
              ))}
              
              {/* Duplicate logos for continuous scrolling */}
              {partnerLogos.map((logo, index) => (
                <div key={`partner-2-${index}`} className={styles.partnerCard}>
                  <img alt={logo.alt} src={logo.src} className={styles.partnerLogo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
