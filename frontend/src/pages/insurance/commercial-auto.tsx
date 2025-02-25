import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/utils/routes";

const CommercialAutoPage = () => {
  const router = useRouter();

  return (
    <Layout title="Commercial Auto Insurance | WCCIS">
      {/* Hero Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                Commercial Auto Insurance
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Keep Your Fleet Moving Forward
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Comprehensive protection for your business vehicles and the drivers who operate them.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => router.push(ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                Get Your Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(ROUTES.CONTACT)}
                className="px-6 py-2 text-white border border-white/30 hover:bg-white/10 transition-colors"
              >
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Content Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            What Commercial Auto Insurance Covers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Liability Coverage</h3>
              <p className="text-gray-300">Protection against third-party claims for bodily injury and property damage.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Physical Damage</h3>
              <p className="text-gray-300">Comprehensive protection for your vehicles and equipment.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Additional Protection</h3>
              <p className="text-gray-300">Extended coverage options for complete peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Protect Your Fleet Today
            </h2>
            <p className="text-gray-300 mb-8">
              Get comprehensive commercial auto coverage tailored to your business needs.
            </p>
            <Button
              onClick={() => router.push(ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO)}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              Get Your Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommercialAutoPage;
