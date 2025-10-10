// import express from "express";
// import Sale from "../models/Sale.js";
// import Stock from "../models/stockModel.js";
// const router = express.Router();

// // ✅ Create Sale + Reduce Stock
// router.post("/", async (req, res) => {
// 	try {
// 		const { items, discountType, discountValue } = req.body;

// 		let subtotal = 0;
// 		const saleItems = [];

// 		for (const item of items) {
// 			const stock = await Stock.findById(item.stockId);
// 			if (!stock)
// 				return res
// 					.status(404)
// 					.json({ message: `Stock not found: ${item.name}` });
// 			if (stock.currentQuantity < item.quantity)
// 				return res
// 					.status(400)
// 					.json({ message: `Not enough stock for ${item.name}` });

// 			const itemTotal = item.quantity * stock.sellingPrice;
// 			subtotal += itemTotal;

// 			// Reduce stock
// 			stock.currentQuantity -= item.quantity;
// 			await stock.save();

// 			saleItems.push({
// 				stockId: stock._id,
// 				name: stock.name,
// 				quantity: item.quantity,
// 				pricePerItem: stock.sellingPrice,
// 				total: itemTotal,
// 			});
// 		}

// 		// Calculate discount
// 		let totalAmount = subtotal;
// 		if (discountType === "percent") {
// 			totalAmount -= subtotal * (discountValue / 100);
// 		} else if (discountType === "amount") {
// 			totalAmount -= discountValue;
// 		}

// 		const sale = new Sale({
// 			items: saleItems,
// 			subtotal,
// 			discountType,
// 			discountValue,
// 			totalAmount,
// 		});

// 		await sale.save();
// 		res.status(201).json(sale);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ message: "Server error" });
// 	}
// });

// // ✅ Get All Sales (History)
// router.get("/", async (req, res) => {
// 	try {
// 		const sales = await Sale.find().sort({ createdAt: -1 });
// 		res.json(sales);
// 	} catch (err) {
// 		res.status(500).json({ message: "Error fetching sales" });
// 	}
// });

// export default router;

import express from "express";
import { createSale, getSalesHistory } from "../controllers/saleController.js";
const router = express.Router();

router.post("/", createSale);
router.get("/", getSalesHistory);

export default router;
