import express from "express";
import {
  createProductVersion,
  getAllProductVersions,
} from "../controllers/ProductVersionController.js";

const router = express.Router();

router.post("/", createProductVersion);
router.get("/", getAllProductVersions);

export default router;
