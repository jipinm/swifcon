

const About = () => {
  return (
    <div className="about-container" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Oswald, sans-serif', textAlign: 'center', marginBottom: '2rem' }}>
        About <span style={{ color: '#db6766' }}>Swifcon</span>
      </h1>
      
      <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
        <p>
          Swifcon is a leading construction company with over 15 years of experience in delivering exceptional 
          building solutions across multiple industries. Our commitment to quality, innovation, and sustainability 
          has established us as a trusted partner for clients seeking reliable construction services.
        </p>
        
        <h2 style={{ fontFamily: 'Oswald, sans-serif', marginTop: '2rem', color: '#333' }}>Our Mission</h2>
        <p>
          To deliver construction projects that exceed client expectations through innovative solutions, 
          quality craftsmanship, and sustainable practices while maintaining the highest standards of safety 
          and professionalism.
        </p>
        
        <h2 style={{ fontFamily: 'Oswald, sans-serif', marginTop: '2rem', color: '#333' }}>Our Vision</h2>
        <p>
          To be the most trusted and respected construction company, recognized for our excellence in 
          project delivery, innovative approaches, and commitment to building a sustainable future.
        </p>
        
        <h2 style={{ fontFamily: 'Oswald, sans-serif', marginTop: '2rem', color: '#333' }}>Our Values</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem' }}>
          <li><strong>Quality:</strong> We are committed to delivering the highest quality in every project.</li>
          <li><strong>Integrity:</strong> We conduct our business with honesty, transparency, and ethical standards.</li>
          <li><strong>Innovation:</strong> We embrace new technologies and methodologies to improve our services.</li>
          <li><strong>Sustainability:</strong> We prioritize environmentally responsible practices in all our operations.</li>
          <li><strong>Safety:</strong> We maintain rigorous safety standards to protect our team and clients.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
