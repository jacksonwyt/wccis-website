// backend/src/routes/certificate.ts
import { Router } from 'express';
import { submitCertificateRequest } from '../controllers/certificateController';

const router = Router();

router.post('/', submitCertificateRequest);

export default router;
