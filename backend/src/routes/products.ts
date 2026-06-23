import express from 'express';
import { allProductsController,  getProductsByCategoryController,  paginatedProductsController, seedingController } from '../controllers/productController';

const router = express.Router();

router.post("/seeding",seedingController)
router.get("/products" , allProductsController)
router.get("/products/:category" , getProductsByCategoryController)
router.get('/products-cursor',paginatedProductsController)

export default router