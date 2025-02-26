"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanseInput = void 0;
// backend/src/utils/security.ts
const xss_1 = __importDefault(require("xss"));
const cleanseInput = (input) => {
    // First remove potentially dangerous patterns
    const sanitized = input
        .replace(/javascript:/gi, '')
        .replace(/data:/gi, '')
        .replace(/vbscript:/gi, '')
        .replace(/onload=/gi, '')
        .replace(/onerror=/gi, '');
    // Then use xss sanitizer
    return (0, xss_1.default)(sanitized);
};
exports.cleanseInput = cleanseInput;
