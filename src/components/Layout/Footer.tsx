
import React from "react";
import { Tooth } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-dentist-border mt-8 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Tooth className="w-6 h-6 text-dentist-primary mr-2" />
            <span className="text-gray-700 font-medium">DentalCare Appointments</span>
          </div>
          
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DentalCare. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-dentist-primary hover:text-dentist-secondary mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-dentist-primary hover:text-dentist-secondary mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
