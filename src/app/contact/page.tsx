
import ContactForm from '@/components/contactForm';
import { redirect } from 'next/navigation';

async function sendEmail(formData: FormData) {
  try {
    console.log('Sending email with data:', {
      name: formData.get('name'),
      email: formData.get('email'),
      title: formData.get('title'),
      contactType: formData.get('contactType'),
      message: formData.get('message'),
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return Math.random() > 0.1; 
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

export default function ContactPage() {
  async function contactAction(formData: FormData) {
    'use server';
    
    const email = formData.get('email');
    const title = formData.get('title');
    const message = formData.get('message');
    
    if (!email || !title || !message) {
      return { status: 'error', message: 'missing-fields' };
    }
    
    const success = await sendEmail(formData);
    
    if (success) {
      redirect('/contact/thanks');
    } else {
      return { status: 'error', message: 'send-failed' };
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Company Info */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              
              <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Email
                      </h4>
                      <p className="text-gray-600">info@shop.co</p>
                      <p className="text-gray-600">support@shop.co</p>

                      <h4 className="text-lg font-medium text-gray-900 mt-4">
                        Phone
                      </h4>
                      <p className="text-gray-600">+46 8 123 456 78</p>
                      <p className="text-gray-500 text-sm">
                        Mon–Fri 09:00–17:00
                      </p>

                      <h4 className="text-lg font-medium text-gray-900 mt-4">
                        Address
                      </h4>
                      <p className="text-gray-600">Storgatan 123</p>
                      <p className="text-gray-600">111 22 Stockholm</p>

                      <h4 className="text-lg font-medium text-gray-900 mt-4">
                        Opening Hours
                      </h4>
                      <p className="text-gray-600">Monday – Friday</p>
                      <p className="text-gray-600">09:00 – 17:00</p>
                    </div>
                  </div>
                </div>
                

          {/* Right Column - Contact Form */}
          <ContactForm contactAction={contactAction} />
          
        </div>
      </div>
    </div>
  );
}