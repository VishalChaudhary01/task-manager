import express from 'express';
import { getProfile, signin, signup } from '../controllers/user.controller';
import { isAuth } from '../middlewares/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', isAuth, getProfile);

export default router;