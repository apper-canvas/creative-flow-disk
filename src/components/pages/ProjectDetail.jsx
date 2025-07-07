import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ImageGallery from '@/components/molecules/ImageGallery';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import projectService from '@/services/api/projectService';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProject = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await projectService.getById(id);
      setProject(data);
    } catch (err) {
      setError(err.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProject} />;
  if (!project) return <Error message="Project not found" />;

  return (
    <div className="min-h-screen pt-20">
      <div className="container-padding section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/projects')}
            className="mb-8"
          >
            <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
            Back to Projects
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Project Images */}
            <div>
              <ImageGallery images={project.images} title={project.title} />
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="primary">{project.category}</Badge>
                  {project.featured && (
                    <Badge variant="accent">Featured</Badge>
                  )}
                </div>
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {project.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Client</h3>
                  <p className="text-gray-600 dark:text-gray-400">{project.client}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Date</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(project.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="default">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full">
                      <ApperIcon name="ExternalLink" size={16} className="mr-2" />
                      View Live Project
                    </Button>
                  </a>
                )}
                <Link to="/contact" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ApperIcon name="MessageCircle" size={16} className="mr-2" />
                    Discuss Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;