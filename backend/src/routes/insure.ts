// backend/src/routes/insure.ts
import { Router } from 'express';
import {
  submitWorkersCompQuote,
  submitCommercialAutoQuote,
  submitGeneralLiabilityQuote
} from '../controllers/insureController';

const router = Router();

// Routes for different insurance types
router.post('/workers-comp', submitWorkersCompQuote);
router.post('/commercial-auto', submitCommercialAutoQuote);
router.post('/general-liability', submitGeneralLiabilityQuote);

export default router;
