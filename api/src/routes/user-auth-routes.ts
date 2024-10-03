import { Router } from 'express';
import { UserAuthController } from '../controllers/user-auth-controller';

const userAuthController = new UserAuthController();
const router = Router();

router.post('/register', userAuthController.register.bind(userAuthController));
router.post('/login', userAuthController.login.bind(userAuthController));

export default router;
