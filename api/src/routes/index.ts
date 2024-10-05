import { Router, Request, Response } from 'express';
import userRoutes from './user-routes';
import userAuthRoutes from './user-auth-routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('API is running!');
});

router.use('/api/v1', userRoutes);
router.use('/api/auth', userAuthRoutes);

export default router;
