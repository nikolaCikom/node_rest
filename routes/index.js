import express from 'express';
import auth from './auth.routes.js';
import company from './company.routes.js';

const router = express.Router();

router.use(auth);
router.use(company);

export default router;
