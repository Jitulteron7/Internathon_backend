const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      default: 0,
    },
    paid: {
      type: Number,
      default: 0,
    },
    due: {
      type: String,

    },
    // tags: [String],
    // admin: {
    //   type: Boolean,
    //   default: 0,
    // },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  {
    timestamps: true,
  }
);

const Groups = mongoose.model("Member", memberSchema);
module.exports = Groups;
