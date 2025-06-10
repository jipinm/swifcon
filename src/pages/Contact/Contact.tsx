

const Contact = () => {
  return (
    <div className="contact-container" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Oswald, sans-serif', textAlign: 'center', marginBottom: '2rem' }}>
        Contact <span style={{ color: '#db6766' }}>Us</span>
      </h1>
      
      <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          We'd love to hear from you. Please fill out the form below or use our contact information to get in touch.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 400px' }}>
            <form>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                <input 
                  type="text" 
                  id="name" 
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    fontSize: '1rem'
                  }} 
                  placeholder="Your Name"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                <input 
                  type="email" 
                  id="email" 
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    fontSize: '1rem'
                  }} 
                  placeholder="Your Email"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }} 
                  placeholder="Your Message"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                style={{ 
                  backgroundColor: '#db6766', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '4px', 
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', marginTop: '0', color: '#333' }}>Contact Information</h3>
            <p><strong>Address:</strong> 123 Construction Way, Building City, BC 12345</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Email:</strong> info@swifcon.com</p>
            <p><strong>Hours:</strong> Monday - Friday: 8:00 AM - 6:00 PM</p>
            
            <h3 style={{ fontFamily: 'Oswald, sans-serif', marginTop: '2rem', color: '#333' }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#db6766', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>FB</div>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#db6766', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>TW</div>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#db6766', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>IG</div>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#db6766', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>LI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
