const mongoose=require("mongoose");

const customerInfo= new mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        name:String,
        gstNumber:String,
        address:String
    })

const InvoiceSchema = new mongoose.Schema({
    name:{
        type:String,
        },
    customerId:customerInfo  //embed
    //customerId:{type:object,ref:"Customers"}
    },{timestamps:{createdAt: 'createdDate',updatedAt: 'updatedDate'}})

module.exports = mongoose.model.Invoice || mongoose.model("Invoice", InvoiceSchema);
