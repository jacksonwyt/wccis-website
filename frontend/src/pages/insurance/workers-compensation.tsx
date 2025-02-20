import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { Heart, Calculator, Shield } from "lucide-react";
import { ROUTES } from "@/utils/routes";

const WorkersCompensationPage = () => {
  const router = useRouter();
  return (
    <Layout title="Workers Compensation Insurance | WCCIS">
      <section className="relative text-futuristic-light py-24">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/workers.jpg"
            alt="Workers at Construction Site"
            layout="fill"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-futuristic-surface/40 to-futuristic-accent/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Workers' Compensation Insurance</h1>
            <p className="text-xl mb-8">
              Protect your employees and ensure compliance with state requirements.
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-futuristic-light">
            Coverage Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-futuristic-bg rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-futuristic-accent mr-3" />
                <h3 className="text-xl font-semibold text-futuristic-light">Medical Benefits</h3>
              </div>
              <ul className="space-y-3 text-futuristic-light/70">
                <li>Emergency care coverage</li>
                <li>Ongoing treatment</li>
                <li>Rehabilitation services</li>
                <li>Prescription medications</li>
              </ul>
            </div>
            <div className="bg-futuristic-bg rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Calculator className="w-8 h-8 text-futuristic-accent mr-3" />
                <h3 className="text-xl font-semibold text-futuristic-light">Lost Wages</h3>
              </div>
              <ul className="space-y-3 text-futuristic-light/70">
                <li>Temporary disability benefits</li>
                <li>Permanent disability benefits</li>
                <li>Partial wage replacement</li>
                <li>Long-term options</li>
              </ul>
            </div>
            <div className="bg-futuristic-bg rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-futuristic-accent mr-3" />
                <h3 className="text-xl font-semibold text-futuristic-light">Legal Protection</h3>
              </div>
              <ul className="space-y-3 text-futuristic-light/70">
                <li>Legal defense coverage</li>
                <li>Attorney fees</li>
                <li>Court costs</li>
                <li>Settlement expenses</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-futuristic-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-futuristic-bg">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-futuristic-bg/80">
            Receive a customized quote tailored to your business needs.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => router.push(ROUTES.INSURANCE.QUOTES.WORKERS_COMP)}
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

export default WorkersCompensationPage;
