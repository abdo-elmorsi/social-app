const User = require("../models/Users");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
	try {
		const user = await User.findById(req.body.userId);
		if (user.isAdmin) {
			const users = await User.find();
			res.status(200).json(users);
		} else {
			res.status(403).json(user);
		}
	} catch (error) {
		return res.status(500).json(error.message)
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		console.log(user);
		const { createdAt, updatedAt, password, __v, ...others } = user._doc;
		res.status(200).json(others);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const updateUser = async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (error) {
				return res.status(500).json(error.message)
			}
		}
		try {
			await User.findByIdAndUpdate(req.params.id, { $set: req.body });
			res.status(200).json("User Updated")
		} catch (error) {
			return res.status(500).json(error.message)

		}
	} else {
		res.status(403).json("You can update only your account!");
	}
};

const deleteUser = async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			await User.findOneAndDelete(req.params.id);
			res.status(200).json("User Deleted")
		} catch (error) {
			return res.status(500).json(error.message)
		}
	} else {
		res.status(403).json("You can update only your account!");
	}
};

const followUser = async (req, res) => {
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
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	} else {
		res.status(403).json("you can't follow yourself.");
	}
};

const unFollowUser = async (req, res) => {
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
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	} else {
		res.status(403).json("you can't unFollow yourself");
	}
};
module.exports = {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	followUser,
	unFollowUser
}