import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Shield, HardHat, Truck } from 'lucide-react';
import { ROUTES } from '../utils/routes';

const InsurePage = () => {
  const router = useRouter();

  return (
    <Layout title="Get Insurance Quote | WCCIS">
      {/* Hero Section with Road Image */}
      <div className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/palm-road.jpg"
            alt="Start your journey with WCCIS"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-blue-700/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Journey with Us
            </h1>
            <p className="text-xl mb-8 text-blue-50">
              Choose your coverage type below and take the first step towards comprehensive protection for your business.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center hover:shadow-2xl transition-shadow transform hover:-translate-y-1 duration-300">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">General Liability</h2>
            <p className="text-gray-600 mb-6">Protect your business from third-party claims and property damage</p>
            <Button 
              onClick={() => router.push(ROUTES.INSURANCE.QUOTES.GENERAL_LIABILITY)}
              className="w-full"
            >
              Get GL Quote
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 text-center hover:shadow-2xl transition-shadow transform hover:-translate-y-1 duration-300">
            <HardHat className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Workers Comp</h2>
            <p className="text-gray-600 mb-6">Protect your employees and comply with state requirements</p>
            <Button 
              onClick={() => router.push(ROUTES.INSURANCE.QUOTES.WORKERS_COMP)}
              className="w-full"
            >
              Get WC Quote
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 text-center hover:shadow-2xl transition-shadow transform hover:-translate-y-1 duration-300">
            <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Commercial Auto</h2>
            <p className="text-gray-600 mb-6">Comprehensive coverage for your business vehicles</p>
            <Button 
              onClick={() => router.push(ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO)}
              className="w-full"
            >
              Get Auto Quote
            </Button>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Need Help Choosing?</h3>
          <p className="text-gray-600 mb-6">Our insurance experts can help you determine the right coverage for your business.</p>
          <Button 
            variant="secondary"
            onClick={() => router.push(ROUTES.CONTACT)}
            className="px-8"
          >
            Contact an Agent
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InsurePage;