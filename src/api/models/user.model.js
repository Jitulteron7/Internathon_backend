const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator =require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    upi:{
        type:String,
    },
    email: {
        type: String,
        require: true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Please enter a valid email");
        }
    },
    phone_no:{
        type:Number,
        require: true,
        unique:true
    },
    password: {
        type: String,
        require: true,
    },
    profile_pic: {
        type: String,
        default:"https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png",
    },
    // friends:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     }
    // ],
    group:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Group"
        }
    ],

    // chats:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"Chats"
    //     }
    // ],
    // iou:[{
    //     type:String,
    //     link_id:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     },
    //     group_id:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"Group"
    //     }
    // }]
});


userSchema.pre("save", async function (next) {
    var user = this;
    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8);
    } 
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;