// controllers/stockController.js
import Stock from "../models/stockModel.js";

// Add or update stock if same name exists
// controllers/stockController.js
export const addOrUpdateStock = async (req, res) => {
	try {
		let { name, pricePerBox, totalBoxes, sellingPrice } = req.body;

		if (!name || pricePerBox === undefined || totalBoxes === undefined) {
			return res.status(400).json({
				message: `Name, pricePerBox, and quantity are required ${name}, ${pricePerBox}, ${quantity}`,
			});
		}

		let quantity = totalBoxes;

		// convert safely
		pricePerBox = Number(pricePerBox);
		quantity = Number(quantity);

		if (isNaN(pricePerBox) || isNaN(quantity)) {
			return res
				.status(400)
				.json({ message: "Price and Quantity must be valid numbers" });
		}

		// find existing stock
		let stock = await Stock.findOne({
			user: req.user._id,
			name: { $regex: new RegExp("^" + name + "$", "i") },
		});

		if (stock) {
			stock.totalBoxes += quantity;
			stock.currentQuantity += quantity;
			stock.pricePerBox = pricePerBox;
			stock.totalValue = stock.totalBoxes * pricePerBox;
			await stock.save();
			return res.json({ message: "Stock quantity updated", stock });
		}

		// generate unique code (3-char alphanumeric)
		const code =
			name
				.replace(/[^A-Za-z0-9]/g, "")
				.substring(0, 3)
				.toUpperCase() + Math.floor(Math.random() * 90 + 10);

		const totalValue = quantity * pricePerBox;
		const newStock = await Stock.create({
			code,
			name,
			pricePerBox,
			totalBoxes: quantity,
			currentQuantity: quantity,
			totalValue,
			sellingPrice,
			user: req.user._id,
		});

		res
			.status(201)
			.json({ message: "Stock added successfully", stock: newStock });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error adding/updating stock", error: err.message });
	}
};

// Fetch
export const getStocks = async (req, res) => {
	try {
		const stocks = await Stock.find({ user: req.user._id }).sort({
			createdAt: -1,
		});
		res.json(stocks);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error fetching stocks", error: err.message });
	}
};

// Update single
export const updateStock = async (req, res) => {
	try {
		const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!stock) return res.status(404).json({ message: "Stock not found" });
		res.json({ message: "Stock updated", stock });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error updating stock", error: err.message });
	}
};

// Delete
export const deleteStock = async (req, res) => {
	try {
		const stock = await Stock.findByIdAndDelete(req.params.id);
		if (!stock) return res.status(404).json({ message: "Stock not found" });
		res.json({ message: "Stock deleted" });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error deleting stock", error: err.message });
	}
};

export const updateSellingPrice = async (req, res) => {
	try {
		const { id } = req.params;
		const { sellingPrice } = req.body;

		if (!sellingPrice)
			return res.status(400).json({ message: "Selling price is required" });

		const updated = await Stock.findByIdAndUpdate(
			id,
			{ sellingPrice },
			{ new: true },
		);

		if (!updated)
			return res.status(404).json({ message: "Stock item not found" });

		res.json(updated);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error updating selling price", error: err.message });
	}
};
