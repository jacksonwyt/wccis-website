import type { NextPage } from 'next';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { Building2, Shield, Users, ArrowRight, ChevronRight } from "lucide-react";
import { ROUTES } from "@/utils/routes";

const AboutPage: NextPage = () => {
  const router = useRouter();

  return (
    <Layout title="About Us | WCCIS" pageType="info">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center" id="hero-section">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/palm-trees.jpg"
            alt="WCCIS Office"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-500/10 to-transparent" />
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.1s_forwards]">
                  Your Trusted Partner in
                </h1>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.3s_forwards]">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white-700 via-blue-400 to-white-200">
                    Insurance
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.5s_forwards]">
                Since 1995, we've been protecting California contractors with comprehensive insurance solutions.
              </p>
              <div className="opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.7s_forwards]">
                <Button
                  onClick={() => router.push(ROUTES.CONTACT)}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="transition-transform duration-200 hover:translate-x-1 text-lg px-8 py-6"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Static gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-900" />
        </div>
        <div className="container relative z-20 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-gray-300 text-lg">
              Building trust through expertise, personal service, and industry knowledge
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: "Expert Protection",
                description: "Specialized insurance solutions tailored for contractors",
                route: ROUTES.INSURE
              },
              {
                icon: Users,
                title: "Personal Service",
                description: "Dedicated agents who understand your business needs",
                route: ROUTES.CONTACT
              },
              {
                icon: Building2,
                title: "Industry Knowledge",
                description: "Over 25 years of construction insurance expertise",
                route: ROUTES.INSURE
              }
            ].map((value) => (
              <div
                key={value.title}
                className="group relative overflow-hidden bg-gradient-to-r from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-200 border border-white/10"
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-block bg-gradient-to-br from-blue-500/30 to-blue-700/30 p-3">
                    <value.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 mb-6">{value.description}</p>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(value.route)}
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

      {/* Company Story */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Since our founding in 1995, we've been dedicated to providing specialized insurance solutions for contractors across California. 
                Our team's extensive knowledge of the construction industry allows us to offer tailored coverage that protects your business 
                from the unique risks you face.
              </p>
              <p className="text-gray-300 text-lg mb-8">
                As an independent agency, we work with multiple insurance carriers to find the right coverage at competitive rates. 
                Our commitment to personal service means you'll always speak directly with an experienced agent who understands your business needs.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/sections/california-street.jpg"
                  alt="WCCIS Office"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 blur-2xl opacity-50" />
            </div>
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
              Ready to Work With Us?
            </h2>
            <p className="text-gray-200 text-lg mb-8">
              Contact us today to discuss your insurance needs and discover how we can help protect your business.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push(ROUTES.INSURE)}
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
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage; 