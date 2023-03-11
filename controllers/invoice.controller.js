const Invoice= require("../models/invoiceModel");
const Customer=require("../models/customerModal");



const getInvoice=async(req,res)=>{
    const invoice=await Invoice.find({});
    res.json({success:true,invoice});
  }

const populateInfo=async(billInfo)=>{
    billInfo = await billInfo.populate({path:"customerId",model:"Customers"});
    //console.log(billInfo)
    return billInfo;
}
const findCustomerInfo=async(req, res, next, customerId)=>{
    const {name}=req //for embed
    try {
        let customer = await Customer.findOne({ _id: customerId });
        if (!customer) {
          res.status(404).json({
            success: false,
            message: "Invalid customer! Kindly register to continue",
          });
          throw Error("Invalid Customer");
        }
        let invoice = await Invoice.find({ customer });   //for embed
        console.log(customer,invoice)

        if (!invoice || invoice.length===0) {//for embed
            invoice = new Invoice({ customerId:customer, name:name });//for embed
            }
        req.invoice = invoice;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrive user's watch history",
            errorMessage: error.message,
        });
  }
}
const submitBill=async(req,res)=>{
    try{
        const requestBody=req.body
        let {invoice}=req;
        //requestBody=invoice  for ref
        console.log("from submitBill",invoice);
        // const updatedSubmit = new Invoice(requestBody) 
        // console.log(updatedSubmit)
        // let submitItems = await populateInfo(updatedSubmit);
        // console.log(submitItems)
        await invoice.save();

        // console.log(submitInfo)
        // const submitBillInfo=await populateInfo(submitInfo)
        // console.log(submitBillInfo)

        res.status(201).json({
            success:true,
            message:"Bill SuccessFully Saved",
            invoice
        })

    }catch(e){
        console.log(e);
        res.status(400).json({
            success:false,
            message:"Could not submit"
        })
    }
}







module.exports={
    getInvoice,
    findCustomerInfo,
    submitBill
  };



//   const customerInfo= new mongoose.Schema({
//      id:mongoose.Schema.Types.ObjectId
//     name:String,
//     gstNumber:String,
//     address:String
// })