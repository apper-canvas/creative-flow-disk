import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ message, actionText, actionLink }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="Search" size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Nothing to see here</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {message || 'No items found. Check back later or explore other sections.'}
      </p>
      {actionText && actionLink && (
        <Link to={actionLink}>
          <Button>
            {actionText}
            <ApperIcon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      )}
    </motion.div>
  );
};

export default Empty;