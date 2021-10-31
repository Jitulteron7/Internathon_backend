const express =require('express');
const groupController = require('../contollers/group');
const auth=require("../middleware/auth");
const router = express.Router();

//post 
router.post("/createGroup", auth, groupController.createGroup);

//get 
router.get("/getAll", auth,  groupController.getAllGroup);

router.get("/getGroup", auth,  groupController.getGroup);
// delete 
router.delete("/", auth, groupController.deleteAll);
router.delete("/:noteId", auth, groupController.deleteOne);
module.exports=router;
