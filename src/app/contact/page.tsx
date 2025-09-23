import Head from 'next/head';
// import Contact from '@/components/contactForm';

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact Us - [Shop.co]</title>
        <meta
          name="description"
          content="Contact us for support, information, or complaints. We're happy to help you."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-5">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 opacity-10"></div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
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
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:pl-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border">
                {/* <Contact /> */}
                <div className="space-y-6">
                  {/* Placeholder for contact form */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
