// src/app/contact/page.tsx
import Head from 'next/head';
import { redirect } from "next/navigation";
import ContactForm from '@/components/contactForm';

// Server action
async function contactAction(formData: FormData) {
  "use server";
  
  const name = formData.get("name");
  const email = formData.get("email");
  const title = formData.get("title");
  const contactType = formData.get("contactType");
  const message = formData.get("message");
  
  console.log("SERVER: Contact form data:", { name, email, title, contactType, message });
  
  // Basic validation
  if (!email || !title || !message) {
    console.log("SERVER: Validation failed");
    return { status: 'error', message: 'missing-fields' };
  }
  
  // Here you would integrate with your email service (nodemailer, resend, etc.)
  // For now, simulate success
  console.log("SERVER: Form submitted successfully");
  
  // Success - redirect to thanks page
  redirect("/contact/thanks");
}

export default function ContactUs() {

  return (
    <>
      <Head>
        <title>Contact Us - Shop.co</title>
        <meta
          name="description"
          content="Contact us for support, information, or complaints. We're happy to help you."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    We&apos;re here to help and answer any questions you might have. 
                    We look forward to hearing from you.
                  </p>
                  <p>
                    Whether you need support, have general questions, or want to provide feedback,
                    our team is ready to assist you with professional and timely responses.
                  </p>
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md border">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          Email
                        </h4>
                        <p className="text-gray-600">info@shop.co</p>
                        <p className="text-gray-600">support@shop.co</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          Phone
                        </h4>
                        <p className="text-gray-600">+46 8 123 456 78</p>
                        <p className="text-gray-500 text-sm">
                          Mon–Fri 09:00–17:00
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          Address
                        </h4>
                        <p className="text-gray-600">Storgatan 123</p>
                        <p className="text-gray-600">111 22 Stockholm</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          Opening Hours
                        </h4>
                        <p className="text-gray-600">Monday – Friday</p>
                        <p className="text-gray-600">09:00 – 17:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:pl-8">
              <ContactForm contactAction={contactAction} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}