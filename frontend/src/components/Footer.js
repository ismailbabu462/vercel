import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Download, BookOpen, Users, Mail, Scale } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">PentoraSec</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Advanced penetration testing platform with AI-powered security analysis and comprehensive vulnerability assessment tools.
            </p>
            <p className="text-gray-500 text-xs">
              © 2025 PentoraSec. All rights reserved.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">PRODUCT</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/features" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Features</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Pricing</span>
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/ismailbabu462/pentorasec-demo-desktop-agent-fix" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Agent</span>
                </a>
              </li>
              <li>
                <Link 
                  to="/documentation" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Documentation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/acquisition" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Acquisition</span>
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:pentora59@gmail.com" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">LEGAL</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <Scale className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              Securing the digital world, one vulnerability at a time.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="https://github.com/ismailbabu462/pentorasec-demo-desktop-agent-fix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                GitHub
              </a>
              <a 
                href="mailto:pentora59@gmail.com" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
