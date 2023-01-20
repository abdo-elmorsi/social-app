const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://dev-abdo:2711@cluster0.09ukawr.mongodb.net/social?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL, (err) => {
	if (err) return console.log({ message: err.message });
	console.log("connected");
})