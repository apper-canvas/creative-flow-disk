import { motion } from 'framer-motion';
import ProjectGallery from '@/components/organisms/ProjectGallery';

const Projects = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="container-padding section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my collection of design and development projects that showcase innovation, creativity, and technical expertise.
          </p>
        </motion.div>
        
        <ProjectGallery />
      </div>
    </div>
  );
};

export default Projects;