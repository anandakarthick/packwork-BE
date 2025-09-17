import express from "express";
import productRoutes from "./ProductRoutes.js";
import productVersionRoutes from "./ProductVersionRoutes.js";

const router = express.Router();
router.use("/products", productRoutes);
router.use("/product-versions", productVersionRoutes);

export default router;
