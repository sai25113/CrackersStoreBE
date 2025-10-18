import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import healthCheckRouter from "./routes/healthCheckRouter.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import stockRoutes from "./routes/stockRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";

const app = express();

//Basic Configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Log incoming requests
app.use((req, res, next) => {
	console.log(`➡️ ${req.method} ${req.originalUrl}`);
	next();
});

const allowedOrigins = process.env.CORS_ORIGIN
	? process.env.CORS_ORIGIN.split(",")
	: ["http://localhost:5173"];

// app.use(
// 	cors({
// 		origin: allowedOrigins,
// 		credentials: true,
// 		methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
// 		allowedHeaders: ["Content-Type", "Authorization"],
// 	}),
// );

app.use(
	cors({
		origin: function (origin, callback) {
			console.log("🔍 Incoming origin:", origin);
			if (!origin || allowedOrigins.includes(origin)) {
				console.log("✅ CORS allowed:", origin);
				callback(null, true);
			} else {
				console.log("❌ CORS blocked:", origin);
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true, // ✅ allow cookies across domains
	}),
);
// app.options("*", cors());

console.log("Loaded CORS_ORIGIN:", process.env.CORS_ORIGIN);

app.use((err, req, res, next) => {
	console.error("🔥 Global Error Caught:", err.message);
	res.status(500).json({ error: err.message });
});

// // ✅ Preflight support (important for complex requests)

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/instagram", (req, res) => {
	res.send("Welcome to Instagram");
});

app.use("/api/v1/healthcheck", healthCheckRouter);
console.log("✅ healthcheck route loaded");

app.use("/api/v1/auth", authRouter);
console.log("✅ auth route loaded");

app.use("/api/v1/stocks", stockRoutes);
app.use("/api/v1/sales", saleRoutes);

app.use("/api/v1/rewards", rewardRoutes);

export default app;

// import express from "express";
// import cors from "cors";
// import healthCheckRouter from "./routes/healthCheckRouter";

// const app = express();

// //basic configurations
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));

// //cors configuration
// app.use(
// 	cors({
// 		origin: process.env.CORS_ORIGIN?.split(",") || "http:localhost:5173",
// 		credentials: true,
// 		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
// 		allowedHeaders: ["Authorization", "Content-Type"],
// 	}),
// );

// app.use("/api/v1/healthcheck", healthCheckRouter);
// app.get("/", (req, res) => {
// 	res.send("Hello World");
// });

// app.get("/instagram", (req, res) => {
// 	res.send("this is an instagram page");
// });

// export default app;
