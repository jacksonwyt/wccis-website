// frontend/src/utils/validation.ts
import * as z from 'zod';

// Common patterns
const PHONE_REGEX = /^[0-9-+()\s]{10,}$/;
const NAME_MIN_LENGTH = 2;
const MESSAGE_MIN_LENGTH = 10;

// Insurance Quote Form Schema
export const insuranceQuoteSchema = z.object({
  name: z.string()
    .min(NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z.string()
    .email('Invalid email address'),
  phone: z.string()
    .regex(PHONE_REGEX, 'Please enter a valid phone number')
});

// Certificate Request Form Schema
export const certificateRequestSchema = z.object({
    requestType: z.enum(['standard', 'additional-insured', 'waiver', 'primary']),
    isRush: z.boolean(),
    policyHolder: z.string().min(2, 'Policy holder name is required'),
    carrier: z.string().min(1, 'Please select an insurance carrier'),
    policyNumber: z.string().min(3, 'Valid policy number is required'),
    certificateHolder: z.string().min(2, 'Certificate holder is required'),
    specialInstructions: z.string().optional(),
    email: z.string().email('Valid email address is required'),
    phone: z.string().regex(/^[0-9-+()\s]{10,}$/, 'Valid phone number is required')
  });
  

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z.string()
    .email('Invalid email address'),
  message: z.string()
    .min(MESSAGE_MIN_LENGTH, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long')
});

// Infer types from schemas
export type InsuranceQuoteForm = z.infer<typeof insuranceQuoteSchema>;
export type CertificateRequestForm = z.infer<typeof certificateRequestSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;