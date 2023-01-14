const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {type: String, unique:true},
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema)