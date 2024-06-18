// routes/users.js
const express = require("express");
const {
    signupUser,
    verifyMail,
    signinUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/users-controller");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/verifyMail/:token", verifyMail);

// CRUD operations for react-admin
router.get("/", getUsers); // GET all users
router.get("/:id", getUser); // GET single user by ID
router.put("/:id", updateUser); // UPDATE user by ID
router.delete("/:id", deleteUser); // DELETE user by ID

module.exports = router;
