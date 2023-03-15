const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true,"Please provide an Email"],
        unique: [true, "Email Exists"],
    },
    gstNumber:{
        type:String,
        required: [true, "Please provide GST Number"],
        unique: [true, "GST Number Exists"],
    },
    companyName:{
        type:String,
        required: [true, "Please provide company name"],
        unique: [true, "Company Name Exists"]
    },
    password:{
        type:String,
        required: [true,"Please provide a password"],
        unique:false
    }
})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
