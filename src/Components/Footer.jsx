import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-800 py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-4 w-full text-center sm:mb-0 sm:w-1/3 sm:text-left">
            <h5 className="text-lg font-semibold">Contact Us</h5>
            <p className="mt-2">123 Pet Street, Pet City, PC 12345</p>
            <p>Email: info@onlinepetstore.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="mb-4 w-full text-center sm:mb-0 sm:w-1/3">
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <ul className="mt-2">
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:underline">
                  Shop
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
                <img
                  src="facebook-icon.svg"
                  alt="Facebook"
                  className="h-6 w-6"
                />
              </a>
              <a href="https://www.twitter.com" className="hover:opacity-75">
                <img src="twitter-icon.svg" alt="Twitter" className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com" className="hover:opacity-75">
                <img
                  src="instagram-icon.svg"
                  alt="Instagram"
                  className="h-6 w-6"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Online Pet Store. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
