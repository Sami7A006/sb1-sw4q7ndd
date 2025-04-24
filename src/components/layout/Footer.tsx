import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">Terms of Service</span>
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">Privacy Policy</span>
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">Contact</span>
              Contact
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} HealthScan. All rights reserved.
              <span className="ml-2 inline-flex items-center">
                Made with <Heart className="mx-1 h-4 w-4 text-red-500" /> by HealthScan
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;