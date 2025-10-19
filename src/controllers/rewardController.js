// import Reward from "../models/rewardModel.js";

// // Get all rewards by mode
// export const getRewards = async (req, res) => {
// 	try {
// 		const rewards = await Reward.find({
// 			mode: req.query.mode || "withoutCoupon",
// 		});
// 		res.json(rewards);
// 	} catch (err) {
// 		res
// 			.status(500)
// 			.json({ message: "Error fetching rewards", error: err.message });
// 	}
// };

// // Add new reward
// export const addReward = async (req, res) => {
// 	try {
// 		const { name, mode, price } = req.body;
// 		if (!name || !price) {
// 			return res.status(400).json({ message: "Name and price are required" });
// 		}

// 		const reward = await Reward.create({ name, mode, price });
// 		res.status(201).json({ message: "Reward added successfully", reward });
// 	} catch (err) {
// 		res
// 			.status(500)
// 			.json({ message: "Error adding reward", error: err.message });
// 	}
// };

// // Delete reward
// export const deleteReward = async (req, res) => {
// 	try {
// 		await Reward.findByIdAndDelete(req.params.id);
// 		res.json({ message: "Reward deleted successfully" });
// 	} catch (err) {
// 		res
// 			.status(500)
// 			.json({ message: "Error deleting reward", error: err.message });
// 	}
// };

import Reward from "../models/rewardModel.js";

// Get all rewards by mode
export const getRewards = async (req, res) => {
	try {
		const rewards = await Reward.find({
			mode: req.query.mode || "withoutCoupon",
		});
		res.json(rewards);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error fetching rewards", error: err.message });
	}
};

// Add new reward
export const addReward = async (req, res) => {
	try {
		const { name, mode, price, rewardType } = req.body;

		if (!name || !rewardType) {
			return res
				.status(400)
				.json({ message: "Name and rewardType are required" });
		}

		if (rewardType === "freeGift" && !price) {
			return res.status(400).json({ message: "Price required for free gifts" });
		}

		const reward = await Reward.create({ name, mode, price, rewardType });
		res.status(201).json({ message: "Reward added successfully", reward });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error adding reward", error: err.message });
	}
};

// Delete reward
export const deleteReward = async (req, res) => {
	try {
		await Reward.findByIdAndDelete(req.params.id);
		res.json({ message: "Reward deleted successfully" });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error deleting reward", error: err.message });
	}
};

// Update reward
export const updateReward = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, price, rewardType } = req.body;

		if (!name || !rewardType) {
			return res.status(400).json({ message: "Name and rewardType required" });
		}

		if (rewardType === "freeGift" && !price) {
			return res.status(400).json({ message: "Price required for free gifts" });
		}

		const updated = await Reward.findByIdAndUpdate(
			id,
			{ name, price, rewardType },
			{ new: true },
		);

		if (!updated) {
			return res.status(404).json({ message: "Reward not found" });
		}

		res.json({ message: "Reward updated successfully", reward: updated });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error updating reward", error: err.message });
	}
};
