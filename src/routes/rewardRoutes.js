import express from "express";
import {
	getRewards,
	addReward,
	deleteReward,
} from "../controllers/rewardController.js";

const router = express.Router();

router.get("/", getRewards);
router.post("/", addReward);
router.delete("/:id", deleteReward);

export default router;
