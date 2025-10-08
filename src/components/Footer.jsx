import React from "react";
import { Link } from "react-router-dom";
// import footerLogo from "/footerLogo.png";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { PiInstagramLogoFill } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-[#060B27] border-t-[11px] border-[#343853] text-white relative overflow-hidden">
      <div className="relative z-10">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Logo and Tagline */}
            <div className="flex-1">
              {/* <div className="flex items-center mb-6">
                <img
                  src={footerLogo}
                  alt="logo"
                  className="w-48 h-20 object-cover"
                />
              </div> */}
              <p className="text-white font-poppins text-sm max-w-lg leading-relaxed">
                Dropping food delivery prices by 70% while supporting local
                restaurants.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-6 mt-8">
                <Link
                  to="#"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <RiSendPlaneFill className="w-6 h-6" />
                </Link>
                <Link
                  to="#"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <PiInstagramLogoFill className="w-6 h-6" />
                </Link>
                <Link
                  to="#"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <FaDiscord className="w-6 h-6" />
                </Link>
                <Link
                  to="#"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <FaTwitter className="w-6 h-6" />
                </Link>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="flex-shrink-0 flex md:self-end md:justify-end justify-center">
              <Link
                to="/order-now"
                className="bg-gradient-primary text-white px-12 py-4 font-poppins rounded-full font-bold text-md hover:shadow-xl transition-all duration-300 inline-block transform hover:scale-105"
              >
                ORDER NOW
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          <div className="max-w-7xl mx-auto px-4 border-t border-white/20 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="text-white font-poppins font-medium text-sm">
                © 2025 MealCheap. All rights reserved.
              </div>

              {/* Utility Links */}
              <div className="flex items-center justify-center gap-2 space-x-6 text-sm flex-wrap">
                <Link
                  to="#"
                  className="text-white hover:text-white transition-colors font-poppins font-medium text-sm"
                >
                  Contact
                </Link>
                <Link
                  to="/faq"
                  className="text-white hover:text-white transition-colors font-poppins font-medium text-sm"
                >
                  FAQ
                </Link>
                <Link
                  to="/terms"
                  className="text-white hover:text-white transition-colors font-poppins font-medium text-sm"
                >
                  Terms
                </Link>
                <Link
                  to="/privacy"
                  className="text-white hover:text-white transition-colors font-poppins font-medium text-sm"
                >
                  Privacy
                </Link>
                <Link
                  to="#"
                  className="text-white hover:text-white transition-colors font-poppins font-medium text-sm"
                >
                  Refunds
                </Link>
                <div className="flex items-center space-x-2 text-white">
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99991 0.233398C3.98641 0.233398 0.73291 3.4869 0.73291 7.5004C0.73291 11.5139 3.98641 14.7674 7.99991 14.7674C12.0134 14.7674 15.2669 11.5139 15.2669 7.5004C15.2669 3.4869 12.0134 0.233398 7.99991 0.233398ZM12.1929 6.9844C11.8487 7.38026 11.3959 7.66641 10.8906 7.80737C10.3854 7.94834 9.84982 7.93791 9.35041 7.7774L5.75691 11.9104C5.5721 12.1188 5.31247 12.2458 5.03451 12.2637C4.75656 12.2816 4.48276 12.1891 4.2727 12.0062C4.06264 11.8233 3.9333 11.5648 3.91284 11.287C3.89237 11.0092 3.98242 10.7346 4.16341 10.5229L7.76241 6.3859C7.54247 5.92745 7.45781 5.4158 7.51834 4.91094C7.57888 4.40608 7.7821 3.92895 8.10418 3.53549C8.42626 3.14204 8.85385 2.84857 9.3368 2.6895C9.81976 2.53043 10.3381 2.51236 10.8309 2.6374L9.45341 4.2434L9.90341 5.5534L11.2649 5.8184L12.6449 4.2084C12.8356 4.66732 12.8944 5.17034 12.8147 5.66086C12.735 6.15137 12.52 6.60992 12.1939 6.9849L12.1929 6.9844Z"
                      fill="white"
                    />
                  </svg>

                  <span className="font-poppins font-medium italic text-sm">
                    Built by Senew Tech
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
