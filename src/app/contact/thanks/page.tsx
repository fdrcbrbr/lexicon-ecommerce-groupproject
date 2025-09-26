// src/app/contact/thanks/page.tsx
'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';

export default function Thanks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <>
      <title>Thank You - Shop.co</title>
      <meta name="description" content="Thank you for contacting us. We'll get back to you soon." />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto px-4">
          <div className={`bg-white rounded-xl shadow-2xl p-8 text-center transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
          }`}>
            
            {/* Success Icon with Animation */}
            <div className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-6 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Thank You Message with Stagger Animation */}
            <div className={`transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                Thank You!
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                We&apos;ve received your message and will get back to you as soon as possible.
              </p>

              <p className="text-gray-500 mb-8">
                Our team typically responds within 24 hours during business days.
              </p>
            </div>

           

            {/* Action Buttons with Animation */}
            <div className={`space-y-3 transition-all duration-700 delay-900 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <Link
                href="/"
                className="inline-flex w-full justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Home
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex w-full justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Send Another Message
              </Link>
            </div>

           

            {/* Floating Particles Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce opacity-50" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}