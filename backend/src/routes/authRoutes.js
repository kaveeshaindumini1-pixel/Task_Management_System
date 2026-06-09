const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// PROTECTED ROUTE
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});


module.exports = router;