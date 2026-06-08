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

const allowRoles = require("../middleware/roleMiddleware");

// ADMIN ONLY ROUTE
router.get(
  "/admin",
  verifyToken,
  allowRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Admin Access Granted",
    });
  }
);

module.exports = router;