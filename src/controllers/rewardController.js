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
		const { name, mode } = req.body;
		const reward = await Reward.create({ name, mode });
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
