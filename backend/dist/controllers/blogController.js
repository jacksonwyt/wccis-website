"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostBySlug = exports.getAllPosts = void 0;
const errors_1 = require("../types/errors");
// Mock blog post data
const blogPosts = {
    'understanding-commercial-insurance': {
        id: 1,
        title: 'Understanding Commercial Insurance',
        content: 'Commercial insurance is essential for businesses of all sizes...',
        author: 'Jane Smith',
        date: '2025-01-15'
    },
    'workers-compensation-coverage': {
        id: 2,
        title: 'Workers Compensation Coverage',
        content: 'Workers compensation insurance provides benefits to employees who are injured...',
        author: 'John Doe',
        date: '2025-01-22'
    },
    'cyber-liability-insurance': {
        id: 3,
        title: 'Cyber Liability Insurance',
        content: 'In today\'s digital world, cyber liability insurance is more important than ever...',
        author: 'Sarah Johnson',
        date: '2025-02-01'
    }
};
// Get all blog posts
const getAllPosts = (req, res) => {
    const posts = Object.values(blogPosts).map(post => ({
        id: post.id,
        title: post.title,
        slug: Object.keys(blogPosts).find(key => blogPosts[key].id === post.id),
        author: post.author,
        date: post.date
    }));
    res.status(200).json({
        status: 'success',
        data: {
            posts
        }
    });
};
exports.getAllPosts = getAllPosts;
// Get a single blog post by slug
const getPostBySlug = (req, res, next) => {
    const { slug } = req.params;
    const post = blogPosts[slug];
    if (!post) {
        return next(errors_1.AppError.notFound('Blog post not found'));
    }
    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    });
};
exports.getPostBySlug = getPostBySlug;
