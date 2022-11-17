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

const userSchema=mongoose.Schema({name:String,content:String,loaded:String});

const user=new mongoose.model("user",userSchema);
const today=new Date();
const app1=today.toDateString();
const dog=new mongoose.model("man",userSchema);
const man1=new dog({name:"krishna",content:"the true Teacher",loaded:app1})
  man1.save()

const cursor = dog.find({loaded:app1}).cursor();
 let n=[]
 let c=[]
 cursor.forEach((element)=>{
    console.log(element.name);
    n.push(element.name)
    c.push(element.content)
  })
 
  
 app.get("/",(req,res)=>{

  
   res.render("home",{User:"Naveen",stream:n,content:c})
})

app.get("/about",(req,res)=>{
    res.render("about");
});
app.get("/feedback",(req,res)=>{
  res.render("feedback");
})
app.get("/contact",(req,res)=>{
  res.render("contact");
})

app.post("/",(req,res)=>{
  
})