"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitGeneralLiabilityQuote = exports.submitCommercialAutoQuote = exports.submitWorkersCompQuote = void 0;
const baseController_1 = require("./baseController");
const errors_1 = require("../types/errors");
// Validate common fields across all insurance types
const validateCommonFields = (data) => {
    const requiredFields = ['name', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => { var _a; return !((_a = data === null || data === void 0 ? void 0 : data.businessInfo) === null || _a === void 0 ? void 0 : _a[field]); });
    if (missingFields.length > 0) {
        throw errors_1.AppError.badRequest(`Missing required fields: ${missingFields.join(', ')}`, 'InsureRequest');
    }
};
// Handle Workers Compensation quote requests
exports.submitWorkersCompQuote = (0, baseController_1.asyncHandler)(async (req, res) => {
    var _a, _b;
    const data = req.body;
    validateCommonFields(data);
    // Validate workers comp specific fields
    if (!((_a = data.locations) === null || _a === void 0 ? void 0 : _a.length) || !((_b = data.classifications) === null || _b === void 0 ? void 0 : _b.length)) {
        throw errors_1.AppError.badRequest('At least one location and classification is required', 'WorkersCompQuote');
    }
    // Process the quote request (replace with actual business logic)
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.status(200).json({
        status: 'success',
        data: {
            message: 'Workers Compensation quote request received successfully',
            requestId: Date.now().toString(),
            type: 'workers-comp'
        }
    });
});
// Handle Commercial Auto quote requests
exports.submitCommercialAutoQuote = (0, baseController_1.asyncHandler)(async (req, res) => {
    var _a, _b;
    const data = req.body;
    validateCommonFields(data);
    // Validate commercial auto specific fields
    if (!((_a = data.vehicles) === null || _a === void 0 ? void 0 : _a.length) || !((_b = data.drivers) === null || _b === void 0 ? void 0 : _b.length)) {
        throw errors_1.AppError.badRequest('At least one vehicle and driver is required', 'CommercialAutoQuote');
    }
    // Process the quote request (replace with actual business logic)
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.status(200).json({
        status: 'success',
        data: {
            message: 'Commercial Auto quote request received successfully',
            requestId: Date.now().toString(),
            type: 'commercial-auto'
        }
    });
});
// Handle General Liability quote requests
exports.submitGeneralLiabilityQuote = (0, baseController_1.asyncHandler)(async (req, res) => {
    const data = req.body;
    // Validate using the zod schema we defined in the frontend
    // For now, we'll do basic validation
    const requiredFields = [
        'businessName',
        'contactName',
        'email',
        'phone',
        'physicalAddress',
        'entityType',
        'industryType'
    ];
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
        throw errors_1.AppError.badRequest(`Missing required fields: ${missingFields.join(', ')}`, 'GeneralLiabilityQuote');
    }
    // Process the quote request (replace with actual business logic)
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.status(200).json({
        status: 'success',
        data: {
            message: 'General Liability quote request received successfully',
            requestId: Date.now().toString(),
            type: 'general-liability'
        }
    });
});
