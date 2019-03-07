import { Router } from 'express';

import testA from './test-a';

const router = Router();

router.use('/test-a', testA);

export default router;
