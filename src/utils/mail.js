import { subtle } from "crypto";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { text } from "stream/consumers";
import dotenv from "dotenv";
dotenv.config();

// const sendEmail = async (options) => {
// 	const mailGenerator = new Mailgen({
// 		theme: "default",
// 		product: {
// 			name: "Task Manager",
// 			link: "https://taskmanagerlink.com",
// 		},
// 	});

// 	const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
// 	const emailHtml = mailGenerator.generate(options.mailgenContent);

// 	const transporter = nodemailer.createTransport({
// 		host: process.env.MAILTRAP_SMTP_HOST,
// 		port: process.env.MAILTRAP_SMTP_PORT,
// 		auth: {
// 			user: process.env.MAILTRAP_SMTP_USER,
// 			pass: process.env.MAILTRAP_SMTP_PASS,
// 		},
// 	});

// 	const mail = {
// 		from: "mail.taskmanager@example.com",
// 		to: options.email,
// 		subject: options.subject,
// 		text: emailTextual,
// 		html: emailHtml,
// 	};

// 	try {
// 		await transporter.sendMail(mail);
// 	} catch (error) {
// 		console.error(
// 			"Email service failed siliently. Make sure that you have provided your MAILTRAP credentials in the .env file",
// 		);
// 		console.error("Error: ", error);
// 	}
// };

const sendEmail = async (options) => {
	const mailGenerator = new Mailgen({
		theme: "default",
		product: {
			name: "Cracker Stock Manager",
			link: "https://yourapp.com",
		},
	});

	const emailHtml = mailGenerator.generate(options.mailgenContent);
	const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

	// ✅ Gmail transporter (uses App Password)
	// const transporter = nodemailer.createTransport({
	// 	service: process.env.EMAIL_SERVICE, // "gmail"
	// 	auth: {
	// 		user: process.env.EMAIL_USER,
	// 		pass: process.env.EMAIL_PASS,
	// 	},
	// });

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465, // Use 465 for SSL
		secure: true, // true for 465, false for 587
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mail = {
		from: `"Cracker Stock Manager" <${process.env.EMAIL_USER}>`,
		to: options.email,
		subject: options.subject,
		text: emailTextual,
		html: emailHtml,
	};

	try {
		const info = await transporter.sendMail(mail);
		console.log("✅ Email sent:", info.response);
	} catch (error) {
		console.error("❌ Email sending failed:", error.message);
		throw error;
	}
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
	return {
		body: {
			name: username,
			intro: "Welcome to our our App! we are excited to have you on board.",
			action: {
				instructions:
					"To verify your email please click on the following button",
				button: {
					color: "#1aae5aff",
					text: "Verify your email",
					link: verificationUrl,
				},
			},
			outro:
				"Need help or have questions? Just reoly to this email, we'd love to help.",
		},
	};
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
	return {
		body: {
			name: username,
			intro: "We got a request to reset the password of your account.",
			action: {
				instructions:
					"To reset your password please click on the following button or link.",
				button: {
					color: "#0ef572ff",
					text: "Reset Password",
					link: passwordResetUrl,
				},
			},
			outro:
				"Need help or have questions? Just reoly to this email, we'd love to help.",
		},
	};
};

export {
	emailVerificationMailgenContent,
	forgotPasswordMailgenContent,
	sendEmail,
};
