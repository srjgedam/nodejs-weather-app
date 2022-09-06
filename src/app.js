const express=require('express')
const path=require("path")
const hbs=require("hbs")
const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode")


const app=express()
const publicDirectryPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,"../templates/partials")

app.use(express.static(publicDirectryPath))

// for hbs we should use below line of code
app.set("view engine","hbs") 
app.set("views",viewsPath)

// for registering partials 
hbs.registerPartials(partialPath)

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:" Suraj Gedam"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"Suraj Gedam "
})
})

app.get("/help",(req,res)=>{ 
    res.render("help",{
        helpText:"This is some help text",
        title:"Help page",
        name:"Suraj Gedam"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide address"
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if (error){
            
            return res.send({error})
            
        }
        // console.log(latitude,longitude,location)
        forecast(latitude,longitude,(error,data)=>{
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast:data,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:"It is currently 25 degrees out there . There is 25 % chance of rain.",
    //     location:"Mul, maharashtra , India",
    //     address:req.query.address
    // })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"help 404 not found",
        name:"suraj Gedam",
        errorMessage:"Help page not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404 ",
        name:"suraj gedam",
        errorMessage:"404"
    })
})
 
app.listen(3000,()=>{console.log("server is up and running on port 3000")})