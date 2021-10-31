const asyncHandler = require("express-async-handler");
const GroupService = require("../services/group.service");

// const MailService = require("../services/vendor/MailService");

const groupService = new GroupService({});

const groupController = {
    
    // post 
    createGroup: asyncHandler(async (req, res) => {
        console.log(req.body);
        const result = await groupService.createGroup(req.body,req.user._id);
         
        res.status(200).json({ message:"Group  Created successfully", result:result });
    }),

    // get
    getGroup: asyncHandler(async (req, res) => {
        const {id}=req.params
        const result = await await groupService.getGroup(id);
        res.status(200).json({ result });
    }),

    getAllGroup: asyncHandler(async (req, res) => {
        
        const result = await await groupService.getAllGroup(req.user._id);
        console.log(result)
        res.status(200).json(result);
    }),
    // delete 
    deleteAll: asyncHandler(async (req, res) => {
        const result = await await groupService.deleteAll()
        res.status(200).json({message:"deleted succucssfully" ,result:result});
    }),
    deleteOne: asyncHandler(async (req, res) => {
        const {id}=req.params
        const result = await await groupService.deleteOne(id)
        res.status(200).json({message:"deleted succucssfully" ,result:result});
    }),
}

module.exports=groupController;