'use client';

import { Shield, Award, Globe2, Users, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Protected from '@/components/Protected';

const STATS = [
  { label: 'Years of Experience', value: '25+' },
  { label: 'Certified Gems', value: '10K+' },
  { label: 'Happy Clients', value: '50K+' },
  { label: 'Countries Served', value: '120+' },
];

const VALUES = [
  { Icon: Shield, title: 'Authenticity Guaranteed', description: 'Every gem in our collection is thoroughly authenticated and certified by leading gemological laboratories.' },
  { Icon: Award, title: 'Expert Curation', description: 'Our team of gemologists carefully selects each stone for its quality, rarity, and beauty.' },
  { Icon: Globe2, title: 'Global Sourcing', description: 'We work directly with mines and trusted suppliers worldwide to bring you the finest gems.' },
  { Icon: Users, title: 'Customer First', description: 'We provide personalized service and expert guidance throughout your gem-buying journey.' },
];

const TEAM = [
  { name: 'Dr. Sarah Mitchell', role: 'Chief Gemologist', credentials: 'Ph.D. in Gemology, GIA Graduate', description: 'With over 15 years of experience in gem identification and grading.' },
  { name: 'James Chen', role: 'Head of Acquisitions', credentials: 'FGA, DGA', description: 'Expert in sourcing rare and exceptional gemstones from across the globe.' },
  { name: 'Maria Rodriguez', role: 'Quality Assurance Director', credentials: 'MSc Geology, GIA Certified', description: 'Ensures every gem meets our rigorous quality standards.' },
];

const TEAM_IMAGE =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

function AboutContent() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-white'
      } pt-24 transition-colors duration-300`}
    >
      {/* Hero */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Crafting Excellence in
            <span className="block bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Fine Gemstones
            </span>
          </h1>
          <p className={`max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Since 1998, Gemify has been at the forefront of the precious gems industry, combining traditional
            expertise with modern technology to deliver exceptional stones.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Our Story</h2>
          <div className={`space-y-4 max-w-4xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>
              Gemify was founded with a vision to make the world&apos;s finest gemstones accessible to collectors and
              enthusiasts worldwide. What started as a small family business has grown into a global leader in the
              precious gems market.
            </p>
            <p>
              Our journey began in the heart of Asia&apos;s gem trading hubs, where we built lasting relationships with
              miners and suppliers. These connections, combined with our commitment to authenticity and quality, have
              made us a trusted name in the industry.
            </p>
            <p>
              Today, we continue to innovate, using cutting-edge technology to showcase our gems while maintaining the
              personal touch that has been our hallmark for over two decades.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map(({ Icon, title, description }) => (
              <div
                key={title}
                className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl p-6 text-center`}
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Meet Our Experts
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl overflow-hidden`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TEAM_IMAGE} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <div className="text-purple-400 mb-2">{member.role}</div>
                  <div className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {member.credentials}
                  </div>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white shadow-lg'} rounded-xl p-8`}>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Get in Touch
                </h2>
                <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Have questions about our gems or services? Our expert team is here to help.
                </p>
                <div className="space-y-4">
                  {[
                    { Icon: Mail, text: 'contact@gemify.com' },
                    { Icon: Phone, text: '+1 (555) 123-4567' },
                    { Icon: MapPin, text: '123 Gem Street, New York, NY 10001' },
                    { Icon: Clock, text: 'Mon - Fri: 9:00 AM - 6:00 PM EST' },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center">
                      <Icon className="w-5 h-5 text-purple-400 mr-3" />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <form className="space-y-4">
                {['Name', 'Email'].map((label) => (
                  <div key={label}>
                    <label className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{label}</label>
                    <input
                      type={label === 'Email' ? 'email' : 'text'}
                      className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        isDarkMode ? 'bg-slate-700/50 text-white' : 'bg-gray-50 text-gray-900 border border-gray-200'
                      }`}
                    />
                  </div>
                ))}
                <div>
                  <label className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Message</label>
                  <textarea
                    rows="4"
                    className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDarkMode ? 'bg-slate-700/50 text-white' : 'bg-gray-50 text-gray-900 border border-gray-200'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Protected>
      <AboutContent />
    </Protected>
  );
}
