import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },
  userEmail: {
    type: String,
    required: [true, "Please enter a email"],
  },
  contactType: {
    type: String,
    enum: ["query", "courseReq"],
    default: "query",
  },
  queryMsg: {
    type: String,
    required: [true, "Please enter your query"],
  },
  answered: {
    type: Boolean,
    default: false,
  },
});

export const Contact = mongoose.model("Contact", contactSchema);
