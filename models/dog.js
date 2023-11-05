const mongoose=require('mongoose');

const dogSchema=new mongoose.Schema({name: String,age: Number,breed: String});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
