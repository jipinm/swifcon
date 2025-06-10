import styles from './Footer.module.css';

const Footer = () => {

  return (
    <>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={`${styles.rowBase} ${styles.row}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            <div className={`${styles.colBase} ${styles.textLeftMd} ${styles.footerLogo}`} style={{ display: 'flex', alignItems: 'center' }}>
              <a href="#" className={styles.brand}>
                <img src="/assets/images/logos/logo1.png" className={styles.imgResponsive} alt="Swifcon" style={{ maxHeight: '40px', display: 'block' }} />
              </a>
            </div>
            <div className={`${styles.textCenterMd} ${styles.colBase} ${styles.footerDesigned}`} style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
              Designed by
              <a href="https://gbmainframe.com/" className={styles.authorLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px' }}>
                GB Mainframe LLP
              </a>
            </div>
            <div className={`${styles.textRightMd} ${styles.colBase} ${styles.footerCopyright}`} style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
              Swifcon Pvt.Ltd © 2025. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
