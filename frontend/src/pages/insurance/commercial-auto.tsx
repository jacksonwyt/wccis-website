import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Button } from '../../components/ui/Button';
import { 
  Car, ShieldCheck, Truck, Wrench,
  Building, Scale, AlertTriangle 
} from 'lucide-react';
import { ROUTES } from '../../utils/routes';
import Image from 'next/image';

const CommercialAutoPage = () => {
  const router = useRouter();

  return (
    <Layout title="Commercial Auto Insurance | WCCIS">
      {/* Hero Section */}
      <section className="relative text-white py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/auto.jpg"
            alt="Commercial Auto Fleet"
            fill
            className="object-cover object-[center_70%]"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-blue-700/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Commercial Auto Insurance for Contractors
            </h1>
            <p className="text-xl mb-8">
              Comprehensive coverage for your work vehicles, tools, and equipment. 
              Protect your fleet and keep your business moving forward.
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

      {/* Core Coverages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Essential Coverage Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Car className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Liability Coverage</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• Bodily injury coverage</li>
                <li>• Property damage protection</li>
                <li>• Legal defense costs</li>
                <li>• Third-party claims</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Wrench className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Physical Damage</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• Collision coverage</li>
                <li>• Comprehensive protection</li>
                <li>• Equipment coverage</li>
                <li>• Custom additions</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Truck className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Additional Protection</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• Hired auto coverage</li>
                <li>• Non-owned auto coverage</li>
                <li>• Rental reimbursement</li>
                <li>• Towing coverage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contractor-Specific Features</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-3">
                    <Wrench className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold">Tools & Equipment</h3>
                  </div>
                  <p className="text-gray-600">
                    Coverage for tools and equipment transported in your vehicles:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Power tools and equipment</li>
                    <li>• Permanently installed equipment</li>
                    <li>• Custom vehicle modifications</li>
                  </ul>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center mb-3">
                    <Building className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold">Jobsite Coverage</h3>
                  </div>
                  <p className="text-gray-600">
                    Protection while operating at construction sites:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Loading/unloading coverage</li>
                    <li>• Jobsite liability protection</li>
                    <li>• Mobile equipment coverage</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <ShieldCheck className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold">Fleet Management</h3>
                  </div>
                  <p className="text-gray-600">
                    Comprehensive fleet management solutions:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Multiple vehicle discounts</li>
                    <li>• Driver safety programs</li>
                    <li>• GPS tracking benefits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Coverage Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Minimum Coverage</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Bodily Injury (per person)</span>
                  <span className="font-medium">$100,000</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Bodily Injury (per accident)</span>
                  <span className="font-medium">$300,000</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Property Damage</span>
                  <span className="font-medium">$50,000</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recommended Coverage</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Combined Single Limit</span>
                  <span className="font-medium">$1,000,000</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Comprehensive Deductible</span>
                  <span className="font-medium">$500-$1,000</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Collision Deductible</span>
                  <span className="font-medium">$500-$1,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Risk Management</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Safety Program</h3>
                  <p className="text-gray-600">
                    Implement a comprehensive driver safety program to reduce risks and potentially lower premiums:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Regular driver training</li>
                    <li>• Vehicle maintenance schedules</li>
                    <li>• Safety equipment requirements</li>
                    <li>• Incident reporting procedures</li>
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
        onClick={() => router.push(ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO)}
        variant="white"
        className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg"
      >
        Get Your Free Quote
      </Button>
      <Button 
        onClick={() => router.push(ROUTES.CONTACT)}
        className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
        variant="outline"
      >
        Speak to an Agent
      </Button>
    </div>
  </div>
</section>
    </Layout>
  );
};

export default CommercialAutoPage;