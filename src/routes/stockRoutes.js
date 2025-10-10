// routes/stockRoutes.js
import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
	addOrUpdateStock,
	getStocks,
	updateStock,
	deleteStock,
	updateSellingPrice,
} from "../controllers/stockController.js";

const router = Router();

router.route("/").get(verifyJWT, getStocks).post(verifyJWT, addOrUpdateStock);
router.put("/:id/selling-price", updateSellingPrice);

router.route("/:id").put(verifyJWT, updateStock).delete(verifyJWT, deleteStock);

export default router;
