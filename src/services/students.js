const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const studentsFilePath = path.join(__dirname,"students.json");

let readFile = () =>{
    const buffer = fs.readFileSync(studentsFilePath);
    const content = buffer.toString();
    return JSON.parse(content)
}

router.get("/",(req,res)=>{
    res.send(readFile())
})

router.get("/:id",(req,res)=>{
    let students = readFile();
    student = students.find(student => student._id == req.params.id);
    if (student){
        res.send(student);
    }else{
        res.status("404").send("User not found");
    }
})

router.post("/",(req,res)=>{
    let previousStudents = readFile();

    let checkEmail = previousStudents.find(user => user.email == req.body.email)
    if(checkEmail){
        res.status("500").send("email already in use")
    }else{
    req.body._id = previousStudents.length + 1;
    req.body.creationTime = new Date();

    previousStudents.push(req.body);
    fs.writeFileSync(studentsFilePath, JSON.stringify(previousStudents))
    res.send(req.body)
}
})

router.delete("/:id",(req,res)=>{
    let students = readFile();
    let studentsRemained = students.filter(student => student._id != req.params.id);
    if(studentsRemained.length < students.length){
        fs.writeFileSync(studentsFilePath,JSON.stringify(studentsRemained));
        res.send("Removed");
    }else{
        res.status("404").send("User not found");
    }
})

router.put("/:id",(req,res)=>{
    let students = readFile();
    let editStudent = students.find(student => student._id == req.params.id)
    if(editStudent){
        let editedStudent = Object.assign(editStudent, req.body);
        let editedStudentPosition = students.indexOf(editedStudent);
        students[editedStudentPosition]= editedStudent;
        fs.writeFileSync(studentsFilePath,JSON.stringify(students));
        res.send(editedStudent)
    }else{
        res.status("404").send("User Not Found");
    }
})

router.post("/checkEmail/:email",(req,res)=>{
    let existingUsers = readFile();
    let check = existingUsers.find(user =>user.email == req.params.email)

    if(check){
        res.status("500").send("Email already registered")
    }else{
        res.send("Email available");
    }
})
module.exports = router;