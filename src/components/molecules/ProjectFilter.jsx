import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const ProjectFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-3 justify-center mb-12"
    >
      <Button
        variant={activeCategory === 'all' ? 'primary' : 'ghost'}
        onClick={() => onCategoryChange('all')}
        size="sm"
      >
        All Projects
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'primary' : 'ghost'}
          onClick={() => onCategoryChange(category)}
          size="sm"
        >
          {category}
        </Button>
      ))}
    </motion.div>
  );
};

export default ProjectFilter;