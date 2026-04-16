var {MongoClient} = require('mongodb')
var mongoclient= new MongoClient('mongodb://localhost:27017')

var jwt = require('jsonwebtoken')

var express = require('express')
var app = express()
app.use(express.json())


var secretkey = 'mysecretkey'
//APIS
app.post('/login',async(req,res) =>{
    var data = req.body;
    if(data.name == 'admin' && data.pass == 'pass123')
    {
        var token = jwt.sign({
            payload:data.name},
            secretkey
        )
        return res.json({token})
        console.log("Login successfully", token)
    }
    else
    {
        console.log("Invalid credentials")
    }
})


//GET API
app.get('/getusers',auth,async(req,res)=>{
    try{
        res.send("Users data")
    }
    catch(err)
    {
        console.log(err)
    }
})
//Middleware
function auth(req,res,next)
{
     var token = req.headers.authorization
    if(token)
    {
       jwt.verify(token,secretkey);
       next();
    }
    else
    {
        res.send("Token not provided")
    }
}


app.listen(3000)