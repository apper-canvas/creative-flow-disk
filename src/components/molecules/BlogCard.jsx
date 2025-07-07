import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const BlogCard = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/blog/${post.Id}`}>
        <article className="card p-0 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <ApperIcon name="Calendar" size={16} />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <ApperIcon name="Clock" size={16} />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="default" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default BlogCard;