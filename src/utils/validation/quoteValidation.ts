// src/utils/validation/quoteValidation.ts
import { z } from 'zod';

// Business Information Schema
export const businessInfoSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Valid phone number required'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'Valid state code required'),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Valid ZIP code required')
  })
});

// Operations Schema
export const operationsSchema = z.object({
  businessType: z.string().min(1, 'Business type is required'),
  yearsInBusiness: z.number().min(0, 'Must be 0 or greater'),
  annualRevenue: z.number().min(0, 'Must be 0 or greater'),
  annualPayroll: z.number().min(0, 'Must be 0 or greater'),
  subcontractorCosts: z.number().min(0, 'Must be 0 or greater'),
  employeeCount: z.number().min(1, 'Must have at least one employee'),
  employeeTypes: z.array(z.object({
    type: z.string(),
    count: z.number().min(0),
    annualWages: z.number().min(0)
  })).min(1, 'Must specify at least one employee type'),
  industriesServed: z.array(z.string()).min(1, 'Select at least one industry'),
  servicesProvided: z.array(z.string()).min(1, 'Select at least one service'),
  projectTypes: z.array(z.string()).min(1, 'Select at least one project type'),
  operationLocations: z.array(z.object({
    address: z.object({
      street: z.string().min(1, 'Street address is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().length(2, 'Valid state code required'),
      zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Valid ZIP code required')
    }),
    isPrimary: z.boolean(),
    operationType: z.string().min(1, 'Operation type is required')
  })).min(1, 'Must specify at least one operation location')
});

// Claims History Schema
export const claimsHistorySchema = z.object({
  hadClaims: z.boolean(),
  claims: z.array(z.object({
    date: z.string(),
    type: z.enum([
      'bodily-injury',
      'property-damage',
      'personal-injury',
      'advertising-injury',
      'other'
    ]),
    amount: z.number().min(0),
    status: z.enum([
      'open',
      'closed',
      'pending'
    ]),
    description: z.string().min(10, 'Please provide a detailed description'),
    preventiveMeasures: z.string().min(10, 'Please describe preventive measures taken')
  })).optional(),
  riskManagementPractices: z.object({
    safetyProgram: z.boolean(),
    employeeTraining: z.boolean(),
    qualityControl: z.boolean(),
    contractReview: z.boolean(),
    description: z.string().optional()
  })
});

// Coverage Needs Schema
export const coverageSchema = z.object({
  desiredCoverageLimit: z.object({
    perOccurrence: z.enum([
      '500000',
      '1000000',
      '2000000',
      '3000000',
      '4000000',
      '5000000'
    ]),
    aggregate: z.enum([
      '1000000',
      '2000000',
      '4000000',
      '6000000',
      '8000000',
      '10000000'
    ]),
    productsCompletedOperations: z.enum([
      '500000',
      '1000000',
      '2000000'
    ])
  }),
  deductiblePreference: z.enum([
    '1000',
    '2500',
    '5000',
    '10000'
  ]),
  additionalCoverages: z.object({
    additionalInsured: z.boolean(),
    waiverOfSubrogation: z.boolean(),
    primaryAndNoncontributory: z.boolean(),
    inlandMarine: z.boolean(),
    toolsEquipment: z.boolean(),
    employeeBenefitsLiability: z.boolean()
  }),
  effectiveDate: z.string().min(1, 'Effective date is required'),
  expirationDate: z.string().min(1, 'Expiration date is required')
});

// Complete Quote Request Schema
export const generalLiabilityQuoteSchema = z.object({
  businessInfo: businessInfoSchema,
  operations: operationsSchema,
  claimsHistory: claimsHistorySchema,
  coverage: coverageSchema,
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions'
  })
});

export type BusinessInfo = z.infer<typeof businessInfoSchema>;
export type Operations = z.infer<typeof operationsSchema>;
export type ClaimsHistory = z.infer<typeof claimsHistorySchema>;
export type Coverage = z.infer<typeof coverageSchema>;
export type GeneralLiabilityQuote = z.infer<typeof generalLiabilityQuoteSchema>;