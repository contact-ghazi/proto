import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Clock, Award, Globe, Zap, Target } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const tryAbout = () => {
  const { darkMode } = useSelector((state) => state.ui);
  
  // Scroll animations
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);

  return (
    <>
      <Helmet>
        <title>About ADVOCATE AI - Our Vision & Mission</title>
        <meta name="description" content="Learn about our founder's vision and the story behind ADVOCATE AI's innovative platform." />
      </Helmet>

      <div className="min-h-screen bg-black" ref={containerRef}>
        {/* Parallax background elements */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-20 left-10 w-20 h-20 bg-gray-800/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
        </motion.div>
        
        {/* Hero Section */}
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center relative">
            {/* Back Button positioned on the left */}
            <div className="absolute left-0 top-0 z-10">
              <Link 
                to="/" 
                className="inline-flex items-center px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-600/20"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
              About Our Company
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
              We are pioneering the future of legal consultation by connecting individuals and businesses 
              with experienced, qualified lawyers through our innovative JuriSnap platform, ensuring 
              quality legal expertise is accessible when needed most.
            </p>
          </div>
        </motion.div>

        {/* Founder Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Founder Image */}
            <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800/20 to-black/20 p-2">
                <img 
                  src="/src/assets/founder.jpeg" 
                  alt="Taj Huzaifa - Founder & CEO" 
                  className="w-auto max-w-[280px] sm:max-w-xs h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Founder Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Meet Our Founder
                </h2>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">
                  Taj Huzaifa
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">
                  Founder & CEO
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  With over 15 years of distinguished experience in artificial intelligence and software engineering, 
                  Mr. Huzaifa has dedicated his distinguished career to advancing technology accessibility 
                  and human-centered design principles. His visionary leadership and unwavering commitment 
                  to innovation drive our organization's mission to revolutionize how individuals access 
                  legal expertise and professional consultation.
                </p>
                
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Prior to establishing this distinguished organization, Mr. Huzaifa served as a leading 
                  authority in AI research teams at prominent technology corporations and has been 
                  internationally recognized for his pioneering contributions to natural language processing 
                  and machine learning technologies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gray-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Our Vision
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
                To democratize access to premium legal expertise by connecting individuals and businesses 
                with experienced, qualified lawyers through our innovative JuriSnap platform, ensuring 
                that quality legal consultation is accessible, affordable, and available when needed most.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Expert Lawyers
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Connect with verified, experienced legal professionals across all practice areas 
                  with proven track records and specialized expertise.
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Instant Access
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Get immediate legal consultation within hours, not days. Our platform ensures 
                  rapid response times for urgent legal matters.
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Secure & Confidential
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Bank-level encryption and attorney-client privilege protection ensure your 
                  legal matters remain completely confidential and secure.
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Specialized Expertise
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Access lawyers with deep expertise in specific legal areas including corporate law, 
                  criminal defense, family law, and more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                  Our Mission
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    We are committed to bridging the gap between legal expertise and those who need it most. 
                    Our mission is to provide immediate access to qualified legal professionals through 
                    our innovative JuriSnap platform, ensuring that quality legal consultation is not 
                    just a privilege for the few, but a right accessible to all.
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    By leveraging cutting-edge technology and maintaining the highest standards of 
                    professional integrity, we create a seamless connection between clients and lawyers, 
                    making legal expertise available 24/7 with the click of a button.
                  </p>
                </div>
              </div>

              <div className="relative mt-8 lg:mt-0">
                <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Promise</h3>
                  <p className="text-base sm:text-lg mb-4 sm:mb-6">
                    "We are not merely connecting clients with lawyers; we are democratizing access to 
                    legal expertise. Every consultation we facilitate, every lawyer we verify, is guided 
                    by our unwavering commitment to ensuring that quality legal advice is accessible, 
                    affordable, and available when you need it most."
                  </p>
                  <div className="text-right">
                    <p className="font-semibold text-sm sm:text-base">- Taj Huzaifa</p>
                    <p className="text-gray-300 text-sm sm:text-base">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Tiles */}
        <div className="bg-gray-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Why Choose JuriSnap?
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
                Experience the future of legal consultation with our comprehensive platform
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Verified Professionals
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  All lawyers on our platform are thoroughly vetted, licensed, and have proven 
                  track records in their respective practice areas.
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Global Reach
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Access legal expertise from anywhere in the world. Our platform connects you 
                  with lawyers regardless of geographical boundaries.
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Get connected with a qualified lawyer within minutes. Our intelligent matching 
                  system ensures the perfect lawyer-client pairing.
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Complete Privacy
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Your legal matters remain completely confidential. We use enterprise-grade 
                  security to protect your sensitive information.
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Diverse Expertise
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  From corporate law to family matters, criminal defense to intellectual property, 
                  we have experts in every legal field.
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 rounded-lg bg-gray-800">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  24/7 Availability
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Legal emergencies don't wait for business hours. Our platform is available 
                  round the clock to connect you with legal help when you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default tryAbout;

 