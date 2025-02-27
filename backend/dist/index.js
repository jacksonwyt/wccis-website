"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./utils/logger");
const security_1 = require("./middleware/security");
// Load environment variables
dotenv_1.default.config();
// Import routes
const routes_1 = __importDefault(require("./routes"));
// Initialize express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Ensure logs directory exists
const logsDir = path_1.default.join(__dirname, '../logs');
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir, { recursive: true });
}
// Apply security middleware (cors, helmet, rate limiting)
app.use(security_1.requireHttps);
app.use(...(0, security_1.configureSecurity)());
// Parse request bodies
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
// Mount all routes
app.use('/api', routes_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Handle unhandled routes
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        error: {
            message: `Cannot find ${req.originalUrl} on this server`,
            code: 'NOT_FOUND'
        },
    });
});
// Start server
app.listen(PORT, () => {
    logger_1.logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
