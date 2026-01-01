// pages/AboutPage.js
import React from 'react'
import { 
  Target, Heart, Shield, TrendingUp, Award, Users,
  Clock, Package, Globe, Star, Coffee, Zap,
  CheckCircle, ArrowRight, Phone, Mail 
} from 'lucide-react'
import Button from '@/components/UI/Button'

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Vincent Gashakabuhake',
      role: 'Founder & CEO',
      bio: 'Passionate about quality stationery and exceptional customer service.',
      image: '👨‍💼'
    },
    {
      name: 'Kwibuka',
      role: 'Customer Support',
      bio: 'Always ready to help with a smile.',
      image: '👨‍💻'
    },
    //     {
    //   name: 'Marie Claire',
    //   role: 'Design Specialist',
    //   bio: 'Creative designer with 5+ years in print and digital media.',
    //   image: '👩‍🎨'
    // },
    // {
    //   name: 'Jean Paul',
    //   role: 'Operations Manager',
    //   bio: 'Ensuring smooth operations and timely deliveries.',
    //   image: '👩‍💼'
    // },
  ]

  const values = [
    {
      icon: <Target size={24} />,
      title: 'Excellence',
      description: 'We deliver nothing but the best quality in every product.'
    },
    {
      icon: <Heart size={24} />,
      title: 'Passion',
      description: 'We love what we do and it shows in our work.'
    },
    {
      icon: <Shield size={24} />,
      title: 'Reliability',
      description: 'You can count on us to deliver on time, every time.'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Innovation',
      description: 'Always looking for better ways to serve our customers.'
    }
  ]

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Started with a small shop in Musanze' },
    { year: '2021', title: 'Expanded', description: 'Added digital printing services' },
    { year: '2022', title: 'Growth', description: 'Served 500+ satisfied customers' },
    { year: '2023', title: 'Innovation', description: 'Launched online ordering system' },
    { year: '2024', title: 'Vision', description: 'Expanding to nationwide delivery' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container-custom py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl mb-8">
              <span className="text-4xl">🏪</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              From a small stationery shop to Musanze's premier paper & printing destination
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => window.scrollTo({ top: document.getElementById('contact').offsetTop, behavior: 'smooth' })}
            >
              Get in Touch <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container-custom py-16 px-4">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <Target size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                <p className="text-gray-600">What drives us every day</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              To provide premium quality stationery and printing solutions that empower 
              businesses, students, and creatives to achieve their goals with tools that 
              inspire confidence and professionalism.
            </p>
            <div className="space-y-4">
              {[
                'Deliver exceptional quality in every product',
                'Provide outstanding customer service',
                'Innovate continuously to meet evolving needs',
                'Build lasting relationships with our community'
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <Globe size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                <p className="text-gray-600">Where we're heading</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              To become Rwanda's most trusted and innovative stationery brand, 
              recognized for excellence in quality, service, and customer satisfaction 
              while positively impacting our community.
            </p>
            <div className="space-y-4">
              {[
                'Expand to 5+ locations across Rwanda by 2026',
                'Launch eco-friendly product lines',
                'Develop digital solutions for modern businesses',
                'Become the go-to brand for creative professionals'
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <Zap size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            The principles that guide everything we do at GVANTO Papeterie
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <div className="text-primary-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming Musanze's favorite stationery shop
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-300 to-secondary-300 hidden lg:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-black font-bold">{milestone.year}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-700">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-primary-500 rounded-full z-10 hidden lg:block"></div>
                  
                  {/* Year on mobile */}
                  <div className="lg:hidden mt-4 mb-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{milestone.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind GVANTO Papeterie's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-8 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center text-6xl mx-auto mb-6">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-primary-900 to-secondary-800 rounded-2xl shadow-2xl p-12 text-black">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
                <div className="text-lg opacity-90">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
                <div className="text-lg opacity-90">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive stationery and printing solutions for every need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '📄',
                title: 'Office Stationery',
                description: 'Premium quality paper, notebooks, pens, and office supplies'
              },
              {
                icon: '🖨️',
                title: 'Digital Printing',
                description: 'High-quality printing services for documents, flyers, and more'
              },
              {
                icon: '🎨',
                title: 'Custom Design',
                description: 'Custom branding and design services for businesses'
              },
              {
                icon: '📦',
                title: 'Bulk Orders',
                description: 'Special pricing and service for schools and businesses'
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                description: 'Reliable delivery service across Musanze and beyond'
              },
              {
                icon: '💼',
                title: 'Business Solutions',
                description: 'Complete stationery packages for startups and enterprises'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div id="contact" className="text-center">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl shadow-xl p-12 border border-primary-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Work With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Whether you need stationery for your office, custom printing for your business, 
              or just have a question, we're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
              >
                Contact Us Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/services'}
              >
                Browse Our Services
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <a href="tel:0785383927" className="flex items-center text-gray-700 hover:text-primary-600">
                <Phone size={20} className="mr-2" />
                Call: 0785 383 927
              </a>
              <a href="mailto:gashakavinc@gmail.com" className="flex items-center text-gray-700 hover:text-primary-600">
                <Mail size={20} className="mr-2" />
                Email Us
              </a>
              <a href="https://wa.me/250785383927" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-primary-600">
                <span className="text-lg mr-2">💬</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage