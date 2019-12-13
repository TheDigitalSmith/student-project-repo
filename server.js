const express = require("express");
const server = express();
const studentServices = require("./src/services/students/students");
const projectServices = require("./src/services/projects/projects");


port = 3031
server.use(express.json())

server.use("/projects", projectServices)
server.use("/students", studentServices)

server.listen(port,()=>{
    console.log(`Yo, your server is up and running at port ${port}`);
})