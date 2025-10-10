// import mongoose from "mongoose";

// const SaleItemSchema = new mongoose.Schema({
// 	stockId: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: "Stock",
// 		required: true,
// 	},
// 	name: String,
// 	quantity: Number,
// 	pricePerItem: Number,
// 	total: Number,
// });

// const SaleSchema = new mongoose.Schema(
// 	{
// 		items: [SaleItemSchema],
// 		subtotal: Number,
// 		discountType: {
// 			type: String,
// 			enum: ["percent", "amount"],
// 			default: "amount",
// 		},
// 		discountValue: { type: Number, default: 0 },
// 		totalAmount: Number,
// 		createdAt: { type: Date, default: Date.now },
// 	},
// 	{ timestamps: true },
// );

// export default mongoose.model("Sale", SaleSchema);

import mongoose from "mongoose";

const saleItemSchema = new mongoose.Schema({
	stockId: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
	name: String,
	quantitySold: Number,
	sellingPrice: Number,
	buyingPrice: Number,
	totalSaleValue: Number,
	totalCost: Number,
	profit: Number,
	discountShare: Number,
	finalItemValue: Number,
});

const saleSchema = new mongoose.Schema({
	billNo: String,
	date: { type: Date, default: Date.now },
	customerName: String,
	items: [saleItemSchema],
	totalBeforeDiscount: Number,
	discountType: String, // "PERCENT" or "AMOUNT"
	discountValue: Number,
	discountAmount: Number,
	finalTotal: Number,
	paymentMode: String,
	profit: Number,
});

export default mongoose.model("Sale", saleSchema);
