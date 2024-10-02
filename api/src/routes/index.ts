import { Router, Request, Response } from 'express';
import userRoutes from './user-routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('API is running!');
});

router.use('/api/v1', userRoutes);

export default router;
