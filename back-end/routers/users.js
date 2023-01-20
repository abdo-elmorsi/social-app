const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/Users");

// get all users
router.get("/timeline/all", async (req, res) => {
	try {
		const user = await User.findById(req.body.userId);
		if (user.isAdmin) {
			const users = await User.find();
			res.status(200).json(users);
		} else {
			res.status(403).json(user);
		}
	} catch (error) {
		return res.status(500).json(error)
	}
});
// update user
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (error) {
				return res.status(500).json(error)
			}
		}
		try {
			await User.findByIdAndUpdate(req.params.id, { $set: req.body });
			res.status(200).json("User Updated")
		} catch (error) {
			return res.status(500).json(error)

		}
	} else {
		res.status(403).json("You can update only your account!");
	}
});

// delete user
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			await User.findOneAndDelete(req.params.id);
			res.status(200).json("User Deleted")
		} catch (error) {
			return res.status(500).json(error)
		}
	} else {
		res.status(403).json("You can update only your account!");
	}
});

// get a user
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { createdAt, updatedAt, password, __v, ...others } = user._doc;
		res.status(200).json(others);
	} catch (error) {
		return res.status(500).json(error)
	}
});



//follow a user
router.put("/:id/follow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);

			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { followings: req.params.id } });
				res.status(200).json("user has been followed.");
			} else {
				res.status(403).json("you already following this user.");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("you can't follow yourself.");
	}
});

//unFollow a user

router.put("/:id/unfollow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);

			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { followings: req.params.id } });
				res.status(200).json("The user has been unFollowed.");
			} else {
				res.status(403).json("you already don't follow this user.");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("you can't unFollow yourself");
	}
});


module.exports = router