const Customer=require("../models/customerModal");
const { ObjectId } = require('mongodb');


const getCustomers=async(req,res)=>{
  try{
    let customers=await Customer.find({})
    customers=customers.map((user)=>{
      customers.password=undefined;
      return customers;
    })
    res.json({success:true , customers})
  }catch(err){
    console.log(err.message)
    res.status(500).json({
      success:false,
      message:"Unable to get customers list",
      errMessage:err.message
    })
  }
}

const editCustomer=async(req,res)=>{
    const {customerId}=req.params;
    const updateInfo=req.body;
    const customerIds=new ObjectId(customerId)
    const customerInfo=await Customer.findById(customerIds)
  try{
    if(customerInfo){
        if(updateInfo.name){
            customerInfo.name=updateInfo.name;
        }
        if(updateInfo.gstNumber){
            customerInfo.gstNumber=updateInfo.gstNumber;
        }
        if(updateInfo.address){
            customerInfo.address=updateInfo.address;
        }
        const updatedCustomerInfo = new Customer(customerInfo) 
        await updatedCustomerInfo.save();
        res.status(200).send({
            message: "Updated Successful",
        });
    }
  }catch(e){
    res.status(500).json({
        success:false,
        message:"Unable to update",
        errMessage:e.message
      })
  }
}

const addCustomer=async(req,res)=>{
  try{
    const customerData=req.body
    const gstExists=await Customer.exists({gstNumber:customerData.gstNumber})
    if(gstExists){
      res.status(401).json({
        success:false,
        message:"Customer already exists"
        })
        return gstExists;
    }
    let newCustomer=new Customer(customerData);
    await newCustomer.save();
    const customer={_id:newCustomer._id,name:newCustomer.name}
    res.status(201).json({success:true,customer})
  }catch(err){
    res.status(500).json({
      success:false,
      message:"Could not add the user.Try Again!",
      errMessage:err.message
    })
  }
};

module.exports={
  getCustomers,
  editCustomer,
  addCustomer
};