// frontend/src/pages/contact.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import FormInput from "@/components/FormInput";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { contactFormSchema, type ContactForm } from "@/utils/validation";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema)
  });

  const { submit, isSubmitting, error } = useFormSubmit({
    submitFn: async (data) => {
      console.log(data);
      reset();
    }
  });

  return (
    <Layout title="Contact Us | WCCIS" pageType="info">
      <section className="relative py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-500/10 to-transparent" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-400">
                {" "}Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Your time is valuable. Get expert, quick answers to your insurance questions by speaking directly with us.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Static gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-gray-900" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-white/5 to-white/[0.02] p-8 border border-white/10 rounded-lg backdrop-blur-sm shadow-xl">
                <form onSubmit={handleSubmit(submit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      id="name"
                      label="Your Name"
                      register={register}
                      error={errors.name}
                    />
                    <FormInput
                      id="email"
                      label="Email Address"
                      type="email"
                      register={register}
                      error={errors.email}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 p-4"
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-400">
                      Failed to send message. Please try again.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-8 bg-white text-black hover:bg-gray-100 transition-all flex items-center group hover:translate-x-1"
                  >
                    Send Message
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-6 rounded-lg backdrop-blur-sm shadow-xl border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Phone</h3>
                    <p className="text-gray-400">Toll Free: 855-376-2200</p>
                    <p className="text-gray-400">Cell: 858-762-2698</p>
                    <p className="text-gray-400">Fax: 1-800-437-1678</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-6 rounded-lg backdrop-blur-sm shadow-xl border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sky-500/10">
                    <Mail className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Email</h3>
                    <p className="text-gray-400">Alyssa@wccis.com</p>
                    <p className="text-sm text-gray-500">24/7 support</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-6 rounded-lg backdrop-blur-sm shadow-xl border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-500/10">
                    <MapPin className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Office</h3>
                    <p className="text-gray-400">
                      San Diego, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[400px] relative">
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 bg-[url('/images/map-placeholder.jpg')] opacity-50 mix-blend-overlay" />
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
