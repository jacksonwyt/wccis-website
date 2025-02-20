// frontend/src/pages/insurance/general-liability.tsx
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { Shield, HardHat, Building, Scale } from "lucide-react";
import { ROUTES } from "@/utils/routes";

const GeneralLiabilityPage = () => {
  const router = useRouter();
  return (
    <Layout title="General Liability Insurance | WCCIS">
      <section className="relative py-24 text-futuristic-light">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/constructionsite.jpg"
            alt="Construction Site"
            layout="fill"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-futuristic-surface/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              General Liability Insurance for Contractors
            </h1>
            <p className="text-xl mb-8 text-futuristic-light/90">
              Protect your contracting business from third-party claims.
            </p>
            <Button
              onClick={() => router.push(ROUTES.INSURANCE.QUOTES.GENERAL_LIABILITY)}
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
            What's Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-futuristic-bg rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Building className="w-8 h-8 text-futuristic-accent mr-3" />
                <h3 className="text-xl font-semibold text-futuristic-light">Property Damage</h3>
              </div>
              <p className="text-futuristic-light/70">
                Coverage for damage to client's property during your work.
              </p>
            </div>
            <div className="bg-futuristic-bg rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-futuristic-accent mr-3" />
                <h3 className="text-xl font-semibold text-futuristic-light">Bodily Injury</h3>
              </div>
              <p className="text-futuristic-light/70">
                Protection against claims of injury to third parties.
              </p>
            </div>
            <div className="bg-futuristic-bg rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Scale className="w-8 h-8 text-futuristic-accent mr-3" />
                <h3 className="text-xl font-semibold text-futuristic-light">Legal Defense</h3>
              </div>
              <p className="text-futuristic-light/70">
                Coverage for legal fees and defense costs.
              </p>
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
              onClick={() => router.push(ROUTES.INSURANCE.QUOTES.GENERAL_LIABILITY)}
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

export default GeneralLiabilityPage;
