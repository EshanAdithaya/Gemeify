import React from 'react';
import { 
  Shield, 
  Award, 
  Globe2, 
  Users,
  Star,
  Heart,
  MessageSquare,
  Package,
  MapPin,
  Mail,
  Phone,
  Clock
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { label: 'Years of Experience', value: '25+' },
    { label: 'Certified Gems', value: '10K+' },
    { label: 'Happy Clients', value: '50K+' },
    { label: 'Countries Served', value: '120+' }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: 'Authenticity Guaranteed',
      description: 'Every gem in our collection is thoroughly authenticated and certified by leading gemological laboratories.'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-400" />,
      title: 'Expert Curation',
      description: 'Our team of gemologists carefully selects each stone for its quality, rarity, and beauty.'
    },
    {
      icon: <Globe2 className="w-8 h-8 text-purple-400" />,
      title: 'Global Sourcing',
      description: 'We work directly with mines and trusted suppliers worldwide to bring you the finest gems.'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: 'Customer First',
      description: 'We provide personalized service and expert guidance throughout your gem-buying journey.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Chief Gemologist',
      image: '/api/placeholder/400/400',
      credentials: 'Ph.D. in Gemology, GIA Graduate',
      description: 'With over 15 years of experience in gem identification and grading.'
    },
    {
      name: 'James Chen',
      role: 'Head of Acquisitions',
      image: '/api/placeholder/400/400',
      credentials: 'FGA, DGA',
      description: 'Expert in sourcing rare and exceptional gemstones from across the globe.'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Quality Assurance Director',
      image: '/api/placeholder/400/400',
      credentials: 'MSc Geology, GIA Certified',
      description: 'Ensures every gem meets our rigorous quality standards.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-24">
      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Crafting Excellence in
              <span className="block bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Fine Gemstones
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Since 1998, Gemify has been at the forefront of the precious gems industry, 
              combining traditional expertise with modern technology to deliver exceptional stones.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Gemify was founded with a vision to make the world's finest gemstones accessible 
                  to collectors and enthusiasts worldwide. What started as a small family business 
                  has grown into a global leader in the precious gems market.
                </p>
                <p>
                  Our journey began in the heart of Asia's gem trading hubs, where we built lasting 
                  relationships with miners and suppliers. These connections, combined with our 
                  commitment to authenticity and quality, have made us a trusted name in the industry.
                </p>
                <p>
                  Today, we continue to innovate, using cutting-edge technology to showcase our gems 
                  while maintaining the personal touch that has been our hallmark for over two decades.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/api/placeholder/400/500" 
                alt="Gemify heritage" 
                className="rounded-xl"
              />
              <img 
                src="/api/placeholder/400/500" 
                alt="Gemify modern" 
                className="rounded-xl mt-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Experts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="text-purple-400 mb-2">{member.role}</div>
                  <div className="text-sm text-gray-400 mb-3">{member.credentials}</div>
                  <p className="text-gray-400">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
                <p className="text-gray-400 mb-8">
                  Have questions about our gems or services? Our expert team is here to help.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-purple-400 mr-3" />
                    <span className="text-gray-300">contact@gemify.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-purple-400 mr-3" />
                    <span className="text-gray-300">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-purple-400 mr-3" />
                    <span className="text-gray-300">123 Gem Street, New York, NY 10001</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-purple-400 mr-3" />
                    <span className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM EST</span>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Name</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-700/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input 
                      type="email"
                      className="w-full bg-slate-700/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Message</label>
                    <textarea 
                      rows="4"
                      className="w-full bg-slate-700/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;