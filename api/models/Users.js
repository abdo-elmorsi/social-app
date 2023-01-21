const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			min: 3,
			max: 20,
			required: true,
			unique: true
		},
		email: {
			type: String,
			max: 30,
			max: 20,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			min: 6
		},
		profilePicture: {
			type: String,
			default: "https://www.seekpng.com/png/detail/202-2024994_profile-icon-profile-logo-no-background.png"
		},
		coverPicture: {
			type: String,
			default: "https://i.pinimg.com/736x/53/9b/0a/539b0aa135d8b377647c9548a59de939--background-quotes-fb-background.jpg"
		},
		followers: {
			type: Array,
			default: []
		},
		followings: {
			type: Array,
			default: []
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		darkMode: {
			type: Boolean,
			default: false
		},
		desc: {
			type: String,
			max: 50,
		},
		city: {
			type: String,
			max: 50,
		},
		from: {
			type: String,
			max: 50,
		},
		relationship: {
			type: Number,
			enum: [1, 2, 3],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Users", userSchema);