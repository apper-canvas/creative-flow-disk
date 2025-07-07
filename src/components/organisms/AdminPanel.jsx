import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Blog from "@/components/pages/Blog";
import Projects from "@/components/pages/Projects";
import projectService from "@/services/api/projectService";
import blogService from "@/services/api/blogService";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    images: '',
    featured: false,
    client: '',
    link: '',
    technologies: ''
  });

const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    read_time: 5,
    image: ''
  });
  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [projectData, blogData] = await Promise.all([
        projectService.getAll(),
        blogService.getAll()
      ]);
      setProjects(projectData);
      setBlogPosts(blogData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...projectForm,
        tags: projectForm.tags.split(',').map(tag => tag.trim()),
        images: projectForm.images.split(',').map(img => img.trim()),
        technologies: projectForm.technologies.split(',').map(tech => tech.trim())
      };

      if (isEditing) {
        await projectService.update(editingItem.Id, formattedData);
        toast.success('Project updated successfully');
      } else {
        await projectService.create(formattedData);
        toast.success('Project created successfully');
      }

      setProjectForm({
        title: '',
        description: '',
        category: '',
        tags: '',
        images: '',
        featured: false,
        client: '',
        link: '',
        technologies: ''
      });
      setIsEditing(false);
      setEditingItem(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to save project');
    }
  };

const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...blogForm,
        tags: blogForm.tags.split(',').map(tag => tag.trim()),
        readTime: parseInt(blogForm.read_time)
      };

      if (isEditing) {
        await blogService.update(editingItem.Id, formattedData);
        toast.success('Blog post updated successfully');
      } else {
        await blogService.create(formattedData);
        toast.success('Blog post created successfully');
      }

      setBlogForm({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        read_time: 5,
        image: ''
      });
      setIsEditing(false);
      setEditingItem(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to save blog post');
    }
  };

  const handleEdit = (item, type) => {
    setIsEditing(true);
    setEditingItem(item);
    
    if (type === 'project') {
      setProjectForm({
        title: item.title,
        description: item.description,
        category: item.category,
        tags: item.tags.join(', '),
        images: item.images.join(', '),
        featured: item.featured,
        client: item.client,
        link: item.link,
        technologies: item.technologies.join(', ')
      });
      setActiveTab('projects');
    } else {
setBlogForm({
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        tags: item.Tags ? item.Tags.split(',').join(', ') : '',
        read_time: item.read_time,
        image: item.image
      });
      setActiveTab('blog');
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      if (type === 'project') {
        await projectService.delete(id);
        toast.success('Project deleted successfully');
      } else {
        await blogService.delete(id);
        toast.success('Blog post deleted successfully');
      }
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to delete item');
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-4 px-2 font-medium transition-colors duration-200 ${
            activeTab === 'projects' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`pb-4 px-2 font-medium transition-colors duration-200 ${
            activeTab === 'blog' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Blog Posts
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-8">
          {/* Project Form */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-6">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <TextArea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Client</label>
                  <Input
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({...projectForm, client: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Link</label>
                  <Input
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({...projectForm, link: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <Input
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                <Input
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Images (comma-separated URLs)</label>
                <TextArea
                  value={projectForm.images}
                  onChange={(e) => setProjectForm({...projectForm, images: e.target.value})}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Project
                </label>
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  {isEditing ? 'Update Project' : 'Add Project'}
                </Button>
                {isEditing && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingItem(null);
                      setProjectForm({
                        title: '',
                        description: '',
                        category: '',
                        tags: '',
                        images: '',
                        featured: false,
                        client: '',
                        link: '',
                        technologies: ''
                      });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Existing Projects</h3>
            {projects.map((project) => (
              <motion.div
                key={project.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{project.title}</h4>
                      {project.featured && (
                        <Badge variant="primary">Featured</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="default">{project.category}</Badge>
                      {project.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Client: {project.client} | Date: {new Date(project.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(project, 'project')}
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(project.Id, 'project')}
                      className="text-error hover:text-error"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === 'blog' && (
        <div className="space-y-8">
          {/* Blog Form */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-6">
              {isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h3>
            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <TextArea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <TextArea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <Input
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
                    placeholder="Design, Development, Tutorial"
                  />
                </div>
<div>
                  <label className="block text-sm font-medium mb-2">Read Time (minutes)</label>
                  <Input
                    type="number"
                    value={blogForm.read_time}
                    onChange={(e) => setBlogForm({...blogForm, read_time: e.target.value})}
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                <Input
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({...blogForm, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  {isEditing ? 'Update Post' : 'Add Post'}
                </Button>
                {isEditing && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingItem(null);
setBlogForm({
                        title: '',
                        excerpt: '',
                        content: '',
                        tags: '',
                        read_time: 5,
                        image: ''
                      });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Blog Posts List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Existing Blog Posts</h3>
            {blogPosts.map((post) => (
              <motion.div
                key={post.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{post.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {post.excerpt}
                    </p>
<div className="flex gap-2 mb-2">
                      {(post.Tags ? post.Tags.split(',') : []).slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="default">{tag.trim()}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()} | {post.read_time} min read
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(post, 'blog')}
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(post.Id, 'blog')}
                      className="text-error hover:text-error"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;