import express from "express";
import {
	getRewards,
	addReward,
	deleteReward,
	updateReward,
} from "../controllers/rewardController.js";

const router = express.Router();

router.get("/", getRewards);
router.post("/", addReward);
router.put("/:id", updateReward);
router.delete("/:id", deleteReward);

export default router;
