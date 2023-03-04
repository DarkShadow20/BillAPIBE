const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./dbConnect");

const app=express();
const port=4000;
app.use(cors());
app.use(bodyParser.json());

dbConnect();

const errorHandler=require("./middlewares/errorHandler");
const routeHandler=require("./middlewares/routeHandler");

const userRouter=require("./routes/users.routes")

app.use("/users",userRouter)

app.get("/", (req, res) => {
    res.send("API for BILLAPI");
  });

app.use(routeHandler);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`App started on ${port}!`);
  })


dbConnect();
