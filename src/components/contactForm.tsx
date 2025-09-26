'use client';

import { useState, useRef } from 'react';

interface ContactFormProps {
  contactAction: (formData: FormData) => Promise<{ status?: string; message?: string; } | void>;
  status?: string;
  message?: string;
}

export default function ContactForm({ contactAction, status, message }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await contactAction(formData);
      if (formRef.current && status !== 'error') {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:pl-8">
      <div className="bg-white p-8 rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Send us a Message
        </h2>

        {/* Error Messages */}
        {status === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-800 font-medium">
                {message === "missing-fields" 
                  ? "Please fill in all required fields."
                  : "Sorry, there was an error. Please try again."
                }
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {status === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-800 font-medium">
                Message sent successfully! We`&apos;`ll get back to you soon.
              </p>
            </div>
          </div>
        )}

        <form ref={formRef} action={handleSubmit} className="space-y-6">
          
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Your full name"
                minLength={2}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              type="text"
              name="title"
              id="title"
              placeholder="What is this regarding?"
              required
              minLength={4}
              maxLength={99}
            />
          </div>

          {/* Contact Type Dropdown */}
          <div>
            <label htmlFor="contactType" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Type
            </label>
            <select
              name="contactType"
              id="contactType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">Select contact type</option>
              <option value="support">Support - Technical Help</option>
              <option value="info">Information - General Questions</option>
              <option value="complaint">Complaint - Issues & Feedback</option>      
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical transition-colors duration-200"
              id="message"
              name="message"
              rows={6}
              placeholder="Tell us more about your inquiry..."
              required
              minLength={10}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all duration-200 transform ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}