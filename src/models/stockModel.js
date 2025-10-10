// models/stockModel.js
import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		code: { type: String, unique: true },
		pricePerBox: { type: Number, required: true },
		sellingPrice: { type: Number, required: true },
		totalBoxes: { type: Number, required: true },
		currentQuantity: { type: Number, required: true },
		totalValue: { type: Number, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true },
);

// 🔹 generate random alphanumeric 3-6 letter code from name
stockSchema.pre("save", function (next) {
	if (!this.code) {
		const random = Math.random().toString(36).substring(2, 5).toUpperCase();
		const letters = this.name.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
		const slice = letters.slice(0, 2);
		this.code = (slice + random).substring(0, 6);
	}
	next();
});

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
