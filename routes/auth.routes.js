import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/loginAuth', authController.loginAuth);

router.post('/registerAuth', authController.registerAuth);

router.get('/logout', authController.logoutAuth);

export default router;
