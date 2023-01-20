const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const userRoute = require("./routers/users");
const authRouter = require("./routers/auth");
const postRouter = require("./routers/posts");

const app = express();
dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, () => {
	console.log("Connected To MongoDb");
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// routers

app.use("/api/auth", authRouter);
app.use("/api/users", userRoute);
app.use("/api/posts", postRouter);

app.listen(3001, () => {
	console.log("back done!");
})


// https://www.youtube.com/watch?v=ldGl6L4Vktk&list=PLj-4DlPRT48nSySC5-TtF4Ve3fceLs9qs