const router = require("express").Router();
const {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	followUser,
	unFollowUser
} = require("../controllers/user");

// get all users
router.get("/timeline/all", getUsers);
// update user
router.put("/:id", updateUser);
// delete user
router.delete("/:id", deleteUser);
// get a user
router.get("/:id", getUser);
//follow a user
router.put("/:id/follow", followUser);
//unFollow a user
router.put("/:id/unfollow", unFollowUser);


module.exports = router;