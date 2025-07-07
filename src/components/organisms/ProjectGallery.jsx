import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/molecules/ProjectCard';
import ProjectFilter from '@/components/molecules/ProjectFilter';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import projectService from '@/services/api/projectService';

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await projectService.getAll();
      setProjects(data);
      setFilteredProjects(data);
      setCategories(projectService.getCategories());
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory, projects]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProjects} />;
  if (projects.length === 0) return <Empty message="No projects found" />;

  return (
    <div className="space-y-12">
      <ProjectFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.Id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <Empty message={`No projects found in ${activeCategory} category`} />
      )}
    </div>
  );
};

export default ProjectGallery;