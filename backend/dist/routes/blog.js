"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/blog.ts
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)();
// Apply cache middleware to GET routes
router.get('/posts', (0, cache_1.cacheMiddleware)({ ttl: 3600, keyPrefix: 'api:blog:posts:' }), blogController_1.getAllPosts);
router.get('/posts/:slug', (0, cache_1.cacheMiddleware)({ ttl: 86400, keyPrefix: 'api:blog:post:' }), blogController_1.getPostBySlug);
router.post('/subscribe', blogController_1.subscribeToUpdates);
exports.default = router;
