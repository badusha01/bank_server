// import express and store in a variable
const express=require("express")

// import dataservice
const ds=require('./service/dataService')

// import jswt
const jwt=require('jsonwebtoken')


// app creation

const app=express()


// to convert all data from json to js
app.use(express.json())

// middleware creation

const jwtMiddleware=(req,res,next)=>{
   try
    {  // access data from request body
    const token=req.headers['access_token']

    // verify the token with secret key
    const data=jwt.verify(token,"superkey123")

    console.log(data);

    next()
}
    catch{
             res.status(422).json({
                status:false,
                message:"please login",
                statusCode:404
             })
    }
    
}



// register    - post

app.post("/register",(req,res)=>{
    const result=ds.register(req.body.acno,req.body.uname,req.body.psw)
    res.status(result.statusCode).json(result)
})

// login
app.post("/login",(req,res)=>{
    const result=ds.login(req.body.acno,req.body.psw)
    res.status(result.statusCode).json(result)
})

app.post("/deposit",jwtMiddleware,(req,res)=>{
    const result=ds.deposit(req.body.acno,req.body.psw,req.body.amnt)
    res.status(result.statusCode).json(result)
})

app.post("/withdraw",(req,res)=>{
    const result=ds.withdraw(req.body.acno,req.body.psw,req.body.amnt)
    res.status(result.statusCode).json(result)
})

app.get("/transaction",(req,res)=>{
    const result=ds.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})


// login       - get
// deposit     - patch
// withdraw    - patch
// transaction - get
// delete      - delete


// resolve api
// app.get("/",(req,res)=>{
//     res.send("Get Method Working.....")
// })
// app.post("/",(req,res)=>{
//     res.send("Post Method Working.....")
// })
// app.put("/",(req,res)=>{
//     res.send("Put Method Working.....")
// })
// app.patch("/",(req,res)=>{
//     res.send("Patch Method Working.....")
// })
// app.delete("/",(req,res)=>{
//     res.send("Delete Method Working.....")
// })



// port set
app.listen(3000,()=>{
    console.log("server started at port 3000")
})