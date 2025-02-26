"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commercialAutoSchema = exports.workersCompSchema = exports.generalLiabilitySchema = void 0;
// src/validators/insuranceValidators.ts
const zod_1 = require("zod");
exports.generalLiabilitySchema = zod_1.z.object({
    companyName: zod_1.z.string().min(1, 'Company name is required'),
    contactName: zod_1.z.string().min(1, 'Contact name is required'),
    email: zod_1.z.string().email('Valid email required'),
    phone: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Valid phone number required'),
    address: zod_1.z.object({
        street: zod_1.z.string().min(1, 'Street address is required'),
        city: zod_1.z.string().min(1, 'City is required'),
        state: zod_1.z.string().length(2, 'Valid state code required'),
        zip: zod_1.z.string().regex(/^\d{5}(-\d{4})?$/, 'Valid ZIP code required')
    }),
    businessType: zod_1.z.string().min(1, 'Business type is required'),
    yearsInBusiness: zod_1.z.number().min(0, 'Must be 0 or greater'),
    annualRevenue: zod_1.z.number().min(0, 'Must be 0 or greater'),
    employees: zod_1.z.number().min(0, 'Must be 0 or greater'),
    claims: zod_1.z.array(zod_1.z.object({
        date: zod_1.z.string(),
        type: zod_1.z.string(),
        amount: zod_1.z.number(),
        status: zod_1.z.string()
    })).optional()
});
exports.workersCompSchema = zod_1.z.object({
    companyName: zod_1.z.string().min(1, 'Company name is required'),
    contactName: zod_1.z.string().min(1, 'Contact name is required'),
    email: zod_1.z.string().email('Valid email required'),
    phone: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Valid phone number required'),
    fein: zod_1.z.string().regex(/^\d{2}-\d{7}$/, 'Valid FEIN required'),
    employees: zod_1.z.array(zod_1.z.object({
        class: zod_1.z.string(),
        count: zod_1.z.number().min(1),
        payroll: zod_1.z.number().min(0),
        state: zod_1.z.string().length(2)
    })),
    previousCarrier: zod_1.z.string().optional(),
    expirationDate: zod_1.z.string().optional(),
    experienceModifier: zod_1.z.number().optional()
});
exports.commercialAutoSchema = zod_1.z.object({
    companyName: zod_1.z.string().min(1, 'Company name is required'),
    contactName: zod_1.z.string().min(1, 'Contact name is required'),
    email: zod_1.z.string().email('Valid email required'),
    phone: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Valid phone number required'),
    vehicles: zod_1.z.array(zod_1.z.object({
        year: zod_1.z.number(),
        make: zod_1.z.string(),
        model: zod_1.z.string(),
        vin: zod_1.z.string().regex(/^[A-HJ-NPR-Z0-9]{17}$/, 'Valid VIN required'),
        value: zod_1.z.number(),
        usage: zod_1.z.string()
    })),
    drivers: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        license: zod_1.z.string(),
        state: zod_1.z.string().length(2),
        experience: zod_1.z.number()
    }))
});
