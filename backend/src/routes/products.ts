import express from 'express';
import { allProductsController,  deleteController,  getProductsByCategoryController,  paginatedProductsController, seedingController, updateProductController } from '../controllers/productController';

const router = express.Router();

router.post("/seeding",seedingController)
router.get("/products" , allProductsController)
router.get("/products/:category" , getProductsByCategoryController)
router.get('/products-cursor',paginatedProductsController)
router.put('/products/:id',updateProductController)
router.delete('/products/:id',deleteController)

export default router