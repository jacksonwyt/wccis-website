import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { Car, Wrench, Truck } from "lucide-react";
import Image from "next/image";
import { ROUTES } from "@/utils/routes";

const CommercialAutoPage = () => {
  const router = useRouter();
  return (
    <Layout title="Commercial Auto Insurance | WCCIS">
      <section className="relative text-futuristic-light py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/auto.jpg"
            alt="Commercial Auto Fleet"
            layout="fill"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-futuristic-surface/40 to-futuristic-accent/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Commercial Auto Insurance for Contractors
            </h1>
            <p className="text-xl mb-8">
              Comprehensive coverage for your work vehicles, tools, and equipment.
            </p>
            <Button
              onClick={() => router.push(ROUTES.INSURE)}
              variant="primary"
              className="px-8 py-4 text-lg"
            >
              Get Your Quote
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-futuristic-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-futuristic-light">
            Essential Coverage Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-futuristic-bg rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Car className="w-8 h-8 text-futuristic-accent mr-3" />
                <h3 className="text-xl font-semibold text-futuristic-light">Liability Coverage</h3>
              </div>
              <ul className="space-y-3 text-futuristic-light/70">
                <li>Bodily injury coverage</li>
                <li>Property damage protection</li>
                <li>Legal defense costs</li>
                <li>Third-party claims</li>
              </ul>
            </div>
            <div className="bg-futuristic-bg rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Wrench className="w-8 h-8 text-futuristic-accent mr-3" />
                <h3 className="text-xl font-semibold text-futuristic-light">Physical Damage</h3>
              </div>
              <ul className="space-y-3 text-futuristic-light/70">
                <li>Collision coverage</li>
                <li>Comprehensive protection</li>
                <li>Equipment coverage</li>
              </ul>
            </div>
            <div className="bg-futuristic-bg rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Truck className="w-8 h-8 text-futuristic-accent mr-3" />
                <h3 className="text-xl font-semibold text-futuristic-light">Additional Protection</h3>
              </div>
              <ul className="space-y-3 text-futuristic-light/70">
                <li>Hired auto coverage</li>
                <li>Non-owned auto coverage</li>
                <li>Rental reimbursement</li>
                <li>Towing coverage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-futuristic-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-futuristic-bg">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-futuristic-bg/80">
            Get a customized quote tailored to your business needs.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => router.push(ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO)}
              variant="primary"
              className="px-8 py-4 text-lg"
            >
              Get Your Free Quote
            </Button>
            <Button
              onClick={() => router.push(ROUTES.CONTACT)}
              variant="secondary"
              className="px-8 py-4 text-lg"
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
