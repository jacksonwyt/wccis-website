// src/pages/insure.tsx
// src/pages/insure.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Shield, HardHat, Truck, ArrowRight, Phone } from 'lucide-react';
import { ROUTES } from '@/utils/routes';

const InsurePage = () => {
  const router = useRouter();

  return (
    <Layout title="Get Insurance Quote | WCCIS" pageType="insurance">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
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
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/80" />
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
          </div>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 mb-6">
              Insurance Solutions
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Protect What Matters
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {" "}Most
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Choose your coverage type below and take the first step towards comprehensive protection for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Options Section */}
      <section className="relative py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* General Liability Card */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-300">
              <div className="mb-6 inline-block rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">General Liability</h2>
              <p className="text-gray-400 mb-8">Protect your business from third-party claims and property damage</p>
              <Button 
                onClick={() => router.push(ROUTES.INSURANCE.QUOTES.GENERAL_LIABILITY)}
                className="w-full bg-white/10 text-white hover:bg-white/20 group"
              >
                Get GL Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Workers Comp Card */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-300">
              <div className="mb-6 inline-block rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3">
                <HardHat className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Workers Comp</h2>
              <p className="text-gray-400 mb-8">Protect your employees and comply with state requirements</p>
              <Button 
                onClick={() => router.push(ROUTES.INSURANCE.QUOTES.WORKERS_COMP)}
                className="w-full bg-white/10 text-white hover:bg-white/20 group"
              >
                Get WC Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Commercial Auto Card */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-300">
              <div className="mb-6 inline-block rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3">
                <Truck className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Commercial Auto</h2>
              <p className="text-gray-400 mb-8">Comprehensive coverage for your business vehicles</p>
              <Button 
                onClick={() => router.push(ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO)}
                className="w-full bg-white/10 text-white hover:bg-white/20 group"
              >
                Get Auto Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Need Help Section */}
          <div className="mt-16 relative rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Need Help Choosing?</h3>
                </div>
                <p className="text-gray-300">
                  Our insurance experts can help you determine the right coverage for your business.
                  Get personalized guidance to protect your business effectively.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Button
                  onClick={() => router.push(ROUTES.CONTACT)}
                  className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 text-lg group"
                >
                  Contact an Agent
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InsurePage;