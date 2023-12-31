import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import companyController from '../controllers/company.controller.js';

const router = express.Router();

router.get('/companies', (req, res) => {
  res.render('companies');
});

router.get('/createcompany', (req, res) => {
  res.render('createcompany');
});

router.get('/updatecompany/:id', authMiddleware, companyController.getCompanyByUpdate);

router.get('/getcompanies', authMiddleware, companyController.getAllCompanies);
router.get('/companies/:id', authMiddleware, companyController.getCompanyById);
router.post('/companies', authMiddleware, companyController.createCompany);
router.put('/companies/:id', authMiddleware, companyController.updateCompany);
router.delete('/companies/:id', companyController.deleteCompany);

export default router;
