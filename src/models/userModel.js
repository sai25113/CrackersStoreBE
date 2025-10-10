import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
	{
		avatar: {
			type: {
				url: String,
				localPath: String,
			},
			default: {
				url: `https://placehold.co/200x200`,
				localPath: "",
			},
		},
		userName: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		fullname: {
			type: String,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},

		// 🔹 Role Based Access
		role: {
			type: String,
			enum: ["ADMIN", "SELLER", "WHOLESALER"], // add CUSTOMER later if you open app to public
			default: "SELLER",
		},

		permissions: {
			canAddStock: { type: Boolean, default: false },
			canEditStock: { type: Boolean, default: false },
			canSell: { type: Boolean, default: true },
			canViewReports: { type: Boolean, default: true },
		},

		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		refreshToken: String,
		forgotPasswordToken: String,
		forgotPasswordExpiry: Date,
		emailVerificationToken: String,
		emailVerificationExpiry: Date,
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			userName: this.userName,
			role: this.role, // 🔹 Include role in token
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			userName: this.userName,
			role: this.role,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
	);
};

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateTemporaryToken = function () {
	const unHashedToken = crypto.randomBytes(20).toString("hex");
	const hashedToken = crypto
		.createHash("sha256")
		.update(unHashedToken)
		.digest("hex");
	const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes
	return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
