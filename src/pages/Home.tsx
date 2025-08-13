import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Truck, 
  Shield, 
  Award, 
  Users, 
  Star,
  ShoppingBag,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  Zap,
  Globe,
  Clock
} from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Hero Carousel Data
  const heroSlides = [
    {
      id: 1,
      title: "Premium Electronics",
      subtitle: "Discover the Latest Tech",
      description: "Get the newest smartphones, laptops, and gadgets with amazing deals and fast delivery",
      image: "https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg",
      buttonText: "Shop Electronics",
      buttonLink: "/products?category=electronics",
      bgGradient: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Fashion Collection",
      subtitle: "Trending Styles 2024",
      description: "Explore our curated collection of trendy fashion items for every occasion",
      image: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg",
      buttonText: "Shop Fashion",
      buttonLink: "/products?category=fashion",
      bgGradient: "from-pink-500 to-red-500"
    },
    {
      id: 3,
      title: "Home & Garden",
      subtitle: "Transform Your Space",
      description: "Create your dream home with our premium furniture and decor collection",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      buttonText: "Shop Home",
      buttonLink: "/products?category=home-garden",
      bgGradient: "from-green-500 to-teal-500"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Free Delivery',
      description: 'Fast and free delivery on orders over $50',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Payment',
      description: '100% secure payment processing',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality Guarantee',
      description: 'Premium products with quality assurance',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: '24/7 Support',
      description: 'Round the clock customer support',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const categories = [
    {
      name: "Electronics",
      image: "https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg",
      count: "500+ Products",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Fashion",
      image: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg",
      count: "1000+ Products",
      color: "from-pink-500 to-pink-600"
    },
    {
      name: "Home & Garden",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      count: "300+ Products",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Sports",
      image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg",
      count: "200+ Products",
      color: "from-red-500 to-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content: "Amazing quality products and super fast delivery. BoltStore is my go-to for all shopping needs!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      name: "Mike Chen",
      role: "Tech Enthusiast",
      content: "Best prices on electronics and excellent customer service. Highly recommended!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    },
    {
      name: "Emma Davis",
      role: "Interior Designer",
      content: "Beautiful home decor items with premium quality. Love shopping here!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden hero-gradient">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 animated-bg opacity-80"></div>
            <img 
              src={heroSlides[currentSlide].image} 
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-sm md:text-lg font-medium mb-2 opacity-90">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                {heroSlides[currentSlide].description}
              </p>
              <Link
                to={heroSlides[currentSlide].buttonLink}
                className="inline-flex items-center px-8 py-4 glass text-white font-bold rounded-full hover:scale-105 transition-all duration-300 transform shadow-2xl border border-white/20 hover:bg-white/20"
              >
                {heroSlides[currentSlide].buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Carousel Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="gradient-text-primary">BoltStore</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the highest quality products with exceptional service
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-2xl card-gradient hover:shadow-2xl transition-all duration-500 border border-gray-100"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by <span className="gradient-text-primary">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our wide range of products across different categories
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl card hover:shadow-2xl transition-all duration-500"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-purple-600 opacity-80"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
                <div className="p-6">
                  <Link
                    to={`/products?category=${category.name.toLowerCase()}`}
                    className="inline-flex items-center gradient-text-primary font-semibold hover:scale-105 transition-all duration-300 group-hover:translate-x-2"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="gradient-text-primary">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 animated-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied customers and discover amazing products at unbeatable prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 glass text-white font-bold rounded-full hover:scale-105 transition-all duration-300 transform shadow-2xl border border-white/20 hover:bg-white/20"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 glass text-white font-bold rounded-full hover:scale-105 transition-all duration-300 transform shadow-2xl border border-white/20 hover:bg-white/20"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}