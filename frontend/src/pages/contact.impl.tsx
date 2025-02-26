// frontend/src/pages/contact.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/Textarea';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { ROUTES } from '@/utils/routes';

const ContactPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form data to your backend here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
    // Show success message
    alert('Message sent successfully! We will get back to you soon.');
  };

  return (
    <Layout title="Contact Us | WCCIS" pageType="info">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center" id="hero-section">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/sunset-skyline.jpg"
            alt="City lights at night"
            fill={true}
            className="object-cover"
            priority={true}
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={85}
          />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-500/10 to-transparent" />
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.1s_forwards]">
                  Get in Touch
                </h1>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.3s_forwards]">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white-700 via-blue-400 to-white-200">
                    With Our Team
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.5s_forwards]">
                Have a question about your insurance? Need a quote? We're here to help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Static gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-900" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Contact Information</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/[0.07] transition-colors border border-white/10">
                  <div className="p-2 bg-gradient-to-br from-blue-500/30 to-blue-700/30">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Phone</h3>
                    <p className="text-gray-300">(310) 289-9444</p>
                    <p className="text-gray-300">Monday-Friday, 9AM-5PM PT</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/[0.07] transition-colors border border-white/10">
                  <div className="p-2 bg-gradient-to-br from-blue-500/30 to-blue-700/30">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email</h3>
                    <p className="text-gray-300">info@wccis.com</p>
                    <p className="text-gray-300">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/[0.07] transition-colors border border-white/10">
                  <div className="p-2 bg-gradient-to-br from-blue-500/30 to-blue-700/30">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Office</h3>
                    <p className="text-gray-300">8484 Wilshire Blvd, Suite 870</p>
                    <p className="text-gray-300">Beverly Hills, CA 90211</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <iframe
                    title="WCCIS Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.1537364618317!2d-118.37778772421368!3d34.063733674036895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b93460b8909f%3A0x73ff07b1c2d7236d!2s8484%20Wilshire%20Blvd%20%23870%2C%20Beverly%20Hills%2C%20CA%2090211!5e0!3m2!1sen!2sus!4v1644555555555!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    className="border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                {/* Decorative elements */}
                <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 blur-2xl opacity-50" />
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gradient-to-r from-white/5 to-white/[0.02] p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-8">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full bg-white/5 border-white/10 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full bg-white/5 border-white/10 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="w-full bg-white/5 border-white/10 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    className="w-full bg-white/5 border-white/10 text-white"
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full transition-transform duration-200 hover:translate-x-1"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gray-900">
        {/* Static gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-400/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-300/10" />
          <div className="absolute inset-0 bg-gray-900/90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Insurance Right Away?
            </h2>
            <p className="text-gray-200 text-lg mb-8">
              Get a fast, free quote online now. Our team is ready to help with all your insurance needs.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(ROUTES.INSURE)}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="transition-transform duration-200 hover:translate-x-1 text-lg px-8 py-6"
            >
              Get Your Quote Now
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
