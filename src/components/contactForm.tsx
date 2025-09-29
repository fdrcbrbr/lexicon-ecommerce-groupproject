// src/components/ContactForm.tsx
'use client';

import { useState } from 'react';
import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContactFormProps {
  contactAction: (formData: FormData) => Promise<void | { status: string; message: string }>;
}

export default function ContactForm({ contactAction }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    title?: string;
    message?: string;
  }>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'title':
        if (!value.trim()) {
          return 'Subject is required';
        }
        if (value.trim().length < 4) {
          return 'Subject must be at least 4 characters';
        }
        break;
      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters';
        }
        break;
    }
    return null;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setFieldErrors(prev => ({
      ...prev,
      [name]: error || undefined
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    // Clear error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  async function handleSubmit(formData: FormData) {
    // Validate all required fields before submitting
    const newErrors: typeof fieldErrors = {};
    
    const email = formData.get('email') as string;
    const title = formData.get('title') as string;
    const message = formData.get('message') as string;

    const emailError = validateField('email', email);
    const titleError = validateField('title', title);
    const messageError = validateField('message', message);

    if (emailError) newErrors.email = emailError;
    if (titleError) newErrors.title = titleError;
    if (messageError) newErrors.message = messageError;

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setError('Please fill in all required fields correctly');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await contactAction(formData);
      
      if (result && result.status === 'error') {
        setError(
          result.message === 'missing-fields' 
            ? 'Please fill in all required fields.'
            : 'Sorry, there was an error. Please try again.'
        );
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Send us a Message
      </h2>

      {/* Error Message with ARIA live region */}
      {error && (
        <div 
          role="alert" 
          aria-live="polite"
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center">
            <svg 
              className="w-5 h-5 text-red-600 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      <Form action={handleSubmit} className="space-y-6">
        
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              placeholder="Your full name"
              minLength={2}
              className="w-full"
              aria-describedby="name-description"
              onChange={handleChange}
            />
            <span id="name-description" className="sr-only">
              Enter your full name
            </span>
          </div>
          
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address <span className="text-red-500" aria-label="required">*</span>
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="your@email.com"
              required
              aria-required="true"
              aria-describedby="email-description"
              className={`w-full ${fieldErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {fieldErrors.email && (
              <div className="flex items-center mt-2 text-sm text-red-600" role="alert">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {fieldErrors.email}
              </div>
            )}
            <span id="email-description" className="sr-only">
              Enter a valid email address
            </span>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label 
            htmlFor="title" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Subject <span className="text-red-500" aria-label="required">*</span>
          </label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="What is this regarding?"
            required
            aria-required="true"
            minLength={4}
            maxLength={99}
            aria-describedby="title-description"
            className={`w-full ${fieldErrors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {fieldErrors.title && (
            <div className="flex items-center mt-2 text-sm text-red-600" role="alert">
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {fieldErrors.title}
            </div>
          )}
          <span id="title-description" className="sr-only">
            Brief subject of your message, minimum 4 characters
          </span>
        </div>

        {/* Contact Type Dropdown */}
        <div>
          <label 
            htmlFor="contactType" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contact Type
          </label>
          <select
            name="contactType"
            id="contactType"
            className="w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
            aria-describedby="contactType-description"
          >
            <option value="">Select contact type</option>
            <option value="support">Support - Technical Help</option>
            <option value="info">Information - General Questions</option>
            <option value="complaint">Complaint - Issues &amp; Feedback</option>
            <option value="partnership">Partnership - Business Collaboration</option>
            <option value="other">Other - Different Matter</option>
          </select>
          <span id="contactType-description" className="sr-only">
            Optional: Select the type of inquiry
          </span>
        </div>

        {/* Message */}
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message <span className="text-red-500" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us more about your inquiry..."
            required
            aria-required="true"
            minLength={10}
            maxLength={1000}
            aria-describedby="message-description"
            className={`w-full px-3 py-2 border ${fieldErrors.message ? 'border-red-500 focus:ring-red-500' : 'border-input'} bg-background rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input resize-vertical`}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {fieldErrors.message ? (
            <div className="flex items-center mt-2 text-sm text-red-600" role="alert">
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {fieldErrors.message}
            </div>
          ) : (
            <span id="message-description" className="text-sm text-gray-500 mt-2 block">
              Minimum 10 characters required
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className={`w-full text-white transition-colors duration-300 ${
              isSubmitting 
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                : 'bg-black hover:bg-gray-800 focus:ring-gray-900'
            } disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Sending</span>
                <span className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
              </>
            ) : (
              <>
                Send Message
              </>
            )}
          </Button>
        </div>

        {/* Required fields notice */}
        <p className="text-sm text-gray-500 text-center" role="note">
          Fields marked with <span className="text-red-500" aria-label="asterisk">*</span> are required
        </p>
      </Form>
    </div>
  );
}