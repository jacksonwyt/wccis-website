// frontend/src/pages/index.tsx
import React from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';

import Layout from "@/components/Layout";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Shield, Scale, ThumbsUp, ChevronRight } from "lucide-react";
import { ROUTES } from "@/utils/routes";
import { getImageProps } from "@/utils/image-config";
import whyChooseUsAnimation from '../../public/animations/whychooseus.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const HomePage = () => {
  const router = useRouter();


  return (
    <Layout title="WCCIS - Independent Insurance Agency for Contractors" pageType="home">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[90vh] flex items-center" id="hero-section">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/sunset-skyline.jpg"
            alt="City skyline at sunset"
            fill={true}
            className="object-cover"
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            quality={75}
            onLoad={() => {
              // Force garbage collection hint when image loads
              if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                // @ts-ignore - Using non-standard API
                window.requestIdleCallback(() => {
                  // This empty callback helps trigger GC when browser is idle
                });
              }
            }}
          />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-500/10 to-transparent" />
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.1s_forwards]">
                  The Independent Contractors
                </h1>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.3s_forwards]">
                  <span className="bg-clip-text bg-gradient-to-r text-transparent from-blue-400 via-white-400 to-blue-200">
                    Insurance Agency on the West Coast
                  </span>
                </h1>
              </div>
              
            </div>
          </div>
          {/* Call to Action Buttons Moved Here */}
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push(ROUTES.INSURE)}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="transition-transform duration-200 hover:translate-x-1 text-lg"
              >
                Get Your Free Quote Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push(ROUTES.CONTACT)}
                className="text-white border-white/30 hover:bg-white/10 transition-transform duration-200 hover:translate-x-1 text-lg"
              >
                Speak with an Agent
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* Insurance Types - Inspired by Stripe's card layout */}
      <section className=" bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Static gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-900" />
        </div>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Comprehensive Coverage Options
            </h2>
            <p className="text-gray-300 text-lg">
              Choose from our range of insurance products designed specifically for contractors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                title: "General Liability",
                description: "Essential coverage for third-party claims and property damage",
                route: ROUTES.INSURANCE.GENERAL_LIABILITY,
                icon: Shield,
              },
              {
                title: "Workers Compensation",
                description: "Protect your employees and comply with state requirements",
                route: ROUTES.INSURANCE.WORKERS_COMP,
                icon: Scale,
              },
              {
                title: "Commercial Auto",
                description: "Coverage for your business vehicles and equipment",
                route: ROUTES.INSURANCE.COMMERCIAL_AUTO,
                icon: ThumbsUp,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden bg-gradient-to-r from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-200 border border-white/10"
              >
                <div className="relative z-10">
                  <div className=" inline-block bg-gradient-to-br from-blue-500/30 to-blue-700/30 p-3">
                    <item.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(item.route)}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Learn More
                  </Button>
                </div>

                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Inspired by Frame.io's clean layout */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Text content first */}
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 text-center md:text-left">
                Why Choose WCCIS?
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 text-center md:text-left">
                Your time is valuable. Get expert, quick answers to your insurance questions by speaking directly with us.
                No third party services, no waiting for hours to get answers.
              </p>
              <ul className="space-y-4 md:space-y-6">
                {[
                  {
                    title: "96% Client Retention",
                    description: "Over 25 years of serving contractors of all sizes",
                    icon: Shield,
                  },
                  {
                    title: "Direct Access",
                    description: "Speak directly with your agent - no middleman",
                    icon: Scale,
                  },
                  {
                    title: "Same Day Service",
                    description: "Quick quotes and fast service",
                    icon: ThumbsUp,
                  },
                ].map((feature) => (
                  <li
                    key={feature.title}
                    className="flex items-start gap-2 md:gap-4 p-3 md:p-4 bg-white/5 hover:bg-white/[0.07] transition-colors border border-white/10"
                  >
                    <div className="p-1.5 md:p-2 bg-gradient-to-br from-blue-500/30 to-blue-700/30">
                      <feature.icon className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white text-sm md:text-base font-medium mb-0.5 md:mb-1">{feature.title}</h3>
                      <p className="text-gray-300 text-xs md:text-sm">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Animation second */}
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <Lottie
                  animationData={whyChooseUsAnimation}
                  loop={true}
                  autoplay={true}
                  className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-full"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 blur-2xl opacity-50" />
            </div>
          </div>


        </div>
      </section>

      {/* CTA Section - Inspired by Stripe's gradient call-to-action */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gray-900">
        {/* Static gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-400/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-300/10" />
          <div className="absolute inset-0 bg-gray-900/90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-200 text-base md:text-lg mb-6 md:mb-8">
              As an independent agent, I can better match your needs with the right company to save you money.
              The finest compliment I can receive is a referral from you! Thank you for your trust.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(ROUTES.INSURE)}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Get Your Quote Now
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
