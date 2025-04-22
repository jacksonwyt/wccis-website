// frontend/src/pages/blog/[slug].tsx
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Calendar, Clock, User, Share2, ArrowLeft } from "lucide-react";

interface BlogPost {
  title: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
}

interface BlogPostPageProps {
  post: BlogPost;
}

const BlogPostPage = ({ post }: BlogPostPageProps) => {
  return (
    <Layout title={`${post.title} | WCCIS Blog`} pageType="info">
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        
        <div className="container relative mx-auto px-4">
          <Link 
            href="/blog"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 mb-6">
              {post.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center text-gray-400 space-x-6 mb-12">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {post.readTime}
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {post.author}
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg prose-invert prose-blue"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
            
            <div className="mt-12 pt-6 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Share this article:</span>
                <div className="flex space-x-4">
                  <button 
                    aria-label="Share on Twitter"
                    className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Want to stay informed?
            </h2>
            <p className="text-gray-400 mb-8">
              Subscribe to our newsletter for the latest insurance insights.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: "understanding-general-liability" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: _params }) => {
  const post = {
    title: "Understanding General Liability Insurance",
    content: "<p>Article content goes here...</p>",
    date: "2024-02-12",
    readTime: "5 min read",
    author: "John Doe",
    category: "Insurance Basics",
  };
  return { props: { post } };
};

export default BlogPostPage;
