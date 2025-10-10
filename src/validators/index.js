import { body } from "express-validator";

const userRegisterValidator = () => {
	return [
		body("email")
			.trim()
			.notEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email is invalid"),
		body("userName")
			.trim()
			.notEmpty()
			.withMessage("Username must be in lower case")
			.isLength({ min: 3 })
			.withMessage("Username must be at least 3 characters long"),
		body("password").trim().notEmpty().withMessage("Password is required"),
		body("fullname").optional().trim(),
	];
};

const userLoginValidator = () => {
	return [
		body("email").optional().isEmail().withMessage("Email is invalid"),
		body("password").notEmpty().withMessage("Password is required"),
	];
};

const userChangeCurrentPasswordValidator = () => {
	return [
		body("oldPassword").notEmpty().withMessage("Old Password is required"),
		body("newPassword").notEmpty().withMessage("New Password is required"),
	];
};

const useForgotPasswordValidator = () => {
	return [
		body("email")
			.trim()
			.notEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email is invalid"),
	];
};

const userResetForgotPasswordValidator = () => {
	return [
		body("newPassword").notEmpty().withMessage("New Password is required"),
	];
};

export {
	userRegisterValidator,
	userLoginValidator,
	userChangeCurrentPasswordValidator,
	useForgotPasswordValidator,
	userResetForgotPasswordValidator,
};
