"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/blog.ts
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const router = (0, express_1.Router)();
// Get all blog posts
router.get('/', blogController_1.getAllPosts);
// Get a single blog post by slug
router.get('/:slug', blogController_1.getPostBySlug);
exports.default = router;
