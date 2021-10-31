const router = require("express").Router();

router.use("/users", require("./user"));
router.use("/group", require("./group"));

module.exports = router;
 