// backend/src/routes/contact.ts
import { Router } from 'express';
import { submitContactRequest } from '../controllers/contactController';

const router = Router();

router.post('/', submitContactRequest);

export default router;
