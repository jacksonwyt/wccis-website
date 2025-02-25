// frontend/src/pages/blog/index.tsx
import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  slug: string;
  category: string;
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding General Liability Insurance for Contractors",
    excerpt: "Learn about essential coverage to protect your business.",
    date: "2024-02-12",
    readTime: "5 min read",
    author: "John Doe",
    slug: "understanding-general-liability",
    category: "Insurance Basics"
  },
  {
    id: "2",
    title: "Workers Compensation Requirements in California",
    excerpt: "A comprehensive guide to workers comp insurance for contractors in California.",
    date: "2024-02-10",
    readTime: "7 min read",
    author: "Jane Smith",
    slug: "workers-comp-requirements-california",
    category: "Compliance"
  }
];

const BlogPage = () => {
  return (
    <Layout title="Insurance Blog | WCCIS">
      <section className="relative py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-500/10 to-transparent animate-hero-pulse" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Insurance
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-400">
                {" "}Insights
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Expert advice and industry updates to help protect your business
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="h-full bg-gradient-to-r from-white/5 to-white/[0.02] p-6 hover:from-white/10 hover:to-white/[0.05] transition-all duration-200 border border-white/10">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-6">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-blue-400 text-sm group-hover:translate-x-1 transition-transform">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 mt-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-sky-500/10 p-8 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 mb-6">
              Get the latest insurance tips and industry insights delivered to your inbox.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-black hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
