const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    pic: {
      type: String,
      default: "http://criticdaily.com/uploads/user-group/default_group.png",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    expenses: {
      travel: Number,
      food: Number,
      others: Number,  
      },
  
    // expenses:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Expenses"
    // },
    // stage:{
    //   type:Number,
    //   default:0
    // }
    // paymentHistory: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: "paymentHistory" },
    // ],
    // chats:
  },
  {
    timestamps: true,
  }
);

const Groups = mongoose.model("Group", groupSchema);
module.exports = Groups;
