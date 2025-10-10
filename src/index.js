// import dotenv from "dotenv";
// import app from "./app.js";
// import { connectDB } from "./db/index.js";
// dotenv.config({
// 	path: "./.env",
// });

// const port = process.env.port || 3000;

// connectDB()
// 	.then(() => {
// 		app.listen(port, () => {
// 			console.log(`Server listening on port http://localhost:${port}`);
// 		});
// 	})
// 	.catch((err) => {
// 		console.error("Mongo DB error");
// 	});
import app from "./app.js";
import { connectDB } from "./db/index.js";

const port = process.env.PORT || 8000;
connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(`App is listening to Port http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error("MongoDB Connrction error", error);
	});
