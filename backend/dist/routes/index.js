"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/index.ts
const express_1 = require("express");
const health_1 = __importDefault(require("./health"));
const files_1 = __importDefault(require("./files"));
const blog_1 = __importDefault(require("./blog"));
const security_1 = require("../middleware/security");
const router = (0, express_1.Router)();
// Health check route
router.use('/health', health_1.default);
// File upload routes
router.use('/files', files_1.default);
// Blog routes
router.use('/blog', blog_1.default);
// CSRF token endpoint
router.get('/csrf', (req, res) => {
    return res.json({
        status: 'success',
        data: {
            token: (0, security_1.generateToken)(req, res)
        }
    });
});
exports.default = router;
