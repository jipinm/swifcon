import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Industries.module.css';

interface ProjectProps {
  industryId: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  fullDescription?: string;
  gallery?: string[];
  videoUrl?: string;
}

// Sample project data for each industry
const projectsData: Record<string, ProjectItem[]> = {
  healthcare: [
    {
      id: 'city-general-hospital',
      title: 'City General Hospital Expansion',
      description: 'A 50,000 sq ft expansion of the existing hospital facility including new operating theaters and patient rooms.',
      location: 'Mumbai, India',
      imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The City General Hospital Expansion project involved adding a new wing to the existing facility, increasing capacity by 120 beds and adding 6 state-of-the-art operating theaters. The project included specialized medical gas systems, HVAC designed for infection control, and integration with existing hospital infrastructure. The design prioritized patient comfort while maximizing operational efficiency for medical staff.',
      gallery: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80'],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'medical-research-center',
      title: 'Medical Research Center',
      description: 'State-of-the-art research facility with specialized laboratories and clean rooms.',
      location: 'Bangalore, India',
      imageUrl: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The Medical Research Center project delivered a cutting-edge facility designed to support advanced medical research. The building features ISO-certified clean rooms, specialized laboratory spaces with precise environmental controls, and collaborative areas for researchers. The facility meets international standards for biosafety and includes sustainable design elements to minimize environmental impact.',
      gallery: ['https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80']
    },
    {
      id: 'community-health-clinic',
      title: 'Community Health Clinic',
      description: 'Modern outpatient facility designed for efficient patient flow and comfort.',
      location: 'Delhi, India',
      imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The Community Health Clinic was designed to serve a densely populated urban area with accessible healthcare services. The facility includes consultation rooms, diagnostic imaging, a pharmacy, and preventive care services. The design emphasizes natural lighting, intuitive wayfinding, and a calming atmosphere to enhance the patient experience while maximizing the efficiency of healthcare delivery.'
    }
  ],
  hospitality: [
    {
      id: 'grand-plaza-hotel',
      title: 'Grand Plaza Hotel Renovation',
      description: 'Complete renovation of a 200-room luxury hotel including lobby, restaurants, and guest rooms.',
      location: 'Goa, India',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The Grand Plaza Hotel renovation transformed an aging property into a modern luxury destination. The project encompassed a complete redesign of all 200 guest rooms, renovation of public spaces including the lobby and three restaurants, and upgrading of all building systems. The design preserved the hotel\'s historic character while introducing contemporary amenities and sustainable technologies.',
      gallery: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80'],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'riverside-resort',
      title: 'Riverside Resort & Spa',
      description: 'New construction of a premium resort featuring wellness facilities and eco-friendly design.',
      location: 'Kerala, India',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The Riverside Resort & Spa is a ground-up development that harmonizes with its natural surroundings. The resort features 75 luxury villas, a comprehensive wellness center with spa facilities, and farm-to-table dining options. The project incorporated sustainable building practices including rainwater harvesting, solar power generation, and locally-sourced materials.'
    },
    {
      id: 'urban-boutique-hotel',
      title: 'Urban Boutique Hotel',
      description: 'Conversion of a historic building into a modern boutique hotel with 45 rooms.',
      location: 'Jaipur, India',
      imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'This adaptive reuse project transformed a 19th-century heritage building into a sophisticated boutique hotel. The design carefully preserved architectural elements while introducing modern amenities and technology. The 45-room hotel includes a rooftop restaurant, courtyard lounge, and art gallery showcasing local artists. The renovation addressed structural challenges while meeting contemporary building codes and sustainability standards.'
    }
  ],
  office: [
    {
      id: 'tech-park-office',
      title: 'Tech Park Office Complex',
      description: 'Modern office space for multiple IT companies with collaborative areas and advanced infrastructure.',
      location: 'Hyderabad, India',
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The Tech Park Office Complex provides 250,000 sq ft of premium workspace designed specifically for technology companies. The facility features flexible floor plans, advanced networking infrastructure, and integrated smart building systems. Common areas include collaborative spaces, conference facilities, and amenities designed to promote employee wellbeing and productivity.',
      gallery: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=800&auto=format&fit=crop&q=80']
    },
    {
      id: 'corporate-headquarters',
      title: 'Corporate Headquarters Redesign',
      description: 'Complete interior redesign for a financial services company focusing on employee wellness.',
      location: 'Mumbai, India',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'This project involved the comprehensive redesign of a 100,000 sq ft corporate headquarters for a leading financial services firm. The new design emphasizes employee wellness with ergonomic workstations, biophilic design elements, and spaces for relaxation and collaboration. The project included upgrading all building systems to improve energy efficiency and indoor air quality.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'startup-innovation-hub',
      title: 'Startup Innovation Hub',
      description: 'Flexible workspace designed for growing tech startups with modular configurations.',
      location: 'Pune, India',
      imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The Startup Innovation Hub provides 50,000 sq ft of adaptable workspace designed to accommodate the evolving needs of early-stage companies. The facility features modular office configurations, shared resources including meeting rooms and event spaces, and technical infrastructure to support rapid scaling. The design promotes cross-pollination of ideas while allowing individual companies to maintain their unique identities.'
    }
  ],
  factories: [
    {
      id: 'automotive-plant',
      title: 'Automotive Manufacturing Plant',
      description: 'Construction of a 100,000 sq ft manufacturing facility with specialized production lines.',
      location: 'Chennai, India',
      imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'This automotive manufacturing plant was designed to support precision production of vehicle components. The 100,000 sq ft facility includes automated assembly lines, quality control stations, and specialized areas for finishing processes. The building features high bay spaces with overhead cranes, reinforced flooring for heavy machinery, and advanced ventilation systems to maintain air quality.',
      gallery: ['https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1605910347035-59a2b94f2061?w=800&auto=format&fit=crop&q=80']
    },
    {
      id: 'pharmaceutical-facility',
      title: 'Pharmaceutical Production Facility',
      description: 'Clean-room manufacturing facility meeting international GMP standards.',
      location: 'Ahmedabad, India',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The pharmaceutical production facility was constructed to meet stringent international Good Manufacturing Practice (GMP) standards. The project included ISO-classified clean rooms, precise environmental control systems, and specialized utilities for pharmaceutical production. The facility design addresses regulatory compliance while optimizing operational flow and efficiency.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'cold-storage-warehouse',
      title: 'Cold Storage Warehouse',
      description: 'Temperature-controlled storage facility for food products with energy-efficient systems.',
      location: 'Punjab, India',
      imageUrl: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'This 75,000 sq ft cold storage warehouse was designed to maintain multiple temperature zones for various food products. The facility features energy-efficient refrigeration systems, thermal barriers, and automated inventory management. The design prioritized sustainability through high-performance insulation, LED lighting, and solar power integration to reduce operational costs and environmental impact.'
    }
  ],
  water: [
    {
      id: 'water-treatment-plant',
      title: 'Municipal Water Treatment Plant',
      description: 'Design and construction of a water treatment facility serving 500,000 residents.',
      location: 'Kolkata, India',
      imageUrl: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The Municipal Water Treatment Plant project delivered a comprehensive facility capable of processing 50 million gallons of water daily. The plant incorporates multiple treatment stages including sedimentation, filtration, and disinfection to ensure water quality meets all regulatory standards. The facility design includes automation systems for efficient operation and monitoring, as well as provisions for future capacity expansion.',
      gallery: ['https://images.unsplash.com/photo-1584491956253-acc0695c18b8?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1608461688104-cb12bd8feeab?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1605515298946-d037e9622dcb?w=800&auto=format&fit=crop&q=80']
    },
    {
      id: 'drainage-system-upgrade',
      title: 'Urban Drainage System Upgrade',
      description: 'Comprehensive upgrade of city stormwater management infrastructure.',
      location: 'Chennai, India',
      imageUrl: 'https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'This project involved the modernization of urban drainage infrastructure across a 25 square kilometer area. The work included replacing aging pipelines, constructing new retention basins, and implementing smart monitoring systems. The design incorporated green infrastructure elements to enhance natural water absorption and filtration, reducing the burden on mechanical systems during peak rainfall events.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'rural-water-supply',
      title: 'Rural Water Supply Network',
      description: 'Installation of water distribution system connecting 15 villages to clean water sources.',
      location: 'Rajasthan, India',
      imageUrl: 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=800&auto=format&fit=crop&q=80',
      fullDescription: 'The Rural Water Supply Network project provided reliable access to clean water for 15 villages with a combined population of 25,000. The system includes wells, pumping stations, water treatment facilities, and a distribution network spanning 75 kilometers. The design incorporated solar-powered pumping systems to ensure reliability in areas with inconsistent electricity supply and minimize operational costs.'
    }
  ]
};

// Export project data for use in other components
export { projectsData };

const IndustryProjects = ({ industryId }: ProjectProps) => {
  const navigate = useNavigate();
  const projects = projectsData[industryId] || [];

  if (projects.length === 0) {
    return null;
  }

  const handleViewProject = (industryId: string, projectId: string) => {
    navigate(`/projects/${industryId}/${projectId}`);
  };

  const handleViewAllProjects = () => {
    navigate(`/projects?industry=${industryId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className={styles.projectsSection}
    >
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Featured Projects</h3>
        <button 
          onClick={handleViewAllProjects}
          className={styles.viewAllButton}
          aria-label="View all projects in this industry"
        >
          View All Projects
        </button>
      </div>
      
      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={styles.projectCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
          >
            <div 
              className={styles.projectImage} 
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            >
              <div className={styles.projectImageOverlay}></div>
            </div>
            <div className={styles.projectContent}>
              <h4 className={styles.projectTitle}>{project.title}</h4>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectLocation}>
                <span className={styles.locationIcon}>📍</span> {project.location}
              </div>
              <button 
                onClick={() => handleViewProject(industryId, project.id)}
                className={styles.viewProjectButton}
                aria-label={`View details of ${project.title}`}
              >
                View Project
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default IndustryProjects;
