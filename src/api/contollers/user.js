const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const userModel = require("../models/user.model");
const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");
// const MailService = require("../services/vendor/MailService");

const authService = new AuthService({
    UserModel:userModel,
    // MailService: new MailService(),
});
const userService=new UserService({})
const userController = {
    
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.status(200).json({ user, token });
    }),
    signup: asyncHandler(async (req, res) => {
        const { name, email, password ,profile,phone_no} = req.body;
        console.log(req.body,"body")
        const { user, token } = await authService.signUp(name, email, password,profile,phone_no);
        console.log(user,token,"data")
        res.status(201).json({ user, token });
    }),
    logout:asyncHandler(async (req, res) => {
        await authService.logout(req.user, req.token);
        res.status(200).send();
    }),
    
    testing:asyncHandler(async (req, res) => {
        const {testing}=req.body;
        res.status(200).json({message:"done",testing:testing});
    }),
    payment:asyncHandler(async (req, res) => {
        await userService.payGroup(groupId,req.user._id,req.body.amount);
        res.status(200).json({message:"done",testing:testing});
    }),

    usersEmails:asyncHandler(async (req, res) => {
        var result  =await userModel.find({_id:{ $ne: req.user._id.toString() }});
        result.password=null;
        res.status(200).json(result);
    }),

    dueEmail:asyncHandler(async (req, res) => {
        await userService.payGroup(groupId,req.user._id,req.body.amount);
        res.status(200).json({message:"done",testing:testing});
    }),
    
    iou:asyncHandler(async (req, res) => {
        await userService.payGroup(groupId,req.user._id,req.body.amount);
        res.status(200).json({message:"done",testing:testing});
    }),
    // forgot:asyncHandler(async (req, res) => {
    //     const { email } = req.body;
    //     await authService.forgotpassword(email);
    //     res.json("Link has been sent to registered email");
    // }),
    // reset: asyncHandler(async (req, res) => {
    //     const { id, token } = req.params;
    //     const { password } = req.body;

    //     // console.log("req.body", id);
    //     const user = await authService.resetpassword(id, token, password);
    //     res.status(201).json(user);
    // })
}



module.exports = userController;
