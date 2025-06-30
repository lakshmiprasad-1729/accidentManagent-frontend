import React from 'react';
import { Factory, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Factory className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">Vizag Steel Plant</span>
            </div>
            <p className="text-sm text-gray-400">
              Committed to excellence in steel production and community service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/lost-found" className="hover:text-blue-400 transition-colors">Lost & Found</a></li>
              <li><a href="/complaint" className="hover:text-blue-400 transition-colors">Complaints</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">Township Services</span></li>
              <li><span className="text-gray-400">Employee Portal</span></li>
              <li><span className="text-gray-400">Grievance System</span></li>
              <li><span className="text-gray-400">Community Support</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>Visakhapatnam, Andhra Pradesh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+91-891-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>info@vizagsteel.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Vizag Steel Plant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;