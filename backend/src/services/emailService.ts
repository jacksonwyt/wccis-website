// src/services/emailService.ts
import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';
import Redis from 'ioredis';
import { Queue, Worker } from 'bullmq';
import Handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

interface QuoteRequest {
  companyName: string;
  contactName: string;
  type: string;
  email: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;
  private redis: Redis;
  private emailQueue: Queue;
  private emailTemplates: Map<string, Handlebars.TemplateDelegate>;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 5000; // 5 seconds

  constructor() {
    // Initialize Redis client
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    
    // Initialize email queue
    this.emailQueue = new Queue('email-queue', {
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
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  private async loadEmailTemplate(templateName: string, data?: any): Promise<string> {
    // Check cache first
    if (this.emailTemplates.has(templateName)) {
      const template = this.emailTemplates.get(templateName)!;
      return template(data || {});
    }

    // Load template from file
    const templatePath = path.join(__dirname, '../templates', `${templateName}.hbs`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(templateContent);

    // Cache template
    this.emailTemplates.set(templateName, template);
    return template(data || {});
  }

  async sendEmail(options: EmailOptions) {
    // Add job to queue
    const job = await this.emailQueue.add('send-email', {
      from: process.env.EMAIL_FROM,
      ...options
    });

    // Return job ID for tracking
    return job.id;
  }

  private async processEmail(job: any) {
    try {
      const result = await this.transporter.sendMail(job.data);
      logger.info('Email sent successfully', { messageId: result.messageId, jobId: job.id });
      return result;
    } catch (error) {
      logger.error('Failed to send email', { error, jobId: job.id });
      throw error;
    }
  }

  async sendQuoteConfirmation(quoteRequest: QuoteRequest) {
    const html = await this.loadEmailTemplate('quote-confirmation', {
      ...quoteRequest,
      supportPhone: process.env.SUPPORT_PHONE,
      supportEmail: process.env.SUPPORT_EMAIL,
      currentYear: new Date().getFullYear()
    });

    await this.sendEmail({
      to: quoteRequest.email,
      subject: 'WCCIS - Quote Request Confirmation',
      html
    });
  }

  async sendQuoteFollowUp(quote: QuoteRequest) {
    const html = await this.loadEmailTemplate('quote-followup', {
      ...quote,
      supportPhone: process.env.SUPPORT_PHONE,
      supportEmail: process.env.SUPPORT_EMAIL,
      currentYear: new Date().getFullYear()
    });

    await this.sendEmail({
      to: quote.email,
      subject: 'WCCIS - Your Insurance Quote',
      html
    });
  }

  async sendContactFormConfirmation(contact: any) {
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

  async sendNotificationToAdmin(notification: {
    type: string;
    subject: string;
    message: string;
    data?: any;
  }) {
    const html = `
      <h1>Admin Notification - ${notification.type}</h1>
      <p>${notification.message}</p>
      ${notification.data ? `<pre>${JSON.stringify(notification.data, null, 2)}</pre>` : ''}
    `;

    await this.sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: `WCCIS Admin - ${notification.subject}`,
      html
    });
  }

  // Template loader for email templates
  private async loadTemplate(templateName: string, data: any): Promise<string> {
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
    } catch (error) {
      logger.error('Failed to load email template', { error, templateName });
      throw error;
    }
  }
}

export const emailService = new EmailService();