const router = require("express").Router();

router.use("/users", require("./user"));
router.use("/group", require("./group"));
router.get("/testing", (req,res,next)=>{
    res.status(200).send("API WORKING !!");
});
module.exports = router;
 