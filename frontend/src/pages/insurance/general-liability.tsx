import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Button } from '../../components/ui/Button';
import { Shield, Hammer, HardHat, Building, Scale, DollarSign } from 'lucide-react';
import { ROUTES } from '../../utils/routes';

const GeneralLiabilityPage = () => {
  const router = useRouter();

  return (
    <Layout title="General Liability Insurance | WCCIS">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              General Liability Insurance for Contractors
            </h1>
            <p className="text-xl mb-8">
              Protect your contracting business from third-party claims of bodily injury, 
              property damage, and advertising injury.
            </p>
            <Button 
              onClick={() => router.push(ROUTES.INSURE)}
              variant="white"
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              Get Your Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What's Covered</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Building className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Property Damage</h3>
              </div>
              <p className="text-gray-600">
                Coverage for damage to client's property during your work, including:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Accidental damage to existing structures</li>
                <li>• Water damage from plumbing work</li>
                <li>• Equipment-related damage</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <HardHat className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Bodily Injury</h3>
              </div>
              <p className="text-gray-600">
                Protection against claims of injury to third parties, including:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Client injuries at worksite</li>
                <li>• Injuries from completed operations</li>
                <li>• Visitor accidents</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Scale className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Legal Defense</h3>
              </div>
              <p className="text-gray-600">
                Legal protection and defense costs coverage:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Attorney fees</li>
                <li>• Court costs</li>
                <li>• Settlement expenses</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Limits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Coverage Limits</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Standard Coverage Options:</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-medium">Per Occurrence Limit</span>
                  <span className="text-blue-600">$1,000,000</span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-medium">General Aggregate Limit</span>
                  <span className="text-blue-600">$2,000,000</span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-medium">Products-Completed Operations Aggregate</span>
                  <span className="text-blue-600">$2,000,000</span>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-medium">Personal & Advertising Injury</span>
                  <span className="text-blue-600">$1,000,000</span>
                </div>
                <div className="flex justify-between items-center pb-4">
                  <span className="font-medium">Damage to Rented Premises</span>
                  <span className="text-blue-600">$100,000</span>
                </div>
              </div>
              <p className="mt-6 text-gray-600 text-sm">
                * Higher limits available upon request. Actual limits and premiums will be determined 
                based on your business needs and risk factors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs It */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Who Needs General Liability Insurance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Required For:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  State licensing requirements
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  Client contracts
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  Commercial lease agreements
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  Government contracts
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recommended For:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Hammer className="w-5 h-5 text-blue-500 mr-2" />
                  General Contractors
                </li>
                <li className="flex items-center">
                  <Hammer className="w-5 h-5 text-blue-500 mr-2" />
                  Subcontractors
                </li>
                <li className="flex items-center">
                  <Hammer className="w-5 h-5 text-blue-500 mr-2" />
                  Specialty Contractors
                </li>
                <li className="flex items-center">
                  <Hammer className="w-5 h-5 text-blue-500 mr-2" />
                  Handyman Services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
    <p className="text-xl mb-8 max-w-2xl mx-auto">
      Get a customized quote tailored to your business needs.
    </p>
    <div className="flex justify-center gap-4">
      <Button 
        onClick={() => router.push(ROUTES.INSURANCE.QUOTES.GENERAL_LIABILITY)}
        variant="white"
        className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg"
      >
        Get Your Free Quote
      </Button>
      <Button 
        variant="outline"
        onClick={() => router.push(ROUTES.CONTACT)}
        className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
      >
        Speak to an Agent
      </Button>
    </div>
  </div>
</section>
    </Layout>
  );
};

export default GeneralLiabilityPage;