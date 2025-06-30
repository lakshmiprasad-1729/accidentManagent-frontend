import React from 'react';
import { Factory, Users, Award, Shield, Zap, Heart, Target, Globe } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '1971', event: 'Foundation laid for Vizag Steel Plant' },
    { year: '1982', event: 'First blast furnace commissioned' },
    { year: '1990', event: 'Achieved 1 million tonnes steel production' },
    { year: '2000', event: 'Implemented ISO 9001 quality standards' },
    { year: '2010', event: 'Crossed 5 million tonnes production milestone' },
    { year: '2020', event: 'Digital transformation initiative launched' },
    { year: '2024', event: 'Launch of comprehensive digital platform' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Unwavering commitment to the safety and well-being of our workforce and community.',
      color: 'bg-red-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Pursuing the highest standards in steel production and operational efficiency.',
      color: 'bg-yellow-500'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Strong bonds with local communities and commitment to social responsibility.',
      color: 'bg-pink-500'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Environmental stewardship and sustainable practices in all our operations.',
      color: 'bg-green-500'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Township Services',
      description: 'Comprehensive digital services for our residential community including lost & found systems.'
    },
    {
      icon: Target,
      title: 'Complaint Management',
      description: 'Streamlined grievance handling with transparent tracking and quick resolution.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Instant notifications and updates on service requests and community announcements.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security ensuring the protection of personal and operational data.'
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Factory className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-blue-200">Vizag Steel Plant</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              A legacy of excellence in steel production, community service, and technological innovation 
              spanning over five decades of dedicated service to the nation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To be a world-class steel producer committed to excellence in manufacturing, 
                environmental stewardship, and community development while fostering innovation 
                and sustainable growth.
              </p>
              <div className="flex items-center space-x-2 text-blue-600">
                <Target className="h-5 w-5" />
                <span className="font-medium">Excellence in Every Process</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To emerge as a globally recognized steel manufacturing hub that sets benchmarks 
                in operational excellence, technological advancement, and sustainable development 
                practices.
              </p>
              <div className="flex items-center space-x-2 text-green-600">
                <Globe className="h-5 w-5" />
                <span className="font-medium">Global Leadership in Steel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our operations, decisions, and relationships 
              with stakeholders and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-16 h-16 ${value.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones that have shaped Vizag Steel Plant into the industry leader it is today.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Digital Platform Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how our digital transformation is enhancing services and community connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-blue-100">
              Our impact and achievements over the decades
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Years of Excellence' },
              { number: '10,000+', label: 'Employees' },
              { number: '6M+', label: 'Tonnes Annual Capacity' },
              { number: '100%', label: 'Digital Integration' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;