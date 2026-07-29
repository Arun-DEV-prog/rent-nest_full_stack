import { Mail, Phone, MapPin, Link as LinkIcon, Share2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Rent Nest</h3>
            <p className="text-sm mb-4">
              Your trusted partner for finding rental properties across
              Bangladesh.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+880 1234 567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@rentnest.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  Find Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  Post Property
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  House
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  Bachelor Room
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  Hostel Seat
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  Commercial Space
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} Rent Nest. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="LinkedIn"
              className="bg-gray-800 p-2 rounded-full hover:bg-teal-600 transition"
            >
              <LinkIcon className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="bg-gray-800 p-2 rounded-full hover:bg-teal-600 transition"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Share"
              className="bg-gray-800 p-2 rounded-full hover:bg-teal-600 transition"
            >
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
