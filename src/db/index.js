// import mongoose from "mongoose";

// const connectDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.MONGO_URI);
// 		console.log("Mongo DB connected");
// 	} catch (error) {
// 		console.error("MongoDB connection error", error);
// 		process.exit(1);
// 	}
// };

// export { connectDB };

import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Mongo DB connected");
	} catch (error) {
		console.log("MongoDB connection error, error");
		process.exit(1);
	}
};

export { connectDB };
