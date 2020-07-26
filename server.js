const express = require('express')
const app = express()
const mongoose = require('mongoose')
let prof = require('./model/profile')
let listofprofile = require('./ListFav')
const Port = process.env.Port || 5000
app.set('view engine', 'pug');
app.set('views','./views');
app.get('/template', function(req, res){
    res.render('template');
 });
 //display all document in db
 app.get('/users',(req,res)=>{
     prof.find((err,user)=>{
         res.send(user)
     })
 })

 // find person by his favorite food 
 app.get('/findone',(req,res)=>{
        prof.findOne({favoriteFood: 'libanais'}, function(data) {
        res.send(data)
        })
     
 })
 var findOneByFood = function(food) {
    prof.findOne({favoriteFood: food}, function(err, data) {
    console.log(food)
    console.log(data)
    });
    };
    findOneByFood('libanais')
    // findByid + clasic update
    let id = '5f1c610faa88320bec137562'; 
    /**   prof.findById(id, function (err, data) { 
        data.favoriteFood.push('humberger')
        data.save()
        if (err){ 
            console.log(err); 
        } 
        else{ 
            console.log("Result : ", data); 
        } 
    }); **/ 
    // findbyname and update
    app.get('/update',(req,res)=>{ 
 prof.findOneAndUpdate({name:'houssem'},{age:26},{new:true},(err,docs)=>{
     err ? console.log('something wrong !!!!') : res.json(docs)
 })
})
// remove docs  by id
app.get('/deleted',(req,res)=>{
let id ='5f1d7a88aad7c10da0b73bdf'
prof.findByIdAndRemove(id,(err,docs)=>{
err ? console.log('something wrong ??') : res.send(`deleted item with the ${id}`)
})    
})
//remmove with condition 
prof.remove({name:'hamma'},(err,docs)=>{
    err ? console.log('cant solve  err') : console.log(docs)
})
//Chain Search Query Helpers to Narrow Search Results
prof.find({favoriteFood:'boritos'}).sort({name:1}).limit(3).select({age:0}).exec((err,data)=>{
 console.log(data)
})
   
 //connecting to database
const uri = 'mongodb://localhost:27017/profile'
 mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(err) console.log(err)
    else console.log('db connected')
})



// access the profile model and save a record
/**let profiing = new prof({
    name : 'houssem',
     age : 29,
     favoriteFood:['boritos','mlawiii']  
    })
  profiing.save()
  .then(doc =>{
      console.log(doc)
  })
  .then(err=>{
      console.error(err)
  })**/ 
prof.create(listofprofile) //create colection 
app.listen(Port,()=>{
    console.log(`server running on ${Port}`)
}) 