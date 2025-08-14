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
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const features = [
    { icon: <Truck className="h-8 w-8" />, title: 'Free Delivery', description: 'Fast and free delivery on orders over $50', color: 'from-blue-500 to-blue-600' },
    { icon: <Shield className="h-8 w-8" />, title: 'Secure Payment', description: '100% secure payment processing', color: 'from-green-500 to-green-600' },
    { icon: <Award className="h-8 w-8" />, title: 'Quality Guarantee', description: 'Premium products with quality assurance', color: 'from-purple-500 to-purple-600' },
    { icon: <Users className="h-8 w-8" />, title: '24/7 Support', description: 'Round the clock customer support', color: 'from-orange-500 to-orange-600' },
  ];

  const categories = [
    { name: "Electronics", image: "https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg", count: "500+ Products", color: "from-blue-500 to-blue-600" },
    { name: "Fashion", image: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg", count: "1000+ Products", color: "from-pink-500 to-pink-600" },
    { name: "Home & Garden", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", count: "300+ Products", color: "from-green-500 to-green-600" },
    { name: "Sports", image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg", count: "200+ Products", color: "from-red-500 to-red-600" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Fashion Blogger", content: "Amazing quality products and super fast delivery. BoltStore is my go-to for all shopping needs!", rating: 5, avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
    { name: "Mike Chen", role: "Tech Enthusiast", content: "Best prices on electronics and excellent customer service. Highly recommended!", rating: 5, avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" },
    { name: "Emma Davis", role: "Interior Designer", content: "Beautiful home decor items with premium quality. Love shopping here!", rating: 5, avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden hero-gradient">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
            <div className="absolute inset-0 animated-bg opacity-80"></div>
            <img src={heroSlides[currentSlide].image} alt={heroSlides[currentSlide].title} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <motion.div key={`content-${currentSlide}`} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2 opacity-90">{heroSlides[currentSlide].subtitle}</h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">{heroSlides[currentSlide].title}</h1>
              <p className="text-base sm:text-lg md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90">{heroSlides[currentSlide].description}</p>
              <Link to={heroSlides[currentSlide].buttonLink} className="inline-flex items-center px-8 py-4 glass text-white font-bold rounded-full hover:scale-105 transition-all duration-300 transform shadow-2xl border border-white/20 hover:bg-white/20">
                {heroSlides[currentSlide].buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`} />
          ))}
        </div>

        {/* Carousel Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300">
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300">
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </section>

      {/* Seasonal Banners */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
              title: 'Spring Sale',
              subtitle: 'Up to 40% off',
              image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg'
            }, {
              title: 'Summer Essentials',
              subtitle: 'Beat the heat',
              image: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg'
            }, {
              title: 'Festive Deals',
              subtitle: 'Gifts they love',
              image: 'https://images.pexels.com/photos/1303091/pexels-photo-1303091.jpeg'
            }].map((b, i) => (
              <motion.div key={i} className="relative overflow-hidden rounded-2xl shadow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <img src={b.image} alt={b.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold">{b.title}</h3>
                  <p className="opacity-90">{b.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-10" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured <span className="gradient-text-primary">Products</span>
            </h2>
            <p className="text-gray-600 mt-3">Handpicked items just for you</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl shadow-sm bg-gradient-to-r from-white to-gray-50 border"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                viewport={{ once: true }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feat.color} text-white mb-4`}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feat.title}</h3>
                <p className="text-gray-600 mt-1 text-sm">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Shop by <span className="gradient-text-primary">Category</span></h2>
            <Link to="/products" className="hidden md:inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">View all <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                className="relative overflow-hidden rounded-2xl group shadow"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                viewport={{ once: true }}
              >
                <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-gray-900 mb-2">{cat.count}</span>
                  <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                </div>
                <Link to={`/products?category=${encodeURIComponent(cat.name.toLowerCase())}`} className="absolute inset-0" aria-label={cat.name}></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-10" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What our <span className="gradient-text-primary">Customers</span> say</h2>
            <p className="text-gray-600 mt-3">Trusted by thousands of happy shoppers</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl border bg-white shadow-sm"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">“{t.content}”</p>
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white/10 border border-white/20 p-10 text-center text-white">
            <h3 className="text-3xl font-bold mb-3">Join thousands of smart shoppers</h3>
            <p className="opacity-90 mb-6">Get updates on new arrivals, exclusive deals, and more.</p>
            <Link to="/products" className="inline-flex items-center px-6 py-3 glass text-white font-semibold rounded-xl">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}



