import express from 'express';
import { seedingController } from '../controllers/productController';

const router = express.Router();

router.post("/seeding",seedingController)

export default router