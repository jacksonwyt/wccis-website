// src/pages/insure.tsx
// src/pages/insure.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Shield, HardHat, Truck, ArrowRight, Phone, ChevronRight } from 'lucide-react';
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
          {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/80" /> */}
          
          {/* Static gradient overlay */}
          {/* <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
          </div> */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-500/10 to-transparent" />
          </div>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 mb-6">
              Insurance Solutions
            </span> */}
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.1s_forwards]">
                Protect What Matters
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.3s_forwards]">
              <span className="bg-clip-text bg-gradient-to-r text-transparent from-blue-400 via-white-400 to-blue-200">
                Most
              </span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.5s_forwards]">
              Choose your coverage type below and take the first step towards comprehensive protection for your business.
            </p>
            
          </div>
        </div>
      </section>

      {/* Insurance Options Section */}
      <section className="relative py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-900" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {/* General Liability Card - Updated Styling */}
            <div className="group relative overflow-hidden bg-gradient-to-r from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-200 border border-white/10">
              <div className="relative z-10">
                <div className="mb-4 inline-block bg-gradient-to-br from-blue-500/30 to-blue-700/30 p-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">General Liability</h2>
                <p className="text-gray-300 mb-6">Protect your business from third-party claims and property damage</p>
                <Button 
                  variant="ghost"
                  onClick={() => router.push(ROUTES.INSURANCE.QUOTES.GENERAL_LIABILITY)}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="text-blue-400 hover:text-blue-300 p-0"
                >
                  Get GL Quote
                </Button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Workers Comp Card - Updated Styling */}
            <div className="group relative overflow-hidden bg-gradient-to-r from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-200 border border-white/10">
              <div className="relative z-10">
                <div className="mb-4 inline-block bg-gradient-to-br from-blue-500/30 to-blue-700/30 p-3">
                  <HardHat className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">Workers Comp</h2>
                <p className="text-gray-300 mb-6">Protect your employees and comply with state requirements</p>
                <Button 
                  variant="ghost"
                  onClick={() => router.push(ROUTES.INSURANCE.QUOTES.WORKERS_COMP)}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="text-blue-400 hover:text-blue-300 p-0"
                >
                  Get WC Quote
                </Button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Commercial Auto Card - Updated Styling */}
            <div className="group relative overflow-hidden bg-gradient-to-r from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-200 border border-white/10">
              <div className="relative z-10">
                <div className="mb-4 inline-block bg-gradient-to-br from-blue-500/30 to-blue-700/30 p-3">
                  <Truck className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">Commercial Auto</h2>
                <p className="text-gray-300 mb-6">Comprehensive coverage for your business vehicles</p>
                <Button 
                  variant="ghost"
                  onClick={() => router.push(ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO)}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="text-blue-400 hover:text-blue-300 p-0"
                >
                  Get Auto Quote
                </Button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Need Help Section - Updated Background */}
          <div className="mt-16 relative rounded-2xl bg-gray-900/90 p-8">
            { /* Added consistent background gradients */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-400/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-300/10" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
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