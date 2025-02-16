/**
 * Home - The homepage component of the application.
 * - Provides an introduction to the "Plan & Plate" platform.
 * - Includes a welcoming message, a brief description, and a preview image.
 */
import React from "react";

const Home = () => {
  return (
    <main className="flex-grow container mx-auto py-10 px-4 sm:px-8 transition-colors duration-200">
      <section className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 py-10 sm:py-20">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6 text-gray-800 dark:text-white">
            Welcome to Plan & Plate!
          </h1>
          <p className="text-lg sm:text-2xl text-gray-600 dark:text-gray-300 mb-6">
            Explore a world of delicious recipes and effective meal planning tools.
            Get started today and elevate your cooking experience.
          </p>
        </div>
        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="../images/Homepage.jpeg"
            alt="Plan & Plate App Preview"
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-lg shadow-md dark:shadow-gray-700"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;