const router = require('express').Router();
const bcrypt = require("bcrypt");
const { register, login, logOut } = require('../controllers/auth');

// register
router.post('/register', register);
// Login
router.post("/login", login);
// logOut
router.get("/logout", logOut);
module.exports = router;
// profilePicture: "https://avatars.dicebear.com/api/human/1.svg",