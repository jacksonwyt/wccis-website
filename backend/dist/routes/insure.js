"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/insure.ts
const express_1 = require("express");
const insureController_1 = require("../controllers/insureController");
const router = (0, express_1.Router)();
// Routes for different insurance types
router.post('/workers-comp', insureController_1.submitWorkersCompQuote);
router.post('/commercial-auto', insureController_1.submitCommercialAutoQuote);
router.post('/general-liability', insureController_1.submitGeneralLiabilityQuote);
exports.default = router;
