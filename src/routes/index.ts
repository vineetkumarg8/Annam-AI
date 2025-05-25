import { Router } from 'express';
import uploadRoutes from './upload.js'; // <-- use .js if using ESModules

const router = Router();

router.use('/upload', uploadRoutes); // Route: POST /upload

export default router;

