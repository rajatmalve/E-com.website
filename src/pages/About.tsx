import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Leaf } from 'lucide-react';

export default function About() {
  const stats = [
    { number: '25+', label: 'Years of Experience' },
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Countries Served' },
    { number: '1M+', label: 'Paper Rolls Produced' }
  ];

  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in our manufacturing processes to ensure premium quality products.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do. We strive to exceed expectations every day.'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Reach',
      description: 'With distribution networks worldwide, we serve customers across multiple continents.'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Sustainability',
      description: 'We are committed to environmental responsibility and sustainable manufacturing practices.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            About Poscho
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Leading the paper industry with innovation, quality, and sustainability for over 25 years
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Founded in 1998, Poscho began as a small family business with a simple mission: 
                  to provide high-quality paper products to local businesses. Over the decades, 
                  we've grown into a global leader in paper manufacturing.
                </p>
                <p>
                  Our commitment to innovation and quality has driven us to develop cutting-edge 
                  manufacturing processes that produce superior paper rolls while maintaining 
                  environmental responsibility.
                </p>
                <p>
                  Today, we serve over 10,000 customers worldwide, from small local businesses 
                  to Fortune 500 companies, all while staying true to our founding values of 
                  quality, integrity, and customer service.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                alt="Poscho manufacturing facility"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our business and drive our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The experienced team driving Poscho's continued success and innovation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Chief Executive Officer',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
                bio: '15+ years leading manufacturing companies with a focus on sustainable practices.'
              },
              {
                name: 'Michael Chen',
                role: 'Head of Manufacturing',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                bio: 'Expert in paper production with 20+ years optimizing manufacturing processes.'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Director of Sales',
                image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
                bio: 'Building strong customer relationships and expanding global market presence.'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.4 }}
                whileHover={{ y: -5 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}