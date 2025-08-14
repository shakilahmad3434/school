import { Facebook, GraduationCap, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">EduManage Pro</span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering educational institutions with modern management solutions 
                for better learning outcomes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Twitter">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">API Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Security</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Training Resources</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Community Forum</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Status Page</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-400 mr-3" />
                  <span className="text-gray-400">1-800-EDU-MGMT</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-400 mr-3" />
                  <a href="mailto:hello@edumanagepro.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                    hello@edumanagepro.com
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-1" />
                  <span className="text-gray-400">
                    123 Education Lane<br />
                    Suite 400<br />
                    Boston, MA 02101
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2025 EduManage Pro. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer