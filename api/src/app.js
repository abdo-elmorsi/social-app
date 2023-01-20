require("./db/mongoose");
const express = require("express");
// to user hot reload
const morgan = require("morgan");
// secure my Express app
const helmet = require("helmet");
// to use .env file
const dotenv = require("dotenv");
// to ignore cors error in production
const cors = require("cors");
// to use cookies
const cookieParser = require("cookie-parser");

// routes
const authRoutes = require("../routers/auth");
const userRoutes = require("../routers/users");
const postRoutes = require("../routers/posts");
const commentRoutes = require("../routers/comments");
const likeRoutes = require("../routers/likes");


const app = express();
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());

// routers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);


app.get("/api", async (req, res) => {
	res.send("<h1>Online Shop</h1>");
});

module.exports = app;