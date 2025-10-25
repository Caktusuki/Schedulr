import React from "react";
import StatsPanel from './StatsPanel';
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full bg-blue-600 dark:bg-blue-700 text-white text-center py-20 rounded-2xl shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Schedulr</h1>
        <p className="text-lg mb-8">
          Organize your tasks, plan your day, and boost productivity with our modern, 
          easy-to-use scheduling tool.
        </p>
        <Link 
        to="/Calendar" 
        className="bg-white text-blue-600 dark:text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 dark:hover:bg-blue-100 transition"
      >
        Get Started
      </Link>
      </section>

      {/* Content Wrapper */}
      <div className="max-w-5xl w-full px-6 py-16 space-y-12">
        
        {/* About Section */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="text-3xl md:text-3xl font-bold mb-8 text-blue-600 text-center">About Us</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Schedulr is an open-source project under GSSoC that helps students 
            and professionals manage their schedules with ease.  
            Our goal is to make productivity tools simple, beautiful, and effective.
          </p>
        </section>

        {/* Why Choose Section */}
    <section className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-md hover:shadow-xl transition">
    <h2 className="text-3xl md:text-3xl font-bold mb-8 text-blue-600 text-center">Why Choose Schedulr?</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
      <li className="flex items-center gap-2">
        <span className="text-teal-600 font-bold">✔</span> Clean and intuitive UI
      </li>
      <li className="flex items-center gap-2">
        <span className="text-teal-600 font-bold">✔</span> Organize tasks and deadlines
      </li>
      <li className="flex items-center gap-2">
        <span className="text-teal-600 font-bold">✔</span> Calendar & schedule view
      </li>
      <li className="flex items-center gap-2">
        <span className="text-teal-600 font-bold">✔</span> Built by the community
      </li>
    </ul>
  </section>

        {/* Stats Panel (Our Impact) */}
        <section className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-md hover:shadow-xl transition mt-16">
    <h2 className="text-3xl md:text-3xl font-bold mb-8 text-blue-600 text-center">
      Our Impact
    </h2>
    <StatsPanel />
  </section>

    {/* Testimonial section */}
    <Testimonials/>

    {/* FAQ section */}
    <Faq/>



    {/* Contact Section */}
   <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
  <h2 className="text-3xl md:text-3xl font-bold mb-8 text-blue-600 text-center">Contact Us</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800 dark:text-gray-100"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800 dark:text-gray-100"
          />

          <textarea
            rows="3"
            placeholder="Write your message..."
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800 dark:text-gray-100"
          ></textarea>

          <button
            type="submit"
            className="w-full md:w-auto bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition"
          >
            Send Message
          </button>
        </form>

        {/* Image Placeholder */}
        <div className="flex justify-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2983/2983780.png"
        alt="Send message illustration"
        className="w-36 h-36 object-contain"
      />
    </div>
      </div>
    </section>

    {/* Footer section */}
     <footer className="bg-indigo-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-16">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Brand Info */}
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Schedulr</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Boost your productivity and stay on track with our task and schedule manager.
      </p>
    </div>

    {/* Links */}
    <div>
      <h3 className="font-semibold text-lg mb-4 text-indigo-700 dark:text-indigo-400">Quick Links</h3>
      <ul className="space-y-2">
        <li><Link to="/home" className="hover:text-teal-600">Home</Link></li>
        <li><Link to="/dashboard" className="hover:text-teal-600">Dashboard</Link></li>
        <li><Link to="/tasks" className="hover:text-teal-600">Tasks</Link></li>
        <li><Link to="/calendar" className="hover:text-teal-600">Calendar</Link></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="font-semibold text-lg mb-4 text-indigo-700 dark:text-indigo-400">Contact</h3>
      <p className="text-gray-600 dark:text-gray-300">Email: support@schedulr.com</p>
      <p className="text-gray-600 dark:text-gray-300">Phone: +91 99999 XXXXX</p>
    </div>
  </div>

  <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
    © {new Date().getFullYear()} Schedulr. All rights reserved.
  </div>
</footer>

      </div>
    </div>
  );
};

export default Home;

