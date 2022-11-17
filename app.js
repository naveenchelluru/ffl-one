const express=require("express")
const bodyParser =require("body-parser");
const { default: mongoose } = require("mongoose");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

mongoose.connect("mongodb://localhost:27017/aits")
app.listen(3000,()=>{
    console.log("Server is running successfully");
})

const userSchema=mongoose.Schema({name:String,content:String});

const user=new mongoose.model("user",userSchema);
const cursor = user.find().cursor();
const names=[];
const content=[];
cursor.forEach((element)=>{
    names.push(element.name)
    content.push(element.content)
})

app.get("/",(req,res)=>{
    const name="Naveen"
    const stream=['naveen','pavan']
    res.render("home",{User:name,stream:names,content:content});
})

app.get("/about",(req,res)=>{
    res.render("about");
})