const fs=require("path")
const path = require("path")
const express=require("express")
const hbs=require("hbs")
const {forecast}=require("./utils")


const app=express()
const PORT=process.env.PORT || 8080

const viewsPath=path.join(__dirname,"../templates/views/")
const partialsPath=path.join(__dirname,"../templates/partials/")
app.set("view engine","hbs")
app.set("views",viewsPath)

hbs.registerPartials(partialsPath)
// console.log(__dirname) 
const publicPath=path.join(__dirname,"../public/")

app.use(express.static(publicPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:"Dhruv Srivastava"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"My about Page!",
        name:"Dhruv Srivastava",
        description:"Some helpful text"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"My help Page!",
        name:"Dhruv Srivastava",
        description:"Some helpful text"
    })
})


app.get("/weather",(req,res)=>{
    const {address}=req.query;

    if(!address){
        return res.json({
            error:"You must provide an address!"
        })
    }

    forecast(address,(error,data)=>{
        if(error){
            return res.json({
                error
            })
        }

        res.json(data)
    })
})


app.get("*",(req,res)=>{
    res.render("404")
})


app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`)
})