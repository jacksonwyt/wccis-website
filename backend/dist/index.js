"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./middleware/errorHandler");
const security_1 = require("./middleware/security");
// Load environment variables
dotenv_1.default.config();
// Import routes
const health_1 = __importDefault(require("./routes/health"));
const blog_1 = __importDefault(require("./routes/blog"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Enhanced CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:10000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
    exposedHeaders: ['X-XSRF-TOKEN'],
    maxAge: 86400,
};
// Basic middleware setup - order is important!
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Add cookie parser middleware - this MUST be before security middleware for CSRF to work
app.use((0, cookie_parser_1.default)());
// Add compression middleware
app.use((0, compression_1.default)({
    level: 6, // Default compression level
    threshold: 0, // Compress all responses
    filter: (req, res) => {
        // Don't compress responses with this header
        if (req.headers['x-no-compression']) {
            return false;
        }
        // Use compression filter function
        return compression_1.default.filter(req, res);
    }
}));
// Configure security middleware (CSRF protection, etc.) - must be after cookie-parser
(0, security_1.configureSecurityMiddleware)(app);
// Routes
app.use('/api/health', health_1.default);
app.use('/api/blog', blog_1.default);
// Note: CSRF Token route is now handled in the security middleware
// No need to duplicate it here
// Error handling middleware should be after routes
app.use(errorHandler_1.errorHandler);
// Handle unhandled routes
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        error: {
            message: `Cannot find ${req.originalUrl} on this server`,
        },
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
