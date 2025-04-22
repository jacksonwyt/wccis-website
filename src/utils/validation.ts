// frontend/src/utils/validation.ts
import * as z from 'zod';

// Common patterns
const PHONE_REGEX = /^[0-9-+()\s]{10,}$/;
const NAME_MIN_LENGTH = 2;

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

// Certificate Request Form Schema has been removed

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Infer types from schemas
export type InsuranceQuoteForm = z.infer<typeof insuranceQuoteSchema>;
// CertificateRequestForm type has been removed
export type ContactForm = z.infer<typeof contactFormSchema>;