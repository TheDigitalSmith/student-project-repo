const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path")

const projectsFilePath = path.join(__dirname,"projects.json");
const uuidv1 = require("uuid/v1");

readFile = () =>{
    const buffer = fs.readFileSync(projectsFilePath);
    const content = buffer.toString()
    return JSON.parse(content)
}

router.get("/",(req,res)=>{
    let projects = readFile();
    if (Object.keys(req.query).length > 0){
    let filteredProjects = projects.filter(project => 
        project.hasOwnProperty("name") && project.name.toLowerCase() == req.query.name.toLowerCase());
    res.send(filteredProjects);
    }else{
        res.status("404").send("project not found");
    }
})

// router.post("/", ( req,res)=>{
//     let previousProjects = readFile;
//     let newProjects = {
//         ...req.body,
//         _id: uuidv1(),
//         creationTime: new Date(),
//         StudentID: 1
//     }
//     previousProjects.push(newProjects)
//     req.send(previousProjects)
// })

module.exports = router;