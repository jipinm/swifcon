import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../Industries/IndustryProjects';
import styles from './Projects.module.css';

interface ProjectParams {
  industryId: string;
  projectId: string;
}

const ProjectDetails = () => {
  const { industryId, projectId } = useParams<{ industryId: string, projectId: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Find the project data
  const project = industryId && projectId 
    ? projectsData[industryId]?.find(p => p.id === projectId) 
    : null;
  
  // Redirect to industries page if project not found
  useEffect(() => {
    if (!project) {
      navigate('/industries');
    }
  }, [project, navigate]);

  if (!project) {
    return <div className={styles.loadingContainer}>Loading project details...</div>;
  }

  // Handle gallery navigation
  const handlePrevImage = () => {
    if (project.gallery && project.gallery.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.gallery!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (project.gallery && project.gallery.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === project.gallery!.length - 1 ? 0 : prev + 1
      );
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
    <div className={styles.projectDetailsContainer}>
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to="/industries" className={styles.breadcrumbLink}>Industries</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to={`/industries#${industryId}`} className={styles.breadcrumbLink}>
          {formatIndustryName(industryId || '')}
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{project.title}</span>
      </div>

      {/* Project Header */}
      <motion.div 
        className={styles.projectHeader}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.projectTitle}>{project.title}</h1>
        <div className={styles.projectMeta}>
          <div className={styles.projectLocation}>
            <span className={styles.locationIcon}>📍</span> {project.location}
          </div>
          <div className={styles.projectIndustry}>
            Industry: {formatIndustryName(industryId || '')}
          </div>
        </div>
      </motion.div>

      {/* Feature Image */}
      <motion.div 
        className={styles.featureImage}
        style={{ backgroundImage: `url(${project.imageUrl})` }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={styles.imageOverlay}></div>
      </motion.div>

      {/* Project Description */}
      <motion.div 
        className={styles.projectDescription}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className={styles.sectionTitle}>Project Overview</h2>
        <p>{project.fullDescription || project.description}</p>
      </motion.div>

      {/* Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <motion.div 
          className={styles.gallerySection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className={styles.sectionTitle}>Project Gallery</h2>
          <div className={styles.gallery}>
            <div className={styles.mainGalleryImage}>
              <img 
                src={project.gallery[currentImageIndex]} 
                alt={`${project.title} - Image ${currentImageIndex + 1}`} 
              />
              <div className={styles.galleryControls}>
                <button 
                  onClick={handlePrevImage} 
                  className={styles.galleryControl}
                  aria-label="Previous image"
                >
                  &#10094;
                </button>
                <span className={styles.galleryCounter}>
                  {currentImageIndex + 1} / {project.gallery.length}
                </span>
                <button 
                  onClick={handleNextImage} 
                  className={styles.galleryControl}
                  aria-label="Next image"
                >
                  &#10095;
                </button>
              </div>
            </div>
            <div className={styles.thumbnailContainer}>
              {project.gallery.map((image, index) => (
                <div 
                  key={index}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image} alt={`${project.title} - Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Video Section */}
      {project.videoUrl && (
        <motion.div 
          className={styles.videoSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className={styles.sectionTitle}>Project Video</h2>
          <div className={styles.videoContainer}>
            <iframe
              src={project.videoUrl}
              title={`${project.title} Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      )}

      {/* Related Projects */}
      <motion.div 
        className={styles.relatedProjects}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className={styles.sectionTitle}>More Projects in {formatIndustryName(industryId || '')}</h2>
        <div className={styles.relatedProjectsGrid}>
          {projectsData[industryId || '']
            ?.filter(p => p.id !== projectId)
            .slice(0, 3)
            .map((relatedProject, index) => (
              <motion.div
                key={index}
                className={styles.relatedProjectCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                onClick={() => navigate(`/projects/${industryId}/${relatedProject.id}`)}
              >
                <div 
                  className={styles.relatedProjectImage} 
                  style={{ backgroundImage: `url(${relatedProject.imageUrl})` }}
                >
                  <div className={styles.projectImageOverlay}></div>
                </div>
                <div className={styles.relatedProjectContent}>
                  <h3 className={styles.relatedProjectTitle}>{relatedProject.title}</h3>
                  <p className={styles.relatedProjectLocation}>
                    <span className={styles.locationIcon}>📍</span> {relatedProject.location}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
        <div className={styles.viewAllContainer}>
          <button 
            onClick={() => navigate(`/projects?industry=${industryId}`)}
            className={styles.viewAllButton}
          >
            View All Projects
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
