// backend/src/routes/insure.ts
import { Router } from 'express';
import { submitInsureRequest } from '../controllers/insureController';

const router = Router();

router.post('/', submitInsureRequest);

export default router;
