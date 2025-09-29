// src/app/contact/thanks/page.tsx
import Link from "next/link";
import Head from 'next/head';

export default function Thanks() {
  return (
    <>
      <Head>
        <title>Thank You - Shop.co</title>
        <meta name="description" content="Thank you for contacting us. We'll get back to you soon." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Thank You Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              We&apos;ve received your message and will get back to you as soon as possible.
            </p>

            <p className="text-gray-500 mb-8">
              Our team typically responds within 24 hours during business days.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/"
                className="inline-flex w-full justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Return to Home
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex w-full justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Send Another Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}