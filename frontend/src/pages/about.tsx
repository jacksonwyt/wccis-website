// src/pages/about.tsx
import type { NextPage } from 'next';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { Building2, Shield, Users, ArrowRight } from "lucide-react";
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
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/30 via-blue-500/20 to-transparent" />
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight text-left mb-6">
              Your Trusted Partner in
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white-700 via-blue-400 to-white-200">
                {" "}Insurance
              </span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Since 1995, we've been protecting California contractors with comprehensive insurance solutions.
            </p>
            <Button
              onClick={() => router.push(ROUTES.CONTACT)}
              className="h-14 px-8 bg-white text-black hover:bg-gray-100 text-lg rounded-none"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10" style={{ animationDelay: '-2s' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-900" />
        </div>
        <div className="container relative z-20 mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Expert Protection",
                description: "Specialized insurance solutions tailored for contractors"
              },
              {
                icon: Users,
                title: "Personal Service",
                description: "Dedicated agents who understand your business needs"
              },
              {
                icon: Building2,
                title: "Industry Knowledge",
                description: "Over 25 years of construction insurance expertise"
              }
            ].map((value) => (
              <div
                key={value.title}
                className="group relative overflow-hidden bg-gradient-to-r from-white/5 to-white/[0.02] p-8 hover:from-white/10 hover:to-white/[0.05] transition-all duration-200 border border-white/10 rounded-none"
              >
                <div className="relative z-20 mb-4 inline-block bg-gradient-to-r from-blue-500/20 to-sky-500/20 p-3 rounded-none">
                  <value.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="relative z-20">
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-200">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10" style={{ animationDelay: '-3s' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-900" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-none">
                <Image
                  src="/images/sections/california-street.jpg"
                  alt="California Street"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/20 via-sky-500/20 to-blue-400/20 blur-2xl opacity-50" />
            </div>
            <div className="relative bg-gradient-to-r from-black/90 to-black/80 p-8 border border-white/10 rounded-none">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 1995, WCCIS has been serving California's construction industry with dedication and expertise. Our journey began with a simple mission: to provide contractors with the comprehensive insurance coverage they need to build with confidence.
                </p>
                <p>
                  Today, we're proud to be one of California's leading independent insurance agencies, specializing in contractor insurance. Our team of experienced professionals understands the unique challenges and risks faced by contractors in today's complex business environment.
                </p>
                <p>
                  We partner with top-rated insurance carriers to offer our clients the best coverage options at competitive rates. Our commitment to personal service and industry expertise has earned us the trust of contractors throughout California.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10" style={{ animationDelay: '-4s' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-900" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Protect Your Business?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let's find the right coverage solution for your contracting business.
            </p>
            <Button
              onClick={() => router.push(ROUTES.INSURE)}
              className="h-14 px-8 bg-white text-black hover:bg-gray-100 text-lg rounded-none"
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

export default AboutPage;
