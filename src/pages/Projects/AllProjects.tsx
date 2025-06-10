import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../Industries/IndustryProjects';
import styles from './Projects.module.css';

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

const AllProjects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  
  // Extract industry from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const industry = params.get('industry');
    setSelectedIndustry(industry);
  }, [location.search]);
  
  // Compile all projects based on filter
  useEffect(() => {
    let filteredProjects: ProjectItem[] = [];
    
    if (selectedIndustry) {
      // Filter by selected industry
      filteredProjects = projectsData[selectedIndustry] || [];
    } else {
      // Show all projects
      Object.values(projectsData).forEach(industryProjects => {
        filteredProjects = [...filteredProjects, ...industryProjects];
      });
    }
    
    setProjects(filteredProjects);
  }, [selectedIndustry]);
  
  // Handle industry filter change
  const handleIndustryChange = (industry: string | null) => {
    if (industry === selectedIndustry) {
      // Clear filter if clicking the same industry
      setSelectedIndustry(null);
      navigate('/projects');
    } else {
      setSelectedIndustry(industry);
      if (industry) {
        navigate(`/projects?industry=${industry}`);
      } else {
        navigate('/projects');
      }
    }
  };
  
  // Format industry name for display
  const formatIndustryName = (id: string) => {
    switch(id) {
      case 'healthcare': return 'Healthcare';
      case 'hospitality': return 'Hospitality';
      case 'office': return 'IT & Office Fitouts';
      case 'factories': return 'Factories & Warehouses';
      case 'water': return 'Water Supply & Sewage Lines';
      default: return id.charAt(0).toUpperCase() + id.slice(1);
    }
  };

  return (
    <div className={styles.allProjectsContainer}>
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to="/industries" className={styles.breadcrumbLink}>Industries</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>Projects</span>
        {selectedIndustry && (
          <>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{formatIndustryName(selectedIndustry)}</span>
          </>
        )}
      </div>
      
      {/* Page Header */}
      <motion.div 
        className={styles.pageHeader}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.pageTitle}>
          {selectedIndustry 
            ? `${formatIndustryName(selectedIndustry)} Projects` 
            : 'All Projects'}
        </h1>
        <p className={styles.pageDescription}>
          {selectedIndustry 
            ? `Browse our portfolio of projects in the ${formatIndustryName(selectedIndustry).toLowerCase()} sector.` 
            : 'Explore our complete portfolio of construction projects across various industries.'}
        </p>
      </motion.div>
      
      {/* Industry Filters */}
      <motion.div 
        className={styles.filterContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className={styles.filterTitle}>Filter by Industry</h2>
        <div className={styles.filterButtons}>
          <button 
            className={`${styles.filterButton} ${!selectedIndustry ? styles.activeFilter : ''}`}
            onClick={() => handleIndustryChange(null)}
          >
            All Industries
          </button>
          {Object.keys(projectsData).map((industry) => (
            <button 
              key={industry}
              className={`${styles.filterButton} ${selectedIndustry === industry ? styles.activeFilter : ''}`}
              onClick={() => handleIndustryChange(industry)}
            >
              {formatIndustryName(industry)}
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Projects Grid */}
      <motion.div 
        className={styles.projectsGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {projects.length > 0 ? (
          projects.map((project, index) => {
            // Find the industry this project belongs to
            const projectIndustry = Object.entries(projectsData).find(([_, projects]) => 
              projects.some(p => p.id === project.id)
            )?.[0] || '';
            
            return (
              <motion.div
                key={`${projectIndustry}-${project.id}`}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
              >
                <div 
                  className={styles.projectImage} 
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                >
                  <div className={styles.projectImageOverlay}></div>
                  <div className={styles.projectIndustryTag}>
                    {formatIndustryName(projectIndustry)}
                  </div>
                </div>
                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectLocation}>
                    <span className={styles.locationIcon}>📍</span> {project.location}
                  </div>
                  <button 
                    onClick={() => navigate(`/projects/${projectIndustry}/${project.id}`)}
                    className={styles.viewProjectButton}
                    aria-label={`View details of ${project.title}`}
                  >
                    View Project
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className={styles.noProjects}>
            <p>No projects found. Please try a different filter.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllProjects;
