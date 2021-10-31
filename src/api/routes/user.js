const express = require("express");
const UserController = require("../contollers/user");
const auth = require("../middleware/auth");
const router = express.Router();

// post
router.post("/login", UserController.login);
router.post("/signup", UserController.signup);

router.get("/data", auth, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch {
    throw new Error(error.message);
  }
});
router.get("/usersEmails",auth, UserController.usersEmails);

router.post("/logout", auth, UserController.logout);
router.post("/payment", auth, UserController.payment);
router.post("/dueEmail", auth, UserController.dueEmail);
router.post("/iou", auth, UserController.iou);

router.post("/testing", auth, UserController.testing);

module.exports = router;
