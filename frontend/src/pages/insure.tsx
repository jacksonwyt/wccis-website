import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Shield, HardHat, Truck } from 'lucide-react';
import { ROUTES } from '../utils/routes';

const InsurePage = () => {
  const router = useRouter();

  return (
    <Layout title="Get Insurance Quote | WCCIS">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Coverage Type</h1>
          <p className="text-xl text-gray-600">Select the type of insurance you need a quote for</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
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

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
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

          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
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

        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Need Help Choosing?</h3>
          <p className="text-gray-600 mb-6">Our insurance experts can help you determine the right coverage for your business.</p>
          <Button 
            variant="outline"
            onClick={() => router.push(ROUTES.CONTACT)}
          >
            Contact an Agent
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InsurePage;