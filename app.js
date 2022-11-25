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


//data schema
const userSchema=mongoose.Schema({name:{type:String,required:true},content:{type:String,required:true},loaded:String});

const user=new mongoose.model("user",userSchema);
const today=new Date();
const days=today.toDateString();

//feed back schema
const feedSchema=mongoose.Schema({rating:{type:Number,required:true},opinion:String,loaded:String})

const feedBack=new mongoose.model("feedback",feedSchema)
// home page
app.route("/").get((req,res)=>{
  try {
    user.find((err,sol)=>{
      res.render("home",{stream:sol,para:" "})

    })
  } catch (error) {
    res.send(error)
  }
 })
 .post((req,res)=>{
  
 })

 //about page
 app.route("/about")
 .get((req,res)=>{
  res.render("about");
})
.post((req,res)=>{

})

app.route("/newfeed")
.get((req,res)=>{
  res.render("newfeed")
})
.post((req,res)=>{
  const title=req.body.title;
  const story=req.body.story;
 if(title)
 {
  if(story)
  {
    const newUser=new user({name:title,content:story,loaded:days})
    newUser.save((err)=>{
      if(err){
        res.send(err)
      }else{
        res.redirect("/")
      }
    })
  }
 }
})

//Feedback route
app.route("/feedback")
.get((req,res)=>{
res.render("feedback")
})
.post((req,res)=>{
  try {
    const rating=req.body.rating
    const opinion=req.body.description
    console.log(rating,opinion);
    if(rating){
      if(opinion){
        const feedbacks=new feedBack({rating:rating,opinion:opinion,loaded:days})
        feedbacks.save((err)=>{
          res.render("home",{stream:sol,para:"Thank You for submitting your feedback"})
        })
      }
    }
  } catch (error) {
    res.send(error)
  }}
)
//contact route
app.route("/contact")
.get((req,res)=>{
res.render("contact")
})
.post((req,res)=>{
res.redirect("/")
})




