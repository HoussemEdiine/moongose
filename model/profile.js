const mongoose = require('mongoose')
const array = require('../ListFav')
let ProfileSchema = new mongoose.Schema({
 name : {type:String,required:true },
 age :Number ,
 favoriteFood :[String]
})

const Profile = mongoose.model('Profile',ProfileSchema)
module.exports = Profile