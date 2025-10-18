import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
	mode: {
		type: String,
		enum: ["withCoupon", "withoutCoupon"],
		required: true,
	},
	name: { type: String, required: true },
});

export default mongoose.model("Reward", rewardSchema);
