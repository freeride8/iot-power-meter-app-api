import { Router } from 'express';

import { controller as measurementController } from './measurement.controller';
import { controller as configController } from './config.controller';
import { timeFrameMiddleware } from '../middleware/time-frame.middleware';

const router = Router();
router.use(timeFrameMiddleware);
router.use('/measurement', measurementController);
router.use('/config', configController);

export const routes = router;
