// frontend/src/pages/blog/index.tsx
import React from "react";
import Layout from "@/components/Layout";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

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
    category: "Insurance Basics",
  },
  {
    id: "2",
    title: "Workers Compensation Requirements in California",
    excerpt: "A comprehensive guide to workers comp insurance for contractors in California.",
    date: "2024-02-10",
    readTime: "7 min read",
    author: "Jane Smith",
    slug: "workers-comp-requirements-california",
    category: "Compliance",
  },
];

const BlogPage = () => {
  return (
    <Layout title="Insurance Blog | WCCIS">
      <section className="bg-gradient-to-r from-futuristic-surface to-futuristic-accent text-futuristic-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Insurance Blog</h1>
            <p className="text-xl mb-4">
              Stay updated with the latest tips and insights on insurance.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <article
                key={post.id}
                className="bg-futuristic-bg rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="p-6">
                  <div className="text-sm text-futuristic-accent mb-2">{post.category}</div>
                  <h2 className="text-xl font-semibold mb-3">
                    <Link href={`/blog/${post.slug}`}>
                      <a className="hover:text-futuristic-accent transition-colors">{post.title}</a>
                    </Link>
                  </h2>
                  <p className="text-futuristic-light/70 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-futuristic-light/60 space-x-4">
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
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16">
          <div className="bg-futuristic-bg rounded-lg p-8 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4 text-futuristic-light">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-futuristic-light/70 mb-6">
              Get the latest insurance tips and industry insights delivered to your inbox.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-futuristic-accent"
              />
              <button
                type="submit"
                className="bg-futuristic-accent text-futuristic-bg px-6 py-2 rounded-lg hover:bg-futuristic-accent/90 transition-colors"
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
