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

app.route("/").get((req,res)=>{
  user.find((err,sol)=>{
    res.render("home",{stream:sol})
    console.log(sol.length);
  })
 })
 .post((req,res)=>{
  const name=req.body.title
  const content=req.body.content
  const man1=new dog({name:"krishna",content:"the true Teacher",loaded:app1})
  man1.save()
 })

 app.route("/about")
 .get((req,res)=>{
  res.render("about");
})
.post((req,res)=>{

})

app.route("/feedback")
.get((req,res)=>{
res.send("feedback")
})
.post((req,res)=>{

})

app.route("/contact")
.get((req,res)=>{
res.send("contact")
})
.post((req,res)=>{

})

app.route("/services")
.get((req,res)=>{
res.send("services")
})
.post((req,res)=>{

})



