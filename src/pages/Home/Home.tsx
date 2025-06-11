import Hero from '../../components/Hero/Hero';
import MainContent from '../../components/MainContent/MainContent';
import WorkIndustries from '../../components/WorkIndustries/WorkIndustries';
import Testimonials from '../../components/Testimonials/Testimonials';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Hero />
      <MainContent />
      <WorkIndustries />
      <Testimonials />
    </div>
  );
};

export default Home;
