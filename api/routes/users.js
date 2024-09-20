// routes/users.js
const express = require("express");
const {
    forgottenPassword,
    verifyResetPassword,
    resetPassword,
    signupUser,
    verifyMail,
    signinUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser
} = require("../controllers/users-controller");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/forgotten-password", forgottenPassword )
router.get("/verifyMail/:token", verifyMail);
router.get("/resetPassword/:token" , verifyResetPassword)
router.put("/resetPassword/:id", resetPassword)

// CRUD operations for react-admin
router.get("/", getUsers); // GET all users
router.get("/:id", getUser); // GET single user by ID
router.put("/:id", updateUser); // UPDATE user by ID
router.delete("/:id", deleteUser); // DELETE user by ID
router.post("/", createUser); 

module.exports = router;
