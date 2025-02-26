"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/contact.ts
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
router.post('/', (0, validate_1.validate)(contactController_1.contactSchema), contactController_1.submitContactRequest);
exports.default = router;
