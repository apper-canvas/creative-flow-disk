import { motion } from 'framer-motion';
import AdminPanel from '@/components/organisms/AdminPanel';
import ApperIcon from '@/components/ApperIcon';

const Admin = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="container-padding section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Settings" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your projects and blog content
              </p>
            </div>
          </div>
        </motion.div>

        <AdminPanel />
      </div>
    </div>
  );
};

export default Admin;