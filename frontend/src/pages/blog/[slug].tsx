// frontend/src/pages/blog/[slug].tsx
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "@/components/Layout";
import { Calendar, Clock, User, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
    <Layout title={`${post.title} | WCCIS Blog`}>
      <section className="bg-gradient-to-r from-futuristic-surface to-futuristic-accent text-futuristic-light py-16">
        <div className="container mx-auto px-4">
          <Link href="/blog">
            <a className="inline-flex items-center text-futuristic-light hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </a>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-futuristic-light space-x-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </span>
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </span>
          </div>
        </div>
      </section>
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose lg:prose-lg prose-invert">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className="mt-12 pt-6 border-t border-futuristic-accent">
          <div className="flex items-center justify-between">
            <span className="text-futuristic-light/70">Share this article:</span>
            <div className="flex space-x-4">
              <button 
                aria-label="Share article"
                className="p-2 rounded-full hover:bg-futuristic-surface"
              >
                <Share2 className="w-5 h-5 text-futuristic-light" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: "understanding-general-liability" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
