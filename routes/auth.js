import express from 'express';
import {
  loginValidation,
  registerValidation,
} from './middlewares/authValidation.js';
import { verifyToken } from './middlewares/authorization.js';
import { create, getToken, getUser } from './controllers/auth.js';

const router = express.Router();

router.post('/signup', registerValidation, create);
router.post('/signin', loginValidation, getToken);
router.get('/', verifyToken, getUser);

export default router;
