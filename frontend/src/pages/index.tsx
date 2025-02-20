// frontend/src/pages/index.tsx
import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Shield, Scale, ThumbsUp } from "lucide-react";
import { ROUTES } from "@/utils/routes";

const HomePage = () => {
  const router = useRouter();
  return (
    <Layout title="WCCIS - Independent Insurance Agency for Contractors">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/sunset-skyline.jpg"
            alt="San Diego Skyline"
            layout="fill"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-futuristic-surface/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-futuristic-light mb-6">
              Your Independent Agent for Contractor Insurance
            </h1>
            <p className="text-xl mb-8 text-futuristic-light">
              We compare rates from multiple carriers to find you the best coverage at competitive prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => router.push(ROUTES.INSURE)} variant="primary" className="px-8 py-4 text-lg">
                Get Your Quote
              </Button>
              <Button onClick={() => router.push(ROUTES.CONTACT)} variant="secondary" className="px-8 py-4 text-lg">
                Speak with an Agent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-futuristic-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Shield className="w-12 h-12 text-futuristic-accent" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-futuristic-surface">Multiple Carriers</h3>
                <p className="text-futuristic-surface/70">
                  We work with top-rated insurance companies to find you the best rates.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Scale className="w-12 h-12 text-futuristic-accent" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-futuristic-surface">Compare Options</h3>
                <p className="text-futuristic-surface/70">
                  Get quotes from multiple insurers with one simple application.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ThumbsUp className="w-12 h-12 text-futuristic-accent" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-futuristic-surface">Expert Guidance</h3>
                <p className="text-futuristic-surface/70">
                  Specializing in contractor insurance for over 15 years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-futuristic-surface py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-futuristic-light">Ready to Find Better Coverage?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-futuristic-light/80">
            Let us shop multiple carriers to find you the best coverage at competitive rates.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => router.push(ROUTES.INSURE)} variant="primary" className="px-8 py-4 text-lg">
              Get Your Quote Here!
            </Button>
            <Button onClick={() => router.push(ROUTES.CONTACT)} variant="secondary" className="px-8 py-4 text-lg">
              Speak with an Agent
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
