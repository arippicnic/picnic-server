import mongoose, { Schema } from "mongoose";

const sessionSchema = new mongoose.Schema({
	expires: {
		type: String
	},
	session: {
		type: Schema.Types.Mixed
	}
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
