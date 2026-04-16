var express = require('express')
var {MongoClient} = require('mongodb')
var jwt = require('jsonwebtoken')



var client = new MongoClient('mongodb://localhost:27017');
var app = express()

app.use(express.json())

//Get Api
app.get('/fetch',async(req,res)=>{
    try{
        var data = await client.db('testdb').collection('users').find().toArray()
        res.json(data)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

var apikey = '123';
//POST API
app.post('/add',async(req,res)=>{
    client.connect();
    var resapikey = req.query.apikey
    if(resapikey !== apikey){
       console.log("Apiu key mis matched")
    }
    else{
        console.log("api key matched")
        client.db('testdb').collection('users').insertOne(req.body)
        res.json({message:'Data added successfully'})
    }
})

secretkey = "abc123"

app.post('/login',async(req,res)=>{

    var data  = req.body;
    if(data.name === 'admin' && data.password === 'admin123'){
        var token = jwt.sign({name:data.name},secretkey,{expiresIn:'1h'})
        res.json({token:token})
    }
    else
    {
        console.log("Invalid credentials")
    }
})

app.listen(3000)
