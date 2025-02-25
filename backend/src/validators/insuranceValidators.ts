// src/validators/insuranceValidators.ts
import { z } from 'zod';

export const generalLiabilitySchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Valid phone number required'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'Valid state code required'),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Valid ZIP code required')
  }),
  businessType: z.string().min(1, 'Business type is required'),
  yearsInBusiness: z.number().min(0, 'Must be 0 or greater'),
  annualRevenue: z.number().min(0, 'Must be 0 or greater'),
  employees: z.number().min(0, 'Must be 0 or greater'),
  claims: z.array(z.object({
    date: z.string(),
    type: z.string(),
    amount: z.number(),
    status: z.string()
  })).optional()
});

export const workersCompSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Valid phone number required'),
  fein: z.string().regex(/^\d{2}-\d{7}$/, 'Valid FEIN required'),
  employees: z.array(z.object({
    class: z.string(),
    count: z.number().min(1),
    payroll: z.number().min(0),
    state: z.string().length(2)
  })),
  previousCarrier: z.string().optional(),
  expirationDate: z.string().optional(),
  experienceModifier: z.number().optional()
});

export const commercialAutoSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Valid phone number required'),
  vehicles: z.array(z.object({
    year: z.number(),
    make: z.string(),
    model: z.string(),
    vin: z.string().regex(/^[A-HJ-NPR-Z0-9]{17}$/, 'Valid VIN required'),
    value: z.number(),
    usage: z.string()
  })),
  drivers: z.array(z.object({
    name: z.string(),
    license: z.string(),
    state: z.string().length(2),
    experience: z.number()
  }))
});