/**
 * Footer component - Displays the footer of the application.
 * Includes copyright information and a link to the "About Us" page.
 */
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-700 text-white dark:bg-gray-900 dark:text-gray-300">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Plan & Plate. All rights reserved.</p>
        <p>
          <Link href="/about" legacyBehavior>
            <a className="hover:underline hover:text-orange-400 dark:hover:text-orange-500">
              About Us
            </a>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;