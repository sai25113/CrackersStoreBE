// import mongoose from "mongoose";

// const rewardSchema = new mongoose.Schema({
// 	mode: {
// 		type: String,
// 		enum: ["withCoupon", "withoutCoupon"],
// 		required: true,
// 	},
// 	name: { type: String, required: true },
// 	price: { type: Number, required: true }, // ✅ new field
// });

// export default mongoose.model("Reward", rewardSchema);

import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
	mode: {
		type: String,
		enum: ["withCoupon", "withoutCoupon"],
		required: true,
	},
	rewardType: {
		type: String,
		enum: ["discount", "freeGift"],
		required: true,
	},
	name: { type: String, required: true },
	price: { type: Number }, // only required for freeGift
});

export default mongoose.model("Reward", rewardSchema);
