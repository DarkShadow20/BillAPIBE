const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please provide Name"],
        unique: [true, "Name Exists"],
    },
    gstNumber:{
        type:String,
        required: [true,"Please provide GST Number"],
        unique:[true,"GST NUMBER Exists"]
    },
    address:{
        type:String,
        required:[true,"Please provide Address"],
        unique:false
    }
})

module.exports = mongoose.model.Customers || mongoose.model("Customers", CustomerSchema);