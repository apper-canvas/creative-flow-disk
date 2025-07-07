import Hero from '@/components/organisms/Hero';
import FeaturedProjects from '@/components/organisms/FeaturedProjects';
import BlogSection from '@/components/organisms/BlogSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProjects />
      <BlogSection />
    </div>
  );
};

export default Home;