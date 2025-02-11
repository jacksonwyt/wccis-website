import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Button } from '../../components/ui/Button';
import { 
  Heart, Users, Calculator, FileText, Clock, 
  Building2, Briefcase, Shield 
} from 'lucide-react';
import { ROUTES } from '../../utils/routes';

const WorkersCompensationPage = () => {
  const router = useRouter();

  return (
    <Layout title="Workers Compensation Insurance | WCCIS">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Workers' Compensation Insurance
            </h1>
            <p className="text-xl mb-8">
              Protect your employees and comply with state requirements with comprehensive 
              workers' compensation coverage designed for contractors.
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

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Coverage Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Medical Benefits</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• Emergency care coverage</li>
                <li>• Ongoing medical treatment</li>
                <li>• Rehabilitation services</li>
                <li>• Prescription medications</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Calculator className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Lost Wages</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• Temporary disability benefits</li>
                <li>• Permanent disability benefits</li>
                <li>• Partial wage replacement</li>
                <li>• Long-term disability options</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Legal Protection</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• Employee claim defense</li>
                <li>• Legal fee coverage</li>
                <li>• Compliance assistance</li>
                <li>• Appeal representation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What's Covered</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-3">Work-Related Injuries</h3>
                <p className="text-gray-600">
                  Coverage for injuries that occur during work activities, including:
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Construction site accidents</li>
                  <li>• Falls from heights</li>
                  <li>• Equipment-related injuries</li>
                  <li>• Vehicle accidents during work duties</li>
                  <li>• Repetitive motion injuries</li>
                </ul>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-3">Occupational Illnesses</h3>
                <p className="text-gray-600">
                  Protection against work-related health conditions:
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Respiratory conditions</li>
                  <li>• Chemical exposure effects</li>
                  <li>• Hearing loss</li>
                  <li>• Stress-related conditions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Death Benefits</h3>
                <p className="text-gray-600">
                  Support for families in case of work-related fatalities:
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Funeral expenses</li>
                  <li>• Dependent support</li>
                  <li>• Educational benefits for dependents</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">State Requirements</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="mb-6 text-gray-600">
                Workers' compensation insurance is mandatory in most states for construction companies. 
                Requirements typically depend on:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Required For:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Companies with employees
                    </li>
                    <li className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Specific project requirements
                    </li>
                    <li className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      State licensing compliance
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Penalties for Non-Compliance:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Clock className="w-5 h-5 text-red-500 mr-2" />
                      Substantial fines
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-5 h-5 text-red-500 mr-2" />
                      Legal liability
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-5 h-5 text-red-500 mr-2" />
                      Project disqualification
                    </li>
                  </ul>
                </div>
              </div>
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
        onClick={() => router.push(ROUTES.INSURANCE.QUOTES.WORKERS_COMP)}
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

export default WorkersCompensationPage;