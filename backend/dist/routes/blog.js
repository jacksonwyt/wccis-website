"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/blog.ts
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const router = (0, express_1.Router)();
// Blog routes
router.get('/posts', blogController_1.getAllPosts);
router.get('/posts/:slug', blogController_1.getPostBySlug);
router.post('/subscribe', blogController_1.subscribeToUpdates);
exports.default = router;
