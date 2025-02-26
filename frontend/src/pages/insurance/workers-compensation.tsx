import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronRight, Scale, Heart, Briefcase } from "lucide-react";
import { ROUTES } from "@/utils/routes";
import Image from "next/image";

const WorkersCompensationPage = () => {
  const router = useRouter();

  return (
    <Layout title="Workers Compensation Insurance | WCCIS" pageType="insurance">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center" id="hero-section">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/workers.jpg"
            alt="Construction workers on job site"
            fill={true}
            className="object-cover"
            priority={true}
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={85}
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
                  Workers Compensation
                </h1>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.3s_forwards]">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white-700 via-blue-400 to-white-200">
                    Insurance
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl text-left opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.5s_forwards]">
                Protect your employees and your business with comprehensive workers compensation coverage.
              </p>
              <div className="opacity-0 -translate-x-full animate-[slide-in-right_0.7s_0.7s_forwards]">
                <Button
                  onClick={() => router.push(ROUTES.INSURANCE.QUOTES.WORKERS_COMP)}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="transition-transform duration-200 hover:translate-x-1 text-lg px-8 py-6"
                >
                  Get Your Quote
                </Button>
              </div>
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
              Workers Compensation Benefits
            </h2>
            <p className="text-gray-300 text-lg">
              Comprehensive protection for both employers and employees
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Medical Expenses",
                description: "Coverage for medical treatment related to workplace injuries and illnesses",
                icon: Heart,
                route: ROUTES.INSURANCE.QUOTES.WORKERS_COMP,
              },
              {
                title: "Lost Wages",
                description: "Replacement income for employees while they recover from work-related injuries",
                icon: Scale,
                route: ROUTES.INSURANCE.QUOTES.WORKERS_COMP,
              },
              {
                title: "Legal Protection",
                description: "Defense against work-related injury lawsuits by employees",
                icon: Briefcase,
                route: ROUTES.INSURANCE.QUOTES.WORKERS_COMP,
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

      {/* Details Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/sections/sunset-street.jpg"
                  alt="Construction worker with safety equipment"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 blur-2xl opacity-50" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why You Need Workers Compensation Insurance
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Workers compensation insurance is not just a legal requirement in most states—it's a crucial 
                protection for both your business and your employees. It provides benefits to workers who are 
                injured or become ill as a result of their job.
              </p>
              <ul className="space-y-6">
                {[
                  {
                    title: "Legal Compliance",
                    description: "Meet state requirements and avoid penalties for non-compliance",
                    icon: Scale,
                  },
                  {
                    title: "Employee Protection",
                    description: "Provide comprehensive care for injured workers",
                    icon: Heart,
                  },
                  {
                    title: "Business Security",
                    description: "Shield your company from costly lawsuits and claims",
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
              Protect Your Employees Today
            </h2>
            <p className="text-gray-200 text-lg mb-8">
              Get a workers compensation quote tailored to your specific business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push(ROUTES.INSURANCE.QUOTES.WORKERS_COMP)}
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

export default WorkersCompensationPage;
