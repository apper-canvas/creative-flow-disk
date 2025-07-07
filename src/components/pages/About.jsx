import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const About = () => {
  const skills = [
    { name: 'React', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'UI/UX Design', level: 88 },
    { name: 'Figma', level: 92 },
    { name: 'MongoDB', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'GraphQL', level: 78 }
  ];

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      period: '2021 - Present',
      description: 'Leading development of scalable web applications using modern technologies. Mentoring junior developers and architecting solutions for complex business requirements.'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2019 - 2021',
      description: 'Developed responsive web applications and user interfaces for various clients. Collaborated with designers to create pixel-perfect implementations.'
    },
    {
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      period: '2017 - 2019',
      description: 'Designed user interfaces and experiences for mobile and web applications. Conducted user research and usability testing to improve product design.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container-padding section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Me</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate about creating exceptional digital experiences that make a difference.
            </p>
          </div>

          {/* Profile Section */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="card p-6 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <ApperIcon name="User" size={48} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Creative Designer</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Full Stack Developer & UI/UX Designer
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="primary">Available</Badge>
                  <Badge variant="secondary">Remote</Badge>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">My Story</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    With over 5 years of experience in design and development, I've had the privilege of working 
                    with diverse clients ranging from startups to established enterprises. My journey began with 
                    a passion for creating beautiful, functional interfaces that solve real-world problems.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    I believe in the power of good design to transform businesses and improve user experiences. 
                    Whether it's crafting a seamless user interface or architecting a scalable backend solution, 
                    I approach every project with creativity, attention to detail, and a commitment to excellence.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    When I'm not coding or designing, you can find me exploring new technologies, contributing to 
                    open-source projects, or sharing my knowledge through blog posts and tutorials.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">What I Do</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Code" size={20} className="text-primary" />
                      <span>Full Stack Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Palette" size={20} className="text-primary" />
                      <span>UI/UX Design</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Smartphone" size={20} className="text-primary" />
                      <span>Mobile App Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Globe" size={20} className="text-primary" />
                      <span>Web Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Zap" size={20} className="text-primary" />
                      <span>Performance Optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Users" size={20} className="text-primary" />
                      <span>Team Leadership</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Skills & Expertise</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Experience</h3>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold">{exp.title}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <Badge variant="default" className="mt-2 sm:mt-0">
                      {exp.period}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Download Resume */}
          <div className="text-center">
            <Button size="lg" className="mb-4">
              <ApperIcon name="Download" size={20} className="mr-2" />
              Download Resume
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get a detailed overview of my experience and skills
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;