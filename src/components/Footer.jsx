import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-red-900 text-white pt-12 pb-8">
  <div className="container mx-auto px-4">
    {/* One Row with Two Columns */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
      
      {/* Left Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Code Gama</h3>
        <p className="text-gray-400">
          Your one-stop shop for all your needs. Quality products at the best prices.
        </p>
      </div>

      {/* Right Section */}
      <div>
        <p>&copy; 2024 Code Gama. All rights reserved.</p>
      </div>

    </div>
  </div>
</footer>

  );
};

export default Footer;