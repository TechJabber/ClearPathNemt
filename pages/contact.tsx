import Head from 'next/head';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // TODO: Send to backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will respond shortly.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <Head>
        <title>Contact Us - Clear Path NEMT</title>
        <meta name="description" content="Get in touch with Clear Path NEMT. Contact us for support, questions, or to book a ride." />
      </Head>

      {/* Page Header */}
      <section className="bg-clear-navy text-white py-12">
        <div className="container-max">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-200 text-lg">We're here to help. Reach out anytime.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <div className="text-center p-8 border-2 border-gray-200 rounded-xl hover:border-clear-gold hover:shadow-lg transition">
              <Phone size={40} className="mx-auto text-clear-gold mb-4" />
              <h3 className="text-xl font-bold clear-heading mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">Available 24/7</p>
              <a href="tel:1-844-836-8123" className="text-clear-navy font-semibold hover:text-clear-gold">
                1-844-NEMT-123
              </a>
            </div>

            {/* Email */}
            <div className="text-center p-8 border-2 border-gray-200 rounded-xl hover:border-clear-gold hover:shadow-lg transition">
              <Mail size={40} className="mx-auto text-clear-gold mb-4" />
              <h3 className="text-xl font-bold clear-heading mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">Response within 24 hours</p>
              <a href="mailto:support@goclearpathemt.com" className="text-clear-navy font-semibold hover:text-clear-gold">
                support@goclearpathemt.com
              </a>
            </div>

            {/* Address */}
            <div className="text-center p-8 border-2 border-gray-200 rounded-xl hover:border-clear-gold hover:shadow-lg transition">
              <MapPin size={40} className="mx-auto text-clear-gold mb-4" />
              <h3 className="text-xl font-bold clear-heading mb-2">Visit Us</h3>
              <p className="text-gray-600">
                Boston, MA 02101
                <br />
                United States
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-clear-light p-8 rounded-xl">
            <h2 className="text-2xl font-bold clear-heading mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold clear-heading mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold clear-heading mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold clear-heading mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold clear-heading mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold clear-heading mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="w-full clear-btn-primary px-6 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
