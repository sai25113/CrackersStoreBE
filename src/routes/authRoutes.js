import { Router } from "express";
import {
	registerUser,
	login,
	logoutUser,
	verifyEmail,
	refreshAccessToken,
	forgotPassword,
	resetForgotPassword,
	getCurrentUser,
	changeCurrentPassword,
	resendEmailVerification,
} from "../controllers/authController.js";
import { validate } from "../middlewares/validatorMiddileware.js";
import {
	userRegisterValidator,
	userLoginValidator,
	useForgotPasswordValidator,
	userResetForgotPasswordValidator,
	userChangeCurrentPasswordValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

//unsecure route
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router
	.route("/forgot-password")
	.post(useForgotPasswordValidator(), validate, forgotPassword);
router
	.route("/reset-password/:resetToken")
	.post(userResetForgotPasswordValidator(), validate, resetForgotPassword);

//secure protected routes
router.route("/logoutUser").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router
	.route("/resend-email-verification")
	.post(verifyJWT, resendEmailVerification);
router
	.route("/change-password")
	.post(
		verifyJWT,
		userChangeCurrentPasswordValidator(),
		validate,
		changeCurrentPassword,
	);

export default router;
