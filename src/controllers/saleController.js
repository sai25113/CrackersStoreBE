// import Sale from "../models/Sale.js";
// import Stock from "../models/stockModel.js";
// export const createSale = async (req, res) => {
// 	try {
// 		const { customerName, items, discountType, discountValue, paymentMode } =
// 			req.body;

// 		// 1️⃣ Compute totals
// 		let totalBeforeDiscount = 0;
// 		let totalCost = 0;
// 		let saleItems = [];

// 		for (const item of items) {
// 			const stock = await Stock.findById(item.stockId);
// 			if (!stock || stock.currentQty < item.quantitySold) {
// 				return res
// 					.status(400)
// 					.json({ message: `Insufficient stock for ${item.name}` });
// 			}

// 			const totalSaleValue = stock.sellingPrice * item.quantitySold;
// 			const totalItemCost = stock.pricePerBox * item.quantitySold;
// 			const profit = totalSaleValue - totalItemCost;

// 			totalBeforeDiscount += totalSaleValue;
// 			totalCost += totalItemCost;

// 			saleItems.push({
// 				stockId: stock._id,
// 				name: stock.name,
// 				quantitySold: item.quantitySold,
// 				sellingPrice: stock.sellingPrice,
// 				buyingPrice: stock.pricePerBox,
// 				totalSaleValue,
// 				totalCost: totalItemCost,
// 				profit,
// 			});
// 		}

// 		// 2️⃣ Apply discount
// 		let discountAmount = 0;
// 		if (discountType === "PERCENT")
// 			discountAmount = (totalBeforeDiscount * discountValue) / 100;
// 		else if (discountType === "AMOUNT") discountAmount = discountValue;

// 		const finalTotal = totalBeforeDiscount - discountAmount;

// 		// 3️⃣ Distribute discount proportionally among items
// 		saleItems = saleItems.map((item) => {
// 			const share =
// 				(item.totalSaleValue / totalBeforeDiscount) * discountAmount;
// 			return {
// 				...item,
// 				discountShare: share,
// 				finalItemValue: item.totalSaleValue - share,
// 			};
// 		});

// 		// 4️⃣ Compute total profit after discount
// 		const profit = saleItems.reduce(
// 			(acc, item) => acc + (item.finalItemValue - item.totalCost),
// 			0,
// 		);

// 		// 5️⃣ Generate Bill Number
// 		const lastSale = await Sale.findOne().sort({ _id: -1 });
// 		const billNo = `BILL-${new Date().getFullYear()}-${(lastSale
// 			? parseInt(lastSale._id.toString().slice(-4), 16)
// 			: 0
// 		)
// 			.toString()
// 			.padStart(4, "0")}`;

// 		// 6️⃣ Save sale
// 		const newSale = await Sale.create({
// 			billNo,
// 			customerName,
// 			items: saleItems,
// 			totalBeforeDiscount,
// 			discountType,
// 			discountValue,
// 			discountAmount,
// 			finalTotal,
// 			paymentMode,
// 			profit,
// 		});

// 		// 7️⃣ Reduce stock quantities
// 		for (const item of items) {
// 			await Stock.findByIdAndUpdate(item.stockId, {
// 				$inc: { currentQty: -item.quantitySold },
// 			});
// 		}

// 		res.status(201).json(newSale);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: "Server error", error });
// 	}
// };

// export const getSalesHistory = async (req, res) => {
// 	try {
// 		const sales = await Sale.find().sort({ date: -1 });
// 		res.json(sales);
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// };

import Sale from "../models/Sale.js";
import Stock from "../models/stockModel.js";

export const createSale = async (req, res) => {
	try {
		const { customerName, items, discountType, discountValue, paymentMode } =
			req.body;

		if (!items || !Array.isArray(items) || items.length === 0) {
			return res.status(400).json({ message: "No items provided for sale" });
		}

		let totalBeforeDiscount = 0;
		let totalCost = 0;
		let saleItems = [];

		for (const item of items) {
			const stock = await Stock.findById(item.stockId);
			if (!stock) {
				return res
					.status(404)
					.json({ message: `Stock not found for ID ${item.stockId}` });
			}

			const quantitySold = Number(item.quantitySold) || 0;
			const sellingPrice = Number(stock.sellingPrice) || 0;
			const buyingPrice = Number(stock.pricePerBox) || 0;
			const currentQty = Number(stock.currentQuantity) || 0;

			if (quantitySold <= 0) {
				return res
					.status(400)
					.json({ message: `Invalid quantity for ${stock.name}` });
			}

			if (currentQty < quantitySold) {
				return res.status(400).json({
					message: `Insufficient stock for ${stock.name} ${currentQty} ${quantitySold}`,
				});
			}

			const totalSaleValue = sellingPrice * quantitySold;
			const totalItemCost = buyingPrice * quantitySold;
			const profit = totalSaleValue - totalItemCost;

			totalBeforeDiscount += totalSaleValue;
			totalCost += totalItemCost;

			saleItems.push({
				stockId: stock._id,
				name: stock.name,
				quantitySold,
				sellingPrice,
				buyingPrice,
				totalSaleValue,
				totalCost: totalItemCost,
				profit,
			});
		}

		// 2️⃣ Apply discount
		let discountAmount = 0;
		const numericDiscountValue = Number(discountValue) || 0;

		if (discountType === "PERCENT") {
			discountAmount = (totalBeforeDiscount * numericDiscountValue) / 100;
		} else if (discountType === "AMOUNT") {
			discountAmount = numericDiscountValue;
		}

		const finalTotal = totalBeforeDiscount - discountAmount;

		// 3️⃣ Distribute discount proportionally among items
		saleItems = saleItems.map((item) => {
			const share =
				totalBeforeDiscount > 0
					? (item.totalSaleValue / totalBeforeDiscount) * discountAmount
					: 0;
			const finalItemValue = item.totalSaleValue - share;
			return {
				...item,
				discountShare: share,
				finalItemValue,
			};
		});

		// 4️⃣ Compute total profit after discount
		const profit = saleItems.reduce(
			(acc, item) => acc + (item.finalItemValue - item.totalCost),
			0,
		);

		// 5️⃣ Generate Bill Number
		const lastSale = await Sale.findOne().sort({ _id: -1 });
		const nextNum = lastSale
			? parseInt(lastSale._id.toString().slice(-4), 16) + 1
			: 1;
		const billNo = `BILL-${new Date().getFullYear()}-${nextNum
			.toString()
			.padStart(4, "0")}`;

		// 6️⃣ Save sale
		const newSale = await Sale.create({
			billNo,
			customerName,
			items: saleItems,
			totalBeforeDiscount,
			discountType,
			discountValue: numericDiscountValue,
			discountAmount,
			finalTotal,
			paymentMode,
			profit,
		});

		// 7️⃣ Reduce stock quantities
		for (const item of items) {
			await Stock.findByIdAndUpdate(item.stockId, {
				$inc: { currentQuantity: -Number(item.quantitySold) },
			});
		}

		res.status(201).json(newSale);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getSalesHistory = async (req, res) => {
	try {
		const sales = await Sale.find().sort({ date: -1 });
		res.json(sales);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
