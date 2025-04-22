import React from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronRight, Truck, Shield, Briefcase } from "lucide-react";
import { ROUTES } from "@/utils/routes";
import animationData from '../../../public/animations/commercialauto.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const CommercialAutoPage = () => {
  const router = useRouter();

  return (
    <Layout title="Commercial Auto Insurance | WCCIS" pageType="insurance">
      {/* Hero Section */}
      {/* <section className="relative min-h-[90vh] flex items-center" id="hero-section"> ... </section> */}

      {/* Details Section - Updated layout */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black pt-24 md:pt-32">
        <div className="container mx-auto px-4">
           {/* Added header for context previously provided by hero */}
           <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Commercial Auto Insurance
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
               Keep your fleet moving forward with comprehensive protection for your business vehicles.
            </p>
          </div>
          {/* Updated grid layout: stack on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Animation moved first visually on mobile */}
            <div className="relative order-1 md:order-2">
              <div className="aspect-square max-w-md mx-auto md:max-w-none">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  className="object-contain w-full h-full"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 blur-2xl opacity-50" />
            </div>
            {/* Text content moved second visually on mobile */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why You Need Commercial Auto Insurance
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Commercial auto insurance is essential for businesses that use vehicles for work purposes.
                It provides specialized coverage beyond personal auto policies, protecting your business
                when employees drive company vehicles or use their personal vehicles for business tasks.
              </p>
              <ul className="space-y-6">
                {[
                  {
                    title: "Liability Protection",
                    description: "Coverage for property damage or bodily injury caused by your business vehicles",
                    icon: Shield,
                  },
                  {
                    title: "Vehicle Protection",
                    description: "Comprehensive and collision coverage for your commercial fleet",
                    icon: Truck,
                  },
                  {
                    title: "Business Continuity",
                    description: "Minimize disruptions with coverage for business interruptions due to vehicle issues",
                    icon: Briefcase,
                  },
                ].map((feature) => (
                  <li
                    key={feature.title}
                    className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/[0.07] transition-colors border border-white/10"
                  >
                    <div className="p-2 bg-gradient-to-br from-blue-500/30 to-blue-700/30">
                      <feature.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Static gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-900" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Commercial Auto Benefits
            </h2>
            <p className="text-gray-300 text-lg">
              Comprehensive protection for your business vehicles and drivers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Liability Coverage",
                description: "Protection against third-party claims for bodily injury and property damage",
                icon: Shield,
                route: ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO,
              },
              {
                title: "Physical Damage",
                description: "Comprehensive and collision coverage for your vehicles regardless of fault",
                icon: Truck,
                route: ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO,
              },
              {
                title: "Business Protection",
                description: "Specialized coverage options for your commercial vehicles and operations",
                icon: Briefcase,
                route: ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden bg-gradient-to-r from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-200 border border-white/10"
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-block bg-gradient-to-br from-blue-500/30 to-blue-700/30 p-3">
                    <item.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-6">{item.description}</p>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(item.route)}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                    className="text-blue-400 hover:text-blue-300 p-0"
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

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gray-900">
        {/* Static gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-400/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-300/10" />
          <div className="absolute inset-0 bg-gray-900/90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Protect Your Fleet Today
            </h2>
            <p className="text-gray-200 text-lg mb-8">
              Get a commercial auto insurance quote tailored to your specific business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push(ROUTES.INSURANCE.QUOTES.COMMERCIAL_AUTO)}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="transition-transform duration-200 hover:translate-x-1 text-lg px-8 py-6"
              >
                Get Your Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push(ROUTES.CONTACT)}
                className="text-white border-white/30 hover:bg-white/10 transition-transform duration-200 hover:translate-x-1 text-lg px-8 py-6"
              >
                Speak with an Agent
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommercialAutoPage;
