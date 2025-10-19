import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Mongoose model
const spinResultSchema = new mongoose.Schema(
	{
		mode: String,
		reward: String,
		amount: Number,
		date: { type: Date, default: Date.now },
	},
	{ collection: "spin_results" },
);

const SpinResult = mongoose.model("SpinResult", spinResultSchema);

// 🧠 POST API to save spin result
router.post("/saveResult", async (req, res) => {
	try {
		const { mode, reward, amount } = req.body;

		if (!mode || !reward || isNaN(amount)) {
			return res
				.status(400)
				.json({ message: "Missing or invalid mode, reward or amount" });
		}

		const result = new SpinResult({ mode, reward, amount });
		await result.save();

		res.json({ message: "Spin result saved successfully!", result });
	} catch (error) {
		console.error("Error saving result:", error);
		res.status(500).json({ message: "Server error", error });
	}
});

// 🧠 POST - Save a spin result
router.post("/saveResult", async (req, res) => {
	try {
		const { mode, reward, amount } = req.body;

		if (!mode || !reward || isNaN(amount)) {
			return res.status(400).json({ message: "Invalid input data" });
		}

		const result = new SpinResult({ mode, reward, amount });
		await result.save();

		res.json({ message: "Spin result saved successfully!", result });
	} catch (error) {
		console.error("Error saving result:", error);
		res.status(500).json({ message: "Server error", error });
	}
});

// 🧾 GET - Fetch all spin results
router.get("/results", async (req, res) => {
	try {
		const results = await SpinResult.find().sort({ date: -1 });
		res.json({ success: true, data: results });
	} catch (err) {
		console.error("Error fetching results:", err);
		res.status(500).json({ success: false, error: "Server error" });
	}
});

// ✏️ PUT - Update a spin result by ID
router.put("/results/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { mode, reward, amount } = req.body;

		const updated = await SpinResult.findByIdAndUpdate(
			id,
			{ mode, reward, amount },
			{ new: true },
		);

		if (!updated) return res.status(404).json({ message: "Record not found" });

		res.json({ message: "Spin result updated successfully!", updated });
	} catch (err) {
		console.error("Error updating result:", err);
		res.status(500).json({ message: "Server error", error: err });
	}
});

// ❌ DELETE - Delete a spin result by ID
router.delete("/results/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const deleted = await SpinResult.findByIdAndDelete(id);
		if (!deleted) return res.status(404).json({ message: "Record not found" });

		res.json({ message: "Spin result deleted successfully!" });
	} catch (err) {
		console.error("Error deleting result:", err);
		res.status(500).json({ message: "Server error", error: err });
	}
});

// 📊 GET /analytics/sales
router.get("/analytics/sales", async (req, res) => {
	try {
		// Get data for last 3 days
		const today = new Date();
		const threeDaysAgo = new Date(today);
		threeDaysAgo.setDate(today.getDate() - 2);

		const data = await SpinResult.aggregate([
			{
				$match: {
					date: { $gte: threeDaysAgo },
				},
			},
			{
				$group: {
					_id: {
						$dateToString: { format: "%Y-%m-%d", date: "$date" },
					},
					totalAmount: { $sum: "$amount" },
					averageAmount: { $avg: "$amount" },
					count: { $sum: 1 },
				},
			},
			{ $sort: { _id: 1 } },
		]);

		res.json({ success: true, data });
	} catch (err) {
		console.error("Error in analytics:", err);
		res.status(500).json({ success: false, error: "Server error" });
	}
});

export default router;
