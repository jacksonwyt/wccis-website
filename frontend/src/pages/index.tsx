import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Building2, Scale, Shield, Clock, ThumbsUp, Users } from 'lucide-react';
import { ROUTES } from '../utils/routes';

const HomePage = () => {
  const router = useRouter();

  return (
    <Layout title="WCCIS - Independent Insurance Agency for Contractors">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/sunset-skyline.jpg"
            alt="San Diego Skyline"
            fill
            className="object-cover object-[center_20%]"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Your Independent Agent for Contractor Insurance
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              We compare rates from multiple carriers to find you the best coverage at competitive prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => router.push(ROUTES.INSURE)}
                variant="white"
                className="px-8 py-4 text-lg"
              >
                Get Your Quote
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push(ROUTES.CONTACT)}
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Speak with an Agent
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Shield className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Multiple Carriers</h3>
                <p className="text-gray-600">We work with top-rated insurance companies to find you the best rates</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Scale className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Compare Options</h3>
                <p className="text-gray-600">Get quotes from multiple insurers with one simple application</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ThumbsUp className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-600">Specializing in contractor insurance for over 15 years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Insurance Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {['A+ Rated', 'Competitive Rates', 'Contractor Specialists', 'Fast Claims'].map((feature) => (
              <div key={feature} className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                <span className="text-lg font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Coverage Options</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold mb-4">General Liability</h3>
        <p className="text-gray-600 mb-6">Compare liability coverage options from multiple carriers.</p>
        <div className="space-y-3">
          <Link 
            href={ROUTES.INSURANCE.GENERAL_LIABILITY}
            className="text-blue-600 font-semibold hover:text-blue-700 block"
          >
            Learn More →
          </Link>
          <Link 
            href={ROUTES.INSURANCE.QUOTES.GENERAL_LIABILITY}
            className="inline-block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold mb-4">Workers Compensation</h3>
        <p className="text-gray-600 mb-6">Find competitive workers comp rates for your team.</p>
        <div className="space-y-3">
          <Link 
            href={ROUTES.INSURANCE.WORKERS_COMP}
            className="text-blue-600 font-semibold hover:text-blue-700 block"
          >
            Learn More →
          </Link>
          <Link 
            href={ROUTES.INSURANCE.QUOTES.WORKERS_COMP}
            className="inline-block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-semibold mb-4">Commercial Auto</h3>
        <p className="text-gray-600 mb-6">Get quotes from multiple auto insurance carriers.</p>
        <div className="space-y-3">
          <Link 
            href={ROUTES.INSURANCE.COMMERCIAL_AUTO}
            className="text-blue-600 font-semibold hover:text-blue-700 block"
          >
            Learn More →
          </Link>
          <Link 
            href={ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO}
            className="inline-block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Better Coverage?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us shop multiple carriers to find you the best coverage at competitive rates.
          </p>
          <div className="flex justify-center gap-4">
          <Button 
  onClick={() => router.push(ROUTES.INSURE)}
  variant="white"  // <-- Add this
  className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg"
>
  Get Your Quote Here!
</Button>
            <Button 
              variant="outline"
              onClick={() => router.push(ROUTES.CONTACT)}
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Speak with an Agent
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Contact Your Agent</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-lg">Independent Agency</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-6 h-6 text-blue-600" />
                <span className="text-lg">123 Insurance Ave, Suite 100</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-lg">Open 8AM-6PM M-F</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;