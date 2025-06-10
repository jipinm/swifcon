import { useState } from 'react';
import styles from './GetInTouch.module.css';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setShowSuccess(true);
    setShowError(false);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section className={`${styles.contacts} ${styles.section}`}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Get <span className={styles.textPrimary}>in touch</span>
          </h2>
          <strong className={styles.fadeTitleRight}>contacts</strong>
        </header>
        <div className={styles.sectionContent}>
          <div className={`${styles.rowBase} ${styles.row}`}>
            <div className={`${styles.colAddress} ${styles.colBase} ${styles.colMd4}`}>
              <i className="fa fa-phone"></i> +91 471 2312772 <br />
              <i className="fa fa-envelope"></i> <a href="mailto:info@swifcon.com">info@swifcon.com</a> <br />
              <i className="fa fa-home"></i> Swifcon Pvt. Ltd. <br />
              TC 24/330, ARA-42, <br />
              Ambalamukku, Kowdiar.P.O, <br />
              Thiruvananthapuram, Kerala 695003
            </div>
            <div className={`${styles.colBase} ${styles.colMd8}`}>
              <div className={styles.alert} style={{ display: showSuccess ? 'block' : 'none' }}>
                <button type="button" className={styles.close} onClick={() => setShowSuccess(false)}>×</button>
                Thank you! Your message has been sent successfully.
              </div>
              <form className={styles.jsAjaxForm} onSubmit={handleSubmit}>
                <div className={`${styles.rowField} ${styles.row}`}>
                  <div className={`${styles.colField} ${styles.colSm6} ${styles.colMd4}`}>
                    <div className={styles.formGroup}>
                      <input 
                        type="text" 
                        className={styles.formControl} 
                        name="name" 
                        placeholder="Name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input 
                        type="email" 
                        className={styles.formControl} 
                        name="email" 
                        placeholder="Email *" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className={`${styles.colField} ${styles.colSm6} ${styles.colMd4}`}>
                    <div className={styles.formGroup}>
                      <input 
                        type="tel" 
                        className={styles.formControl} 
                        name="phone" 
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input 
                        type="text" 
                        className={styles.formControl} 
                        name="subject" 
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className={`${styles.colField} ${styles.colSm12} ${styles.colMd4}`}>
                    <div className={styles.formGroup}>
                      <textarea 
                        className={`${styles.formControl} ${styles.textarea}`} 
                        name="message" 
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className={`${styles.colMessage} ${styles.colField} ${styles.colSm12}`}>
                    <div className={styles.formGroup}>
                      <div className={`${styles.successMessage} ${showSuccess ? styles.show : ''}`}>
                        <i className="fa fa-check text-primary"></i> Thank you!. Your message is successfully sent...
                      </div>
                      <div className={`${styles.errorMessage} ${showError ? styles.show : ''}`}>
                        We're sorry, but something went wrong
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.formSubmit} ${styles.textRight}`}>
                  <button type="submit" className={`${styles.btn} ${styles.btnShadow2}`}>
                    Send <i className={styles.iconNext}></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
