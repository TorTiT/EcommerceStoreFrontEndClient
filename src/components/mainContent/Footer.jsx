import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between space-y-4 sm:space-y-0">
          <div className="w-full text-center sm:w-1/3 sm:text-left">
            <h5 className="text-lg font-semibold">Contact Us</h5>
            <p className="mt-2">123 Shoe Lane, Sneaker City, SC 12345</p>
            <p>Email: info@shoestore.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="w-full text-center sm:w-1/3">
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full text-center sm:w-1/3 sm:text-right">
            <h5 className="text-lg font-semibold">Follow Us</h5>
            <div className="mt-2 flex justify-center space-x-4 sm:justify-end">
              <a href="https://www.facebook.com" className="hover:opacity-75">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://www.twitter.com" className="hover:opacity-75">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com" className="hover:opacity-75">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://www.pinterest.com" className="hover:opacity-75">
                <FaPinterest className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Shoe Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
