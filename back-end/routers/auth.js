const router = require('express').Router();
const bcrypt = require("bcrypt");

const User = require("../models/Users");
// register
router.post('/register', async (req, res) => {
	try {
		// generate new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// generate new user
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});
		// save user and respond
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(600).json(err);
	}
});
// Login
router.post("/login", async (req, res) => {
	try {
		// no email
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(404).json("User not found");
		// no password
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		!validPassword && res.status(400).json("Wrong password");

		// valid
		res.status(200).json(user);
	} catch (error) {
		res.status(600).json(error);
	}

})
module.exports = router;
// profilePicture: "https://avatars.dicebear.com/api/human/1.svg",