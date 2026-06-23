import express from 'express';
import { allProductsController, getProductsByCategoryController, seedingController } from '../controllers/productController';

const router = express.Router();

router.post("/seeding",seedingController)
router.get("/products" , allProductsController)
router.get("/products/:category" , getProductsByCategoryController)

export default router