const express = require("express");
const server = express();
const studentServices = require("./src/services/students.js");

server.use(express.json())
server.use("/students", studentServices)

server.listen(3031,()=>{
    console.log("Yo, your server is up and running at port 3031");
})