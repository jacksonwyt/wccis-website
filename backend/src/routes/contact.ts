// backend/src/routes/contact.ts
import { Router } from 'express';
import { submitContactRequest, contactSchema } from '../controllers/contactController';
import { validate } from '../middleware/validate';

const router = Router();

router.post('/', validate(contactSchema), submitContactRequest);

export default router;
