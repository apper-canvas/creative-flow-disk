import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Blog from "@/components/pages/Blog";
import blogService from "@/services/api/blogService";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPost = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await blogService.getById(id);
      setPost(data);
    } catch (err) {
      setError(err.message || 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPost} />;
  if (!post) return <Error message="Blog post not found" />;

  return (
    <div className="min-h-screen pt-20">
    <div className="container-padding section-padding">
        <motion.article
            initial={{
                opacity: 0,
                y: 30
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.8
            }}
            className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" onClick={() => navigate("/blog")} className="mb-8">
                <ApperIcon name="ArrowLeft" size={16} className="mr-2" />Back to Blog
                          </Button>
            {/* Featured Image */}
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            {/* Article Header */}
            <header className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <ApperIcon name="Calendar" size={16} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <ApperIcon name="Clock" size={16} />
                            <span>{post.read_time}min read</span>
                            <div
                                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <ApperIcon name="User" size={16} />
                                <span>{post.author}</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {(post.Tags ? post.Tags.split(",") : []).map((tag, index) => <Badge key={index} variant="primary">{tag.trim()}</Badge>)}
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div></div></header>
            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
                <div
                    className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                    {post.content}
                </div>
            </div>
            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ApperIcon name="Heart" size={16} className="text-primary" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Thank you for reading!
                                            </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
                        <Button variant="ghost" size="sm">
                            <ApperIcon name="Twitter" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <ApperIcon name="Linkedin" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <ApperIcon name="Facebook" size={16} />
                        </Button>
                    </div>
                </div>
            </footer>
        </motion.article>
    </div>
</div>
  );
};

export default BlogPost;