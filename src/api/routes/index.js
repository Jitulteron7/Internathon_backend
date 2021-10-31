const router = require("express").Router();

router.use("/users", require("./user"));
router.use("/group", require("./group"));
router.use("/testing", (req,res,next)=>{
    res.status(200).send("API WORKING !!");
});
module.exports = router;
 