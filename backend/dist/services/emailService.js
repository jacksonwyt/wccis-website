"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
// src/services/emailService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../utils/logger");
const ioredis_1 = __importDefault(require("ioredis"));
const bullmq_1 = require("bullmq");
const handlebars_1 = __importDefault(require("handlebars"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class EmailService {
    constructor() {
        this.MAX_RETRIES = 3;
        this.RETRY_DELAY = 5000; // 5 seconds
        // Initialize Redis client
        this.redis = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
        // Initialize email queue
        this.emailQueue = new bullmq_1.Queue('email-queue', {
            connection: this.redis,
            defaultJobOptions: {
                attempts: this.MAX_RETRIES,
                backoff: {
                    type: 'exponential',
                    delay: this.RETRY_DELAY
                }
            }
        });
        // Initialize email templates cache
        this.emailTemplates = new Map();
        // Initialize nodemailer transporter
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }
    async loadEmailTemplate(templateName, data) {
        // Check cache first
        if (this.emailTemplates.has(templateName)) {
            const template = this.emailTemplates.get(templateName);
            return template(data || {});
        }
        // Load template from file
        const templatePath = path_1.default.join(__dirname, '../templates', `${templateName}.hbs`);
        const templateContent = await promises_1.default.readFile(templatePath, 'utf-8');
        const template = handlebars_1.default.compile(templateContent);
        // Cache template
        this.emailTemplates.set(templateName, template);
        return template(data || {});
    }
    async sendEmail(options) {
        // Add job to queue
        const job = await this.emailQueue.add('send-email', Object.assign({ from: process.env.EMAIL_FROM }, options));
        // Return job ID for tracking
        return job.id;
    }
    async processEmail(job) {
        try {
            const result = await this.transporter.sendMail(job.data);
            logger_1.logger.info('Email sent successfully', { messageId: result.messageId, jobId: job.id });
            return result;
        }
        catch (error) {
            logger_1.logger.error('Failed to send email', { error, jobId: job.id });
            throw error;
        }
    }
    async sendQuoteConfirmation(quoteRequest) {
        const html = await this.loadEmailTemplate('quote-confirmation', Object.assign(Object.assign({}, quoteRequest), { supportPhone: process.env.SUPPORT_PHONE, supportEmail: process.env.SUPPORT_EMAIL, currentYear: new Date().getFullYear() }));
        await this.sendEmail({
            to: quoteRequest.email,
            subject: 'WCCIS - Quote Request Confirmation',
            html
        });
    }
    async sendQuoteFollowUp(quote) {
        const html = await this.loadEmailTemplate('quote-followup', Object.assign(Object.assign({}, quote), { supportPhone: process.env.SUPPORT_PHONE, supportEmail: process.env.SUPPORT_EMAIL, currentYear: new Date().getFullYear() }));
        await this.sendEmail({
            to: quote.email,
            subject: 'WCCIS - Your Insurance Quote',
            html
        });
    }
    async sendContactFormConfirmation(contact) {
        const html = `
      <h1>Thank You for Contacting Us</h1>
      <p>We have received your message and will respond within 24 hours.</p>
      <h2>Your Message:</h2>
      <p>${contact.message}</p>
    `;
        await this.sendEmail({
            to: contact.email,
            subject: 'WCCIS - Contact Form Confirmation',
            html
        });
    }
    async sendNotificationToAdmin(notification) {
        const html = `
      <h1>Admin Notification - ${notification.type}</h1>
      <p>${notification.message}</p>
      ${notification.data ? `<pre>${JSON.stringify(notification.data, null, 2)}</pre>` : ''}
    `;
        await this.sendEmail({
            to: process.env.ADMIN_EMAIL,
            subject: `WCCIS Admin - ${notification.subject}`,
            html
        });
    }
    // Template loader for email templates
    async loadTemplate(templateName, data) {
        try {
            // In a real implementation, this would load from a template file
            // For now, we'll return a basic template
            return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #f8f9fa; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .footer { text-align: center; padding: 20px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="cid:logo" alt="WCCIS Logo" />
              </div>
              <div class="content">
                ${data.content}
              </div>
              <div class="footer">
                <p>  ${new Date().getFullYear()} WCCIS. All rights reserved.</p>
                <p>123 Insurance Ave, Suite 100, City, ST 12345</p>
              </div>
            </div>
          </body>
        </html>
      `;
        }
        catch (error) {
            logger_1.logger.error('Failed to load email template', { error, templateName });
            throw error;
        }
    }
}
exports.emailService = new EmailService();
